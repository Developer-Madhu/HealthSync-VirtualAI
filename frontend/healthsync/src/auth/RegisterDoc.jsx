import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterDoc = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialty: "",
    licenseNumber: "",
    phone: "",
    experience: "",
    clinicAddress: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:5000/signup/doctor-register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error("Error:", error);
    }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Doctor Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input className="outline-none border-b-1 p-3 border-blue-500 input-field" type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
            <input className="outline-none border-b-1 p-3 input-field" type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <input className="outline-none border-b-1 p-3 input-field" type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <input className="outline-none border-b-1 p-3 input-field" type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
            <input className="outline-none border-b-1 p-3 input-field" type="text" name="specialty" placeholder="Specialty" required onChange={handleChange} />
            <input className="outline-none border-b-1 p-3 input-field" type="text" name="licenseNumber" placeholder="License Number" required onChange={handleChange} />
            <input className="outline-none border-b-1 p-3 input-field" type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
            <input className="outline-none border-b-1 p-3 input-field" type="number" name="experience" placeholder="Years of Experience" required onChange={handleChange} />
          </div>
          <textarea className="input-field" name="clinicAddress" placeholder="Clinic Address" required onChange={handleChange}></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">Register</button>
        </form>
        <br />
      <p className="text-center">Already have account ? Please <Link to='/doctor-login' className="text-blue-500">Login</Link></p>
      </div>
    </div>
  );
};

export default RegisterDoc;
