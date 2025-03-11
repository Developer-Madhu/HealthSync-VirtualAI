import { Link } from "react-router-dom";
import doc from '../assets/doc.jpeg'
import patient from '../assets/patient.jpg'

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Doctor Box */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <div className="w-full h-auto bg-gray-200 flex items-center justify-center rounded-lg">
            <img src={doc} alt="" />
          </div>
          <p className="text-gray-500 text-xs uppercase mt-4">Doctor Access</p>
          <h3 className="text-xl font-bold">For Medical Professionals</h3>
          <p className="text-gray-600 mt-2">Doctors can sign in to manage appointments, consult patients, and access records.</p>
          <div className="mt-4">
            <Link to="/signup/doctor-login" className="text-blue-600 font-semibold">Login</Link>
            <span className="mx-2">|</span>
            <Link to="/signup/doctor-register" className="text-blue-600 font-semibold">Register</Link>
          </div>
        </div>

        {/* Patient Box */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <div className="w-full h-auto bg-gray-200 flex items-center justify-center rounded-lg">
            <img src={patient} alt="" />
          </div>
          <p className="text-gray-500 text-xs uppercase mt-4">Patient Access</p>
          <h3 className="text-xl font-bold">For Users & Patients</h3>
          <p className="text-gray-600 mt-2">Patients can register, book virtual doctor consultations, and manage health records.</p>
          <div className="mt-4">
            <Link to="/signup/patient-login" className="text-blue-600 font-semibold">Login</Link>
            <span className="mx-2">|</span>
            <Link to="/signup/patient-register" className="text-blue-600 font-semibold">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;