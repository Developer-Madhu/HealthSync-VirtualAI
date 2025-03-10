import { useState, useEffect } from "react";

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) {
          console.error("No token found in local storage");
          return;
        }

        const response = await fetch("http://localhost:5000/doctor-dashboard", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Send token in headers
            "Content-Type": "application/json", 
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch doctor data, status: ${response.status}`);
        }

        const data = await response.json();
        setDoctor(data); // Set doctor details in state
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!doctor) return <div className="text-center mt-10">No doctor found.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Your Doctor Dashboard</h1>
      <p className="text-gray-500 mb-6">Manage your practice and patient data all in one place.</p>

      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        {/* Sidebar */}
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 bg-gray-50 p-4 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center text-2xl rounded-full">
                {doctor.fullName.charAt(0)}
              </div>
              <h2 className="mt-2 font-bold text-lg">{doctor.fullName}</h2>
              <p className="text-gray-500">{doctor.email}</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-3/4 p-4">
            {/* Doctor Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-500">Specialty</p>
                <p className="text-2xl font-bold text-blue-600">{doctor.specialty}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-500">License Number</p>
                <p className="text-2xl font-bold text-blue-600">{doctor.licenseNumber}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-500">Experience</p>
                <p className="text-2xl font-bold text-blue-600">{doctor.experience} <span className="text-sm">years</span></p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-500">Phone</p>
                <p className="text-2xl font-bold text-blue-600">{doctor.phone}</p>
              </div>
            </div>

            {/* Clinic Address */}
            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <p className="font-bold">Clinic Address</p>
              <p className="text-gray-500">{doctor.clinicAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;