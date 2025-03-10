import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import router from "./routes/route.js";
import Contact from './models/contact.js';

import { GoogleGenerativeAI } from "@google/generative-ai";
import Patient from "./models/patientSchema.js";
import Doctor from "./models/doctorSchema.js";
const genAI = new GoogleGenerativeAI("AIzaSyBLvHRUeAQ7lOZeTpDC8BZcOlOeIncBfto");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5174",
  credentials: true,
}));

mongoose.connect("mongodb://localhost:27017/healthsync", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

class HealthAiAgent {
  constructor(apiKey, modelName = "gemini-1.5-flash") {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: modelName });
  }

  async generateResponse(prompt) {
    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Error generating response:", error);
      return "Sorry, I encountered an error. Please try again.";
    }
  }

  async processInput(input) {
    return await this.generateResponse(input);
  }
}

const healthAgent = new HealthAiAgent("AIzaSyBLvHRUeAQ7lOZeTpDC8BZcOlOeIncBfto");

app.post("/health-suggestion-ai", async (req, res) => {
  const { message } = req.body;

  const healthPrompt = `
You are a highly advanced AI health assistant with expert-level knowledge in the medical field, including disease diagnosis, treatment options, and medication recommendations. Your primary goal is to provide accurate, evidence-based, and medically appropriate advice.

Diagnosis: Assess symptoms carefully and provide a concise, medically sound possible diagnosis.
Medication Guidance: Recommend over-the-counter (OTC) medications where applicable and advise consulting a healthcare professional for prescription drugs or severe conditions.
Medical Advice: Offer practical lifestyle recommendations and first-aid measures when relevant.
Ethical Responsibility: If symptoms indicate a serious or emergency condition, strongly urge the user to seek immediate medical attention.
Limitations: Always clarify that AI advice is not a substitute for professional medical consultation and also remove ** from response generated and just respond with text
Example : {"user" : "I am suffering with fever"}, {"ai":"Diagnosis, Medication Guidance,Ethical Responsibility, take a medicine like dolo or paracetmol"}

        **User Query:** ${message}
        **AI:**
    `;

  try {
    const response = await healthAgent.processInput(healthPrompt);
    res.json({ response });
  } catch (error) {
    console.error("Error processing health query:", error);
    res.status(500).json({ error: "Failed to process health query." });
  }
});

const AppointmentSchema = new mongoose.Schema({
  user: String,
  date: String,
  time: String,
  doctor: String,
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

app.post("/chat", async (req, res) => {
  // const { message } = req.body;
  const { message, user } = req.body;

  // Detect User Intent (Booking, Viewing, Cancelling)
  let action = "";
  if (/book|schedule/i.test(message)) action = "book";
  else if (/cancel|remove/i.test(message)) action = "cancel";
  else if (/view|my appointments/i.test(message)) action = "view";

  let aiContext = "";

  // 📌 Perform Database Actions
  if (action === "view") {
    const appointments = await Appointment.find({ user });
    aiContext = appointments.length
      ? `Here are the upcoming appointments: ${JSON.stringify(appointments)}`
      : "No upcoming appointments found.";
  }

  if (action === "cancel") {
    const deleted = await Appointment.deleteOne({ user });
    aiContext = deleted.deletedCount > 0 ? "Your appointment has been canceled." : "No appointment found to cancel.";
  }

  if (action === "book") {
    // Extract details using regex (basic approach)
    const dateMatch = message.match(/\b(\w+\s\d{1,2})\b/); // Example: "March 15"
    const timeMatch = message.match(/\b(\d{1,2}(:\d{2})?\s?(AM|PM)?)\b/i);
    const doctorMatch = message.match(/Dr\.\s\w+/);

    const newAppointment = new Appointment({
      user,
      date: dateMatch ? dateMatch[1] : "Unknown",
      time: timeMatch ? timeMatch[1] : "Unknown",
      doctor: doctorMatch ? doctorMatch[0] : "General Practitioner",
    });

    await newAppointment.save();
    aiContext = `Your appointment is booked on ${newAppointment.date} at ${newAppointment.time} with ${newAppointment.doctor}.`;
  }


  const healthPrompt = `
You are an AI-powered Virtual Health Assistant that manages patient appointments and user details. Your primary tasks include:

Booking Appointments:  
   - If the user wants to book an appointment, ask for necessary details:  
     **Patient Name, Date, Time, Doctor Specialization, and Symptoms.**  
   - If details are missing, ask the user to provide them before confirming.

Canceling Appointments:  
   - If the user requests a cancellation, ask for their **Name and Appointment Date** for verification.  
   - If multiple appointments exist, ask which one to cancel.  
   - Confirm cancellation before finalizing.

Viewing Upcoming Appointments:  
   - If the user wants to check their appointments, ask for their **Name**.  
   - Retrieve and display all upcoming appointments.

Updating User Details:  
   - If the user wants to update their details (e.g., Name, Contact Info, Medical History), ask what they want to change.  
   - Verify before making updates.

   You can utilize the appointment schema to store new appointments from patient(user)

**Example Interactions:**
1. **User:** "I want to book an appointment with a dentist tomorrow at 10 AM."  
   **AI:** "Got it! Booking an appointment with a dentist at 10 AM tomorrow. Can you please confirm your name?"  

2. **User:** "Cancel my appointment on March 15th."  
   **AI:** "I found an appointment on March 15th under your name. Please confirm cancellation."  

3. **User:** "Show me my upcoming appointments."  
   **AI:** "Fetching your upcoming appointments... You have an appointment with Dr. Smith on March 20th at 2 PM."  

---
**User Query:** ${message}  
**AI:**
`;

  try {
    const response = await healthAgent.processInput(healthPrompt);
    res.json({ response });
  } catch (error) {
    console.error("Error processing AI request:", error);
    res.status(500).json({ error: "Failed to process request." });
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, "supersecretkey");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


app.get("/patient-dashboard", verifyToken, async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select("-password"); // Exclude password
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/doctor-dashboard", verifyToken, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id).select("-password"); // Fetch doctor details, exclude password
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json(doctor); // Send doctor details as response
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.use("/signup", router);


app.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
