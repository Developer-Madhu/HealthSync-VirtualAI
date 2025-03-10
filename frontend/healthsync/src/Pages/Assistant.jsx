import { useState } from "react";
import axios from "axios";

const Assistant = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

//   const sendMessage = async () => {
//     if (!message.trim()) return;
//     try {
//       const { data } = await axios.post("http://localhost:5000/chat", { message });
//       setResponse(data.response);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setResponse("Error processing request.");
//     }
//   };
const [user, setUser] = useState("JohnDoe"); // Example user (replace with actual user logic)

const sendMessage = async () => {
  if (!message.trim()) return;

  try {
    const { data } = await axios.post("http://localhost:5000/chat", { message, user });
    setResponse(data.response);
  } catch (error) {
    console.error("Error sending message:", error);
    setResponse("Error processing request.");
  }
};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl text-center font-semibold text-gray-800 mb-4">AI Health Assistant</h1>
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Enter your request..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={sendMessage}
        >
          Send
        </button>
        {response && (
          <div className="mt-4 p-3 bg-gray-200 rounded-lg">
            <strong>HealthSync Assistant:</strong> <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assistant;
