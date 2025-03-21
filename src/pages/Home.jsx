import React from "react";
import Chat from "../components/Chat";
import chat from "../assets/chat-illustration.avif";

const Home = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="w-full max-w-6xl flex flex-row items-center gap-10">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold mb-6">Welcome to Medchat</h1>
          <p className="text-lg max-w-2xl mb-6">
            Experience AI-powered conversations with a sleek and modern chat interface.
          </p>
          <img src={chat} alt="Chat Preview" className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="w-1/2">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;