import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        age: "",
        phone: "",
        address: "",
        healthChecks: [],
    });

    const navigate = useNavigate();

    const healthOptions = ["BP", "Sugar", "Asthma", "Cholesterol", "Typhoid"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            healthChecks: checked
                ? [...prev.healthChecks, value]
                : prev.healthChecks.filter((item) => item !== value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/signup/patient-register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            alert(data.message);

            if (response.ok) {
                navigate(`/patient-dashboard/${formData.email}`); // Redirect to dashboard
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Patient Registration</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input className="w-full outline-none border-b-2 p-3" type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
                    <input className="w-full outline-none border-b-2 p-3" type="email" name="email" placeholder="Email" required onChange={handleChange} />
                    <input className="w-full outline-none border-b-2 p-3" type="password" name="password" placeholder="Password" required onChange={handleChange} />
                    <input className="w-full outline-none border-b-2 p-3" type="number" name="age" placeholder="Age" required onChange={handleChange} />
                    <input className="w-full outline-none border-b-2 p-3" type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
                    <div className="mt-4">
                        <label className="block text-gray-600 mb-2">Select Basic Health Checks:</label>
                        <div className="grid grid-cols-2 gap-2">
                            {healthOptions.map((option) => (
                                <label key={option} className="flex items-center space-x-2">
                                    <input type="checkbox" name="healthChecks" value={option} onChange={handleCheckboxChange} />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                        <br />
                        <div className="space-y-4">
                            <input className="w-full outline-none border-b-2 p-3" type="text" name="weight" placeholder="Weight (in Kgs)" required onChange={handleChange} />
                            <input className="w-full outline-none border-b-2 p-3" type="text" name="bloodgroup" placeholder="Blood Group (AB Positive..)" required onChange={handleChange} />
                            <input className="w-full outline-none border-b-2 p-3" type="text" name="address" placeholder="Address" required onChange={handleChange} />
                        </div>
                        <br />
                        <p className="hello text-center">Already have account ? Please <Link to='/doctor-login' className="text-blue-500">Login</Link></p>

                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
