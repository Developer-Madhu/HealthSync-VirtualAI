import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // For navigation
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const LoginDoc = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await fetch("http://localhost:5000/signup/doctor-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();

      // Store the token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", data.userType)

      toast.success("Login Successful!");

      // Redirect to the doctor dashboard after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1000); // Redirect after 2 seconds
    } catch (error) {
      // Show error toast
      toast.error(error.message || "An error occurred during login.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Doctor Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            className="w-full outline-none border-b-2 p-3"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="w-full outline-none border-b-2 p-3"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginDoc;