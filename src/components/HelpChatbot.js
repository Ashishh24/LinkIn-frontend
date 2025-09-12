import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const HelpChatbot = ({ token }) => {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I’m LinkInn Assistant 🤖. How can I help you today?",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Choices that match backend keywords
  const choices = ["Hello", "Profile", "Post", "Connect", "Request", "Logout"];

  const handleChoice = async (choice) => {
    setMessages((prev) => [...prev, { from: "user", text: choice }]);

    try {
      const res = await axios.post(
        "http://localhost:5001/api/chat",
        { message: choice },
        {
          withCredentials: true,
        }
      );

      const reply = res.data.reply;
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (err) {
      console.error("Error calling chatbot API:", err);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "⚠️ Sorry, I could not connect to the bot. Try again later.",
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 shadow-lg z-50">
      {/* Help button */}
      <button
        className="bg-blue-500 cursor-pointer text-white p-2 rounded w-full"
        onClick={() => {
          setOpen(!open);
          if (open) setMinimized(false);
        }}>
        {open ? "Close Help" : "Help 💬"}
      </button>

      {/* Chat window */}
      {open && !minimized && (
        <div className="p-2 bg-white border rounded mt-2 flex flex-col">
          {/* Minimize button */}
          <button
            className="text-sm text-gray-500 mb-1 self-end"
            onClick={() => setMinimized(true)}>
            Minimize _
          </button>

          {/* Messages */}
          <div className="h-64 overflow-y-auto border-b mb-2 flex flex-col">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.from === "bot" ? "text-left" : "text-right"}>
                <p
                  className={`m-1 p-2 rounded ${
                    msg.from === "bot" ? "bg-gray-200" : "bg-blue-200"
                  }`}>
                  {msg.text}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Choices */}
          <div className="flex flex-col space-y-1">
            {choices.map((choice, i) => (
              <button
                key={i}
                className="bg-gray-100 p-1 rounded cursor-pointer hover:bg-gray-200 text-left"
                onClick={() => handleChoice(choice)}>
                {choice}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Minimized chat bar */}
      {open && minimized && (
        <div
          className="p-2 bg-white border rounded mt-2 cursor-pointer text-gray-500 text-sm text-center"
          onClick={() => setMinimized(false)}>
          Chat minimized (click to restore)
        </div>
      )}
    </div>
  );
};

export default HelpChatbot;
