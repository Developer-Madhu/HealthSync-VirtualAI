import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to backend

const NotificationProvider = () => {
    useEffect(() => {
        socket.on("new-notification", (data) => {
            toast.info(data.message, { position: "top-right", autoClose: 5000 });
        });

        return () => socket.off("new-notification");
    }, []);

    return <ToastContainer />;
};

export default NotificationProvider;
