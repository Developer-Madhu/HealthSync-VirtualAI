import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  age: { type: Number, required: true, min: 1 },
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  healthChecks: { type: [String], default: [] },
  weight: { type: Number, required: true, min: 1 },  // Changed to Number
  bloodGroup: { type: String, trim: true, uppercase: true },
  reports: { type: [String], default: [] }, // Default empty array for safety
  createdAt: { type: Date, default: Date.now },
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient
