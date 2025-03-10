import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/", {
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
    <div className="flex items-center justify-center bg-white p-8 rounded-md">
      <div className="w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
        <p className="text-gray-500 mt-2">
          we are always for you, Feel free to contact us and asking your quries
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-left">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                onChange={handleChange}
                className="w-full bg-gray-100 p-3 border-b-2 border-gray-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-left">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={handleChange}
                className="w-full bg-gray-100 p-3 border-b-2 border-gray-300 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-600 text-left">Message</label>
            <textarea
              name="message"
              placeholder="Message"
              draggable='false'
              required
              onChange={handleChange}
              className="w-full bg-gray-100 p-3 border-b-2 border-gray-300 outline-none h-32"
            />
          </div>
          <button type="submit" className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
