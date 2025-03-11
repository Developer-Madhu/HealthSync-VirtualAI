import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import AITools from './Components/AITools';
import ChatBot from './components/ChatBot';
import Footer from './Components/Footer';
import DocPage from './Pages/DocPage';
import RegisterDoc from './auth/RegisterDoc';
import LoginDoc from './auth/LoginDoc';
import SignUpPage from './auth/SignUpPage';
import Register from './auth/Register';
import Login from './auth/Login';
import DoctorDashboard from './Pages/DoctorDashboard';
import AiAgent from './Pages/HealthAiAgent';
import PatientDashboard from './Pages/PatientDashboard';
import Maps from './Pages/Maps';
import Assistant from './Pages/Assistant';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="/chat" element={<Assistant />} />
          <Route path="/signup/doctor-register" element={<RegisterDoc />} />
          <Route path="/signup/doctor-login" element={<LoginDoc />} />
          <Route path="/signup/patient-register" element={<Register />} />
          <Route path="/signup/patient-login" element={<Login />} />
          <Route path="/appointments" element={<DocPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/health-suggestion-ai" element={<AiAgent />} />
          <Route path="/maps" element={<Maps />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
