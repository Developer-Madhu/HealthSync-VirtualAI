import { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({ patientId }) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/patient-dashboard/${patientId}`)
      .then((res) => setPatient(res.data))
      .catch((err) => console.error(err));
  }, [patientId]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {patient ? (
        <div>
          <h2 className="text-xl font-bold">{patient.fullName}</h2>
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>Phone:</strong> {patient.phone}</p>
          <p><strong>Health Conditions:</strong> {patient.healthChecks.join(", ")}</p>

          <h3 className="mt-4 font-semibold">Uploaded Reports</h3>
          <ul>
            {patient.reports.length > 0 ? patient.reports.map((report, index) => (
              <li key={index} className="text-blue-500 mt-2">{report}</li>
            )) : <p>No reports uploaded.</p>}
          </ul>
        </div>
      ) : (
        <p>Loading patient details...</p>
      )}
    </div>
  );
};

export default Profile;
