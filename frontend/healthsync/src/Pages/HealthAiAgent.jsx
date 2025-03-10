// import { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Send, Loader2 } from "lucide-react";

// const HealthAiAgent = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const [loading, setLoading] = useState(false);
//     const chatContainerRef = useRef(null);

//     // Scroll to the latest message
//     useEffect(() => {
//         chatContainerRef.current?.scrollTo({
//             top: chatContainerRef.current.scrollHeight,
//             behavior: "smooth",
//         });
//     }, [messages]);

//     // Handle form submission
//     const sendMessage = async (e) => {
//         e.preventDefault();
//         if (!input.trim()) return;

//         const newMessage = { text: input, sender: "user" };
//         setMessages((prev) => [...prev, newMessage]);
//         setInput("");
//         setLoading(true);

//         try {
//             const response = await fetch("http://localhost:5000/health-suggestion-ai", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ message: input }),
//             });

//             const data = await response.json();
//             const aiMessage = { text: data.response, sender: "ai" };

//             setMessages((prev) => [...prev, aiMessage]);
//         } catch (error) {
//             console.error("Error fetching AI response:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//             <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg overflow-hidden">
//                 {/* Header */}
//                 <div className="bg-green-600 text-white text-center py-4 text-lg font-semibold">
//                     HealthSync AI Assistant
//                 </div>

//                 {/* Chat Messages */}
//                 <div ref={chatContainerRef} className="h-96 overflow-y-auto p-4 space-y-4">
//                     {messages.map((msg, index) => (
//                         <motion.div
//                             key={index}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3 }}
//                             className={`p-3 max-w-xs rounded-lg ${
//                                 msg.sender === "user"
//                                     ? "bg-green-500 text-white self-end ml-auto"
//                                     : "bg-gray-200 text-gray-800 self-start"
//                             }`}
//                         >
//                             {msg.text}
//                         </motion.div>
//                     ))}

//                     {loading && (
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ repeat: Infinity, duration: 1 }}
//                             className="text-gray-500 text-center"
//                         >
//                             <Loader2 className="animate-spin inline-block w-5 h-5 mr-2" /> HealthSync is thinking...
//                         </motion.div>
//                     )}
//                 </div>

//                 {/* Input Box */}
//                 <form onSubmit={sendMessage} className="flex border-t p-3">
//                     <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         placeholder="Ask a health-related question..."
//                         className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                     <button
//                         type="submit"
//                         className="ml-2 p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center"
//                         disabled={loading}
//                     >
//                         {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default HealthAiAgent;
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, History } from "lucide-react";

const HealthAiAgent = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const chatContainerRef = useRef(null);

    // Load history from local storage
    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
        setMessages(savedMessages);
    }, []);

    // Save messages to local storage
    useEffect(() => {
        localStorage.setItem("chatHistory", JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/health-suggestion-ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            const aiMessage = { text: data.response, sender: "ai" };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error fetching AI response:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-lime-200 to-emerald-300 p-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-white/50 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden relative"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-green-700 text-white text-center py-4 text-xl font-semibold shadow-md flex justify-between px-4">
                    <span>HealthSync AI Assistant</span>
                    <button onClick={() => setShowHistory(!showHistory)} className="hover:scale-110 transition">
                        <History className="w-6 h-6" />
                    </button>
                </div>
                
                {/* Collapsible History Panel */}
                {showHistory && (
                    <div className="absolute left-0 top-14 bg-white shadow-lg p-4 w-64 h-80 overflow-y-auto rounded-lg">
                        <h3 className="font-semibold mb-2">Chat History</h3>
                        {messages.map((msg, index) => (
                            <p key={index} className="text-sm p-1 border-b">{msg.text}</p>
                        ))}
                    </div>
                )}

                {/* Chat Messages */}
                <div ref={chatContainerRef} className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`p-3 max-w-xs text-sm rounded-xl shadow-md ${
                                msg.sender === "user" ? "bg-green-500 text-white ml-auto" : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            {msg.text}
                        </motion.div>
                    ))}

                    {loading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 1 }} className="text-gray-500 text-center">
                            <Loader2 className="animate-spin inline-block w-5 h-5 mr-2" /> HealthSync is thinking...
                        </motion.div>
                    )}
                </div>

                {/* Quick Reply Buttons */}
                <div className="flex space-x-2 p-3 bg-white border-t">
                    {["Tell me more", "What should I do?", "Give me advice"].map((text) => (
                        <button key={text} onClick={() => setInput(text)} className="px-3 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-300 transition">
                            {text}
                        </button>
                    ))}
                </div>
                
                <p className="bg-white text-sm text-center p-4">HealthSync is just an AIAgent & can make mistakes - Consult a doctor for critical medical advices </p>
                
                {/* Input Box */}
                <form onSubmit={sendMessage} className="flex border-t p-3 bg-white">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a health-related question..."
                        className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                    <motion.button
                        type="submit"
                        whileTap={{ scale: 0.9 }}
                        className="ml-2 p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition flex items-center"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default HealthAiAgent;
