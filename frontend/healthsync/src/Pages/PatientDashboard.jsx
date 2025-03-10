import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PatientDashboard = () => {
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState("overview"); // State to track active section
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const navigate = useNavigate();
    

    // const handleSend = async () => {
    //     if (!input.trim()) return;

    //     const res = await fetch("http://localhost:5000/patient-dashboard", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ message: input }),
    //     });

    //     const data = await res.json();
    //     setResponse(data.message); // Show AI response
    //     setInput(""); // Clear input
    // };


    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from localStorage
                if (!token) {
                    console.error("No token found in local storage");
                    return;
                }

                const response = await fetch("http://localhost:5000/patient-dashboard", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Send token in headers
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch patient data, status: ${response.status}`);
                }

                const data = await response.json();
                setPatient(data);
            } catch (error) {
                console.error("Error fetching patient:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPatient();
    }, []);

    function logout(){
        localStorage.removeItem('token')
        navigate('/')
    }

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!patient) return <div className="text-center mt-10">Please Login to Continue</div>;

    // Function to render content based on the active section
    const renderSectionContent = () => {
        switch (activeSection) {
            case "overview":
                return (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-100 p-4 rounded-lg text-center">
                                <p className="text-gray-500">Heart Rate</p>
                                <p className="text-2xl font-bold text-blue-600">72 <span className="text-sm">bpm</span></p>
                                <p className="text-xs text-gray-400">Last reading: Apr 1, 2023</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg text-center">
                                <p className="text-gray-500">Blood Pressure</p>
                                <p className="text-2xl font-bold text-blue-600">120/80 <span className="text-sm">mmHg</span></p>
                                <p className="text-xs text-gray-400">Last reading: Apr 1, 2023</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg text-center">
                                <p className="text-gray-500">Weight</p>
                                <p className="text-2xl font-bold text-blue-600">{patient.weight} <span className="text-sm">kg</span></p>
                                <p className="text-xs text-gray-400">Last reading: Apr 1, 2023</p>
                            </div>
                        </div>
                    </div>
                );
            case "appointments":
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-700">Upcoming Appointments</h3>
                        <div className="mt-2 bg-gray-100 p-4 rounded-lg">
                            <p className="font-bold">Dr. Emma Williams</p>
                            <p className="text-sm text-gray-500">Dermatologist</p>
                            <p className="text-sm text-gray-500">April 15, 2023 - 2:30 PM</p>
                        </div>
                        <div className="mt-2 bg-gray-100 p-4 rounded-lg">
                            <p className="font-bold">Dr. Michael Johnson</p>
                            <p className="text-sm text-gray-500">Neurologist</p>
                            <p className="text-sm text-gray-500">April 22, 2023 - 10:00 AM</p>
                        </div>
                        <button className="text-blue-600 mt-2">View all appointments</button>
                    </div>
                );
            case "medications":
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-700">Current Medications</h3>
                        <div className="mt-2 bg-gray-100 p-4 rounded-lg">
                            <p className="font-bold">Amoxicillin</p>
                            <p className="text-sm text-gray-500">500mg, Every 8 hours</p>
                        </div>
                        <div className="mt-2 bg-gray-100 p-4 rounded-lg">
                            <p className="font-bold">Ibuprofen</p>
                            <p className="text-sm text-gray-500">400mg, As needed for pain</p>
                        </div>
                        <button className="text-blue-600 mt-2">View all medications</button>
                    </div>
                );
            case "medical-records":
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-700">Medical Records</h3>
                        <div className="mt-2 bg-gray-100 p-4 rounded-lg">
                            <p className="font-bold">Blood Test Report</p>
                            <p className="text-sm text-gray-500">Date: March 30, 2023</p>
                        </div>
                        <div className="mt-2 bg-gray-100 p-4 rounded-lg">
                            <p className="font-bold">X-Ray Report</p>
                            <p className="text-sm text-gray-500">Date: March 25, 2023</p>
                        </div>
                        <button className="text-blue-600 mt-2">View all medical records</button>
                    </div>
                );
            case "profile-settings":
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-700">Profile Settings</h3>
                        <div className="mt-2 bg-gray-100 p-4 rounded-lg">
                            <p className="font-bold">Full Name</p>
                            <p className="text-sm text-gray-500">{patient.fullName}</p>
                        </div>
                        <div className="mt-2 bg-gray-100 p-4 rounded-lg">
                            <p className="font-bold">Email</p>
                            <p className="text-sm text-gray-500">{patient.email}</p>
                        </div>
                        <div className="mt-2 bg-gray-100 p-4 rounded-lg">
                            <p className="font-bold">Phone</p>
                            <p className="text-sm text-gray-500">{patient.phone}</p>
                        </div>
                        <br />
                        <div className="flex gap-3">
                        {/* <button className="bg-blue-600 text-white rounded-md p-2 mt-2">Edit Profile</button> */}
                        <br />
                        <button onClick={logout} className="bg-blue-600 text-white rounded-md p-2 mt-2">Logout</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-700 mb-4">Your Health Dashboard</h1>
            <p className="text-gray-500 mb-6">Track your appointments, medications, and health data all in one place.</p>

            {/* Main Dashboard */}
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                {/* Sidebar */}
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/4 bg-gray-50 p-4 rounded-lg shadow-md">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center text-2xl rounded-full">
                                {patient.fullName.charAt(0)}
                            </div>
                            <h2 className="mt-2 font-bold text-lg">{patient.fullName}</h2>
                            <p className="text-gray-500">{patient.email}</p>
                        </div>

                        <nav className="mt-4 space-y-2">
                            <button
                                className={`w-full p-2 text-left ${activeSection === "overview" ? "bg-blue-100" : "hover:bg-gray-100"} rounded-md`}
                                onClick={() => setActiveSection("overview")}
                            >
                                Overview
                            </button>
                            <button
                                className={`w-full p-2 text-left ${activeSection === "appointments" ? "bg-blue-100" : "hover:bg-gray-100"} rounded-md`}
                                onClick={() => setActiveSection("appointments")}
                            >
                                Appointments
                            </button>
                            <button
                                className={`w-full p-2 text-left ${activeSection === "medications" ? "bg-blue-100" : "hover:bg-gray-100"} rounded-md`}
                                onClick={() => setActiveSection("medications")}
                            >
                                Medications
                            </button>
                            <button
                                className={`w-full p-2 text-left ${activeSection === "medical-records" ? "bg-blue-100" : "hover:bg-gray-100"} rounded-md`}
                                onClick={() => setActiveSection("medical-records")}
                            >
                                Medical Records
                            </button>
                            <button
                                className={`w-full p-2 text-left ${activeSection === "profile-settings" ? "bg-blue-100" : "hover:bg-gray-100"} rounded-md`}
                                onClick={() => setActiveSection("profile-settings")}
                            >
                                Profile Settings
                            </button>
                        </nav>

                        <div className="mt-4 p-3 bg-blue-50 text-center rounded-lg">
                            <p className="text-sm">Need Help?</p>
                            <button className="mt-2 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                                Contact Support
                            </button>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-3/4 p-4">
                        {renderSectionContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;

// import axios from "axios";
// import { useState, useEffect } from "react";

// const PatientDashboard = () => {
//     const [patient, setPatient] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchPatient = async () => {
//             try {
//                 const token = localStorage.getItem("token"); // Get token from localStorage
//                 if (!token) {
//                     console.error("No token found in local storage");
//                     return;
//                 }
    
//                 const response = await fetch("http://localhost:5000/patient-dashboard", {
//                     method: "GET",
//                     headers: {
//                         "Authorization": `Bearer ${token}`, // Send token in headers
//                         "Content-Type": "application/json",
//                     },
//                     credentials: "include", // Ensure cookies are sent
//                 });
    
//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch patient data, status: ${response.status}`);
//                 }
    
//                 const data = await response.json();
//                 setPatient(data);
//             } catch (error) {
//                 console.error("Error fetching patient:", error);
//             }
//         };
    
//         fetchPatient();
//     }, []);
    


//     if (loading) return <div className="text-center mt-10">Loading...</div>;
//     if (!patient) return <div className="text-center mt-10">No patient found.</div>;

//     return (
//         <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
//             <h1 className="text-3xl font-bold text-gray-700 mb-4">Your Health Dashboard</h1>
//             <p className="text-gray-500 mb-6">Track your health data all in one place.</p>

//             <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
//                 {/* Sidebar */}
//                 <div className="flex flex-col md:flex-row">
//                     <div className="w-full md:w-1/4 bg-gray-50 p-4 rounded-lg shadow-md">
//                         <div className="flex flex-col items-center">
//                             <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center text-2xl rounded-full">
//                                 {patient.fullName.charAt(0)}
//                             </div>
//                             <h2 className="mt-2 font-bold text-lg">{patient.fullName}</h2>
//                             <p className="text-gray-500">{patient.email}</p>
//                         </div>
//                     </div>

//                     {/* Right Section */}
//                     <div className="w-full md:w-3/4 p-4">
//                         {/* Health Overview */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <div className="bg-gray-100 p-4 rounded-lg text-center">
//                                 <p className="text-gray-500">Age</p>
//                                 <p className="text-2xl font-bold text-blue-600">{patient.age} <span className="text-sm">years</span></p>
//                             </div>
//                             <div className="bg-gray-100 p-4 rounded-lg text-center">
//                                 <p className="text-gray-500">Weight</p>
//                                 <p className="text-2xl font-bold text-blue-600">{patient.weight} <span className="text-sm">kg</span></p>
//                             </div>
//                             <div className="bg-gray-100 p-4 rounded-lg text-center">
//                                 <p className="text-gray-500">Blood Group</p>
//                                 <p className="text-2xl font-bold text-blue-600">{patient.bloodGroup}</p>
//                             </div>
//                         </div>

//                         {/* Contact & Address */}
//                         <div className="mt-6 bg-gray-100 p-4 rounded-lg">
//                             <p className="font-bold">Contact</p>
//                             <p className="text-gray-500">Phone: {patient.phone}</p>
//                             <p className="text-gray-500">Address: {patient.address}</p>
//                         </div>

//                         {/* Health Checks */}
//                         <div className="mt-6">
//                             <h3 className="text-lg font-bold text-gray-700">Health Checks</h3>
//                             {patient.healthChecks.length > 0 ? (
//                                 <ul className="list-disc ml-6 text-gray-500">
//                                     {patient.healthChecks.map((check, index) => (
//                                         <li key={index}>{check}</li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p className="text-gray-500">No recent health checks.</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PatientDashboard;
// import { useState, useEffect } from "react";

// export const PatientDashboard = () => {
//     const [patient, setPatient] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchPatient = async () => {
//             try {
//                 const token = localStorage.getItem("token"); // Get token from localStorage
//                 if (!token) {
//                     console.error("No token found in local storage");
//                     return;
//                 }

//                 const response = await fetch("http://localhost:5000/patient-dashboard", {
//                     method: "GET",
//                     headers: {
//                         "Authorization": `Bearer ${token}`, // Send token in headers
//                         "Content-Type": "application/json",
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch patient data, status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 setPatient(data);
//             } catch (error) {
//                 console.error("Error fetching patient:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPatient();
//     }, []);

//     if (loading) return <div className="text-center mt-10">Loading...</div>;
//     if (!patient) return <div className="text-center mt-10">No patient found.</div>;

//     return (
//         <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
//             <h1 className="text-3xl font-bold text-gray-700 mb-4">Your Health Dashboard</h1>
//             <p className="text-gray-500 mb-6">Track your health data all in one place.</p>

//             <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
//                 {/* Sidebar */}
//                 <div className="flex flex-col md:flex-row">
//                     <div className="w-full md:w-1/4 bg-gray-50 p-4 rounded-lg shadow-md">
//                         <div className="flex flex-col items-center">
//                             <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center text-2xl rounded-full">
//                                 {patient.fullName.charAt(0)}
//                             </div>
//                             <h2 className="mt-2 font-bold text-lg">{patient.fullName}</h2>
//                             <p className="text-gray-500">{patient.email}</p>
//                         </div>
//                     </div>

//                     {/* Right Section */}
//                     <div className="w-full md:w-3/4 p-4">
//                         {/* Health Overview */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <div className="bg-gray-100 p-4 rounded-lg text-center">
//                                 <p className="text-gray-500">Age</p>
//                                 <p className="text-2xl font-bold text-blue-600">{patient.age} <span className="text-sm">years</span></p>
//                             </div>
//                             <div className="bg-gray-100 p-4 rounded-lg text-center">
//                                 <p className="text-gray-500">Weight</p>
//                                 <p className="text-2xl font-bold text-blue-600">{patient.weight} <span className="text-sm">kg</span></p>
//                             </div>
//                             <div className="bg-gray-100 p-4 rounded-lg text-center">
//                                 <p className="text-gray-500">Blood Group</p>
//                                 <p className="text-2xl font-bold text-blue-600">{patient.bloodGroup}</p>
//                             </div>
//                         </div>

//                         {/* Contact & Address */}
//                         <div className="mt-6 bg-gray-100 p-4 rounded-lg">
//                             <p className="font-bold">Contact</p>
//                             <p className="text-gray-500">Phone: {patient.phone}</p>
//                             <p className="text-gray-500">Address: {patient.address}</p>
//                         </div>

//                         {/* Health Checks */}
//                         <div className="mt-6">
//                             <h3 className="text-lg font-bold text-gray-700">Health Checks</h3>
//                             {patient.healthChecks.length > 0 ? (
//                                 <ul className="list-disc ml-6 text-gray-500">
//                                     {patient.healthChecks.map((check, index) => (
//                                         <li key={index}>{check}</li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p className="text-gray-500">No recent health checks.</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PatientDashboard;