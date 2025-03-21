import { useState } from "react";
import { motion } from "framer-motion";
import userIcon from "../assets/user.png";
import botIcon from "../assets/bot.png";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "mistral",
          messages: [{ role: "user", content: input }],
          stream: false,
        }),
      });

      const data = await response.json();
      setMessages([...newMessages, { text: data.message.content, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-black p-6">
      <div className="w-full max-w-4xl bg-black/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-700 flex flex-col">
        <h1 className="text-white text-center text-3xl font-bold mb-4">MedChat AI</h1>
        <div className="h-96 overflow-y-auto space-y-3 p-4 bg-gray-800/70 rounded-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "bot" && <img src={botIcon} alt="Bot" className="w-9 h-9 mr-3 rounded-full" />}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 text-lg rounded-xl max-w-[75%] ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
              >
                {msg.text}
              </motion.div>
              {msg.sender === "user" && <img src={userIcon} alt="User" className="w-9 h-9 ml-3 rounded-full" />}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 border border-gray-700"
          />
          <button
            onClick={sendMessage}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold shadow-md transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}