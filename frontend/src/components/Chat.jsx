import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import { FaUserCircle } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";

const Chat = ({ onClose }) => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const userMessage = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const token = await getToken();
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Error: " + data.error },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error: " + error.message },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-zinc-900 dark:to-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md">
        <span className="text-lg flex items-center gap-2">
          <BsRobot className="text-2xl text-yellow-300" />
          Alpha X Assistant
        </span>
        <button
          onClick={onClose}
          className="text-white hover:bg-red-500 p-1 rounded-full"
        >
          ✕
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="flex items-start gap-2">
                <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-zinc-700 flex items-center justify-center shadow-sm">
                  <BsRobot className="text-xl text-green-600 dark:text-green-400" />
                </div>
                <div className="max-w-md px-4 py-3 bg-white dark:bg-zinc-700 text-gray-800 dark:text-white rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-600">
                  {msg.content}
                </div>
              </div>
            )}
            {msg.role === "user" && (
              <div className="flex items-start gap-2">
                <div className="max-w-md px-4 py-3 bg-blue-600 text-white rounded-2xl shadow-md">
                  {msg.content}
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-zinc-700 flex items-center justify-center shadow-sm">
                  <FaUserCircle className="text-xl text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500 dark:text-gray-300">
            Alpha X is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700">
        <div className="flex items-center space-x-2">
          <textarea
            rows="1"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Alpha X something..."
            className="flex-1 resize-none rounded-xl border border-gray-300 dark:border-zinc-600 px-4 py-2 text-sm bg-gray-100 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
