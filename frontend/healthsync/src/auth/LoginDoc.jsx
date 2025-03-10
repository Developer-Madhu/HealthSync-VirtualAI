import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const LoginDoc = () => {
    const notify = () => toast("Login Successfull!");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
                        onChange={handleChange}
                    />
                    <input
                        className="w-full outline-none border-b-2 p-3"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                    />
                    <button type="submit" onClick={notify} className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                        Login
                    </button>
                    <ToastContainer />

                </form>
            </div>
        </div>
    );
};

export default LoginDoc;