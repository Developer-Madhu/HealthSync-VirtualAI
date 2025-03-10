import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import Patient from '../models/patientSchema.js'
import Doctor from "../models/doctorSchema.js";

const router = Router()

router.post("/patient-register", async (req, res) => {
  try {
    const { fullName, email, password, age, phone, address, healthChecks, weight, bloodGroup } = req.body;

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new Patient({
      fullName,
      email,
      password: hashedPassword,
      age,
      phone,
      address,
      healthChecks,
      weight,
      bloodGroup
    });

    await newPatient.save();
    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



router.post("/doctor-register", async (req, res) => {
  try {
    const { fullName, email, password, specialty, licenseNumber, phone, experience, clinicAddress } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) return res.status(400).json({ message: "Email already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new doctor
    const newDoctor = new Doctor({
      fullName,
      email,
      password: hashedPassword,
      specialty,
      licenseNumber,
      phone,
      experience,
      clinicAddress,
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// router.post("/patient-login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const patient = await Patient.findOne({ email });
//     if (!patient) return res.status(400).json({ message: "User not found" });

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, patient.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     // Generate JWT Token  
//     const token = jwt.sign({ id: patient._id }, "SECRET_KEY", { expiresIn: "1h" });

//     res.status(200).json({ message: "Login successful", token, patient });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });
router.post("/patient-login", async (req, res) => {
  try {
      const { email, password } = req.body;
      const patient = await Patient.findOne({ email });

      if (!patient) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, patient.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: patient._id }, "supersecretkey", { expiresIn: "1h" });

      // Set token in HttpOnly cookie
      res.cookie("token", token, {
          httpOnly: true,
          secure: true,  // Set to 'true' in production (HTTPS required)
          maxAge: 3600000, // 1 hour
      });

      res.status(200).json({ token, patientId: patient._id });
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
});

router.post("/doctor-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find doctor by email
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: doctor._id }, "supersecretkey", { expiresIn: "1h" });

    // Return token and doctor ID
    res.status(200).json({ token, doctorId: doctor._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router