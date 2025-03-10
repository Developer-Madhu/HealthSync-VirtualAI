// // import express from 'express'
// // import path from "path";
// // import { fileURLToPath } from "url";
// // import { createServer } from 'http';
// // import { Server } from "socket.io"

// // const app = express()
// // const server = createServer(app);
// // const io = new Server(server, { cors: { origin: '*' } });

// // app.use(express.static('dummy'))

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);



// // app.get("/", (req, res) => {
// //     res.sendFile(path.join(__dirname, "dummy", "index.html"));
// // });

// // io.on("connection", (socket) =>
// //     socket.on('message', (msg) => {
// //         io.emit('returnmsg', msg)
// //     }))

// // server.listen(8080, () => console.log("App started listening.."))
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
// import Contact from './models/contact.js'
// import router from "./routes/route.js";

// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB Connection
// mongoose.connect("mongodb://localhost:27017/healthsync", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error(err));

// // API Route

// app.use("/signup", router)

// app.post("/", async (req, res) => {
//     try {
//       const { name, email, message } = req.body;
//       const newContact = new Contact({ name, email, message });
//       await newContact.save();
//       res.status(201).json({ message: "Message sent successfully!" });
//     } catch (error) {
//       res.status(500).json({ message: "Server error" });
//     }
//   });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
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

app.post("/assistant-dashboard", async (req, res) => {
  const { message } = req.body;

  const dashboardPrompt = `
You are an AI assistant that manages a patient's healthcare dashboard. Your role is to process user requests and perform actions like booking, canceling, or showing appointments, and updating user details.

Tasks you can perform:
- Booking an appointment: Example - "Book an appointment with Dr. Smith at 10 AM tomorrow."
- Canceling an appointment: Example - "Cancel my appointment on March 15."
- Viewing upcoming appointments: Example - "Show my upcoming appointments."
- Updating user details: Example - "Update my contact details to [new details]."

Analyze the user request and respond accordingly.

**User Query:** ${message}
**AI Response:**
`;

  try {
    const response = await healthAgent.processInput(dashboardPrompt);
    let aiResponse = response.replace(/\*\*/g, ""); // Remove ** from response

    // Handle different actions based on AI response
    if (message.toLowerCase().includes("book an appointment")) {
      // Call backend appointment API
      return res.json({ response: "✅ Appointment booked successfully!" });
    }

    if (message.toLowerCase().includes("cancel appointment")) {
      // Call API to cancel appointment
      return res.json({ response: "❌ Appointment canceled!" });
    }

    if (message.toLowerCase().includes("show my upcoming appointments")) {
      // Fetch appointments from database
      return res.json({ response: "📅 Here are your upcoming appointments: [List of appointments]" });
    }

    if (message.toLowerCase().includes("update my contact details")) {
      // Update user details in database
      return res.json({ response: "⚙ Contact details updated successfully!" });
    }

    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error processing dashboard request:", error);
    res.status(500).json({ error: "Failed to process request." });
  }
});


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get Authorization header
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, "supersecretkey"); // Replace with environment variable
    req.user = decoded; // Attach decoded user info to request
    next(); // Continue to next middleware
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
