import React from "react";
import VideoCall from "../Components/VideoCall";

const DoctorDashboard = () => {
  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <VideoCall userId="doctor456" callTo="patient123" />
    </div>
  );
};

export default DoctorDashboard;
