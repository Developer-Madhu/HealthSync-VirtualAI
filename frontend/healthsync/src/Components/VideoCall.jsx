// import React, { useEffect, useRef, useState } from 'react';
// import Peer from 'simple-peer';
// import { Camera, CameraOff, Mic, MicOff, PhoneOff } from 'lucide-react';

// export const VideoCall = ({ onEnd }) => {
//   const [stream, setStream] = useState(null);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   const myVideo = useRef(null);
//   const peerVideo = useRef(null);
//   const peerRef = useRef();

//   useEffect(() => {
//     const startStream = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true
//         });
//         setStream(stream);
//         if (myVideo.current) {
//           myVideo.current.srcObject = stream;
//         }
//         initializePeer(stream);
//       } catch (err) {
//         console.error('Error accessing media devices:', err);
//       }
//     };

//     startStream();

//     return () => {
//       stream?.getTracks().forEach(track => track.stop());
//     };
//   }, []);

//   const initializePeer = (stream) => {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream
//     });

//     peer.on('signal', data => {
//       // Here you would send the signal data to the other peer
//       console.log('Signal data:', data);
//     });

//     peer.on('stream', stream => {
//       if (peerVideo.current) {
//         peerVideo.current.srcObject = stream;
//       }
//     });

//     peerRef.current = peer;
//   };

//   const toggleMute = () => {
//     if (stream) {
//       stream.getAudioTracks().forEach(track => {
//         track.enabled = !track.enabled;
//       });
//       setIsMuted(!isMuted);
//     }
//   };

//   const toggleVideo = () => {
//     if (stream) {
//       stream.getVideoTracks().forEach(track => {
//         track.enabled = !track.enabled;
//       });
//       setIsVideoOff(!isVideoOff);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center">
//       <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
//         <video
//           ref={peerVideo}
//           autoPlay
//           playsInline
//           className="w-full h-full object-cover"
//         />
//         <video
//           ref={myVideo}
//           autoPlay
//           playsInline
//           muted
//           className="absolute bottom-4 right-4 w-48 aspect-video object-cover rounded-lg border-2 border-white"
//         />
//       </div>
      
//       <div className="mt-4 flex gap-4">
//         <button
//           onClick={toggleMute}
//           className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
//         >
//           {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
//         </button>
//         <button
//           onClick={toggleVideo}
//           className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
//         >
//           {isVideoOff ? <CameraOff size={24} /> : <Camera size={24} />}
//         </button>
//         <button
//           onClick={onEnd}
//           className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white"
//         >
//           <PhoneOff size={24} />
//         </button>
//       </div>
//     </div>
//   );
// };
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

const socket = io("http://localhost:5000");

export const VideoCall = ({ userId, callTo }) => {
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();
  const peerRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      if (myVideo.current) myVideo.current.srcObject = stream;
    });

    socket.emit("joinRoom", userId);

    // Listen for incoming call
    socket.on("callIncoming", ({ from, signal }) => {
      setReceivingCall(true);
      setCaller(from);
      peerRef.current = new Peer({ initiator: false, trickle: false, stream });

      peerRef.current.on("signal", (data) => {
        socket.emit("answerCall", { signal: data, to: from });
      });

      peerRef.current.on("stream", (remoteStream) => {
        if (userVideo.current) userVideo.current.srcObject = remoteStream;
      });

      peerRef.current.signal(signal);
      setCallAccepted(true);
    });
  }, [userId]);

  const callUser = () => {
    peerRef.current = new Peer({ initiator: true, trickle: false, stream });

    peerRef.current.on("signal", (data) => {
      socket.emit("callUser", { userToCall: callTo, signalData: data, from: userId });
    });

    peerRef.current.on("stream", (remoteStream) => {
      if (userVideo.current) userVideo.current.srcObject = remoteStream;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <video ref={myVideo} autoPlay muted className="w-1/3 border rounded-lg" />
      {callAccepted && <video ref={userVideo} autoPlay className="w-1/3 border rounded-lg" />}

      <div className="mt-4">
        {!callAccepted && <button onClick={callUser} className="bg-blue-500 text-white px-4 py-2 rounded">Call</button>}
        {receivingCall && <p>Incoming call...</p>}
      </div>
    </div>
  );
};

export default VideoCall;
