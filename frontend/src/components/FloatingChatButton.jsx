// src/components/FloatingChatButton.jsx
import React, { useState } from "react";
import { BsRobot } from "react-icons/bs";
import Chat from "./Chat";

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-xl z-50 transition-transform duration-300"
        aria-label="Open AI Chat"
      >
        <BsRobot className="text-2xl" />
      </button>

      {/* Responsive Chat Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 w-[95vw] sm:w-[90vw] md:w-[500px] h-[80vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl z-40 overflow-hidden border border-blue-200 dark:border-zinc-700 backdrop-blur-md">
          {/* Added padding top inside to avoid header overlap */}
          <div className="h-full overflow-auto p-4 pt-16">
            <Chat onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatButton;
