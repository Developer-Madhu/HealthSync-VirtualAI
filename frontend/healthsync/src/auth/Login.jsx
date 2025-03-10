// import React, { useState } from "react";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("User Login Data:", formData);

//     try {
//         const res = await axios.post("http://localhost:5000/patient-login", formData);
//         localStorage.setItem("token", res.data.token); // Store JWT token
//         localStorage.setItem("patient", JSON.stringify(res.data.patient)); // Store user data
//         navigate("/dashboard"); // Redirect to dashboard
//       } catch (err) {
//         throw new Error("Login failed");
//       }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center mb-6">User Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Username */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full outline-none border-b-2 p-3 focus:border-blue-500 transition"
//               placeholder="Enter your username"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full outline-none border-b-2 p-3 focus:border-blue-500 transition"
//               placeholder="Enter your password"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>
        
//         {/* Register Link */}
//         <p className="text-center text-gray-600 mt-4">
//           Don't have an account?{" "}
//           <a href="/register" className="text-blue-600 hover:underline">
//             Register here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/signup/patient-login", formData);
      localStorage.setItem("token", res.data.token); // Store JWT
      localStorage.setItem("patient", JSON.stringify(res.data.patient)); // Store user data
      navigate("/"); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 text-center">Patient Login</h2>
        <br />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <br />
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="w-full p-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
