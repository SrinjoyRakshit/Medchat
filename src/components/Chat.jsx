import { useState } from "react";
import { motion } from "framer-motion";
import userIcon from "../assets/user.png"; // Add appropriate path
import botIcon from "../assets/bot.png"; // Add appropriate path
 // Add appropriate path

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-gray-900 p-4">
      <div className="w-full max-w-full bg-black/60 backdrop-blur-lg p-6 rounded-xl shadow-2xl border border-gray-700 flex">
        <div className="w-full md:w-full flex flex-col">
          <h1 className="text-white text-center text-2xl font-bold mb-4">Medchat</h1>
          <div className="h-96 overflow-y-auto space-y-2 p-4 bg-gray-800/50 rounded-lg">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && <img src={botIcon} alt="Bot" className="w-8 h-8 mr-2 rounded-full" />}
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && <img src={userIcon} alt="User" className="w-8 h-8 ml-2 rounded-full" />}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 border border-gray-600"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium shadow-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}