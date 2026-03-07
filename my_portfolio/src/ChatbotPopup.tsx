import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";
import icons from "./icons.tsx";

interface ChatbotPopupProps {
  onClose: () => void;
}

const ChatbotPopup: React.FC<ChatbotPopupProps> = ({ onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    { sender: "bot" | "user"; text: string }[]
  >([
    {
      sender: "bot",
      text: "Hello! What can I tell you about Akshat Bist today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    setMessages((msgs) => [...msgs, { sender: "user", text: message }]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/answer_question`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: message }),
        }
      );

      const data = await response.json();
      setMessages((msgs) => [...msgs, { sender: "bot", text: data.answer }]);
    } catch (error) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage(inputValue);
  };

  return (
    <motion.div
      className="chatbot-popup-overlay"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      <div className="chatbot-popup-container" ref={containerRef}>
        <div className="chatbot-popup-header">
          <span className="chatbot-popup-title">Ask me anything</span>
          <button className="chatbot-close-button" onClick={onClose} aria-label="Close chat">
            ✕
          </button>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender}-message`}>
              {msg.sender === "bot" && (
                <img
                  className="avatar-image"
                  src={icons.chatboticon}
                  alt="Bot"
                />
              )}
              <div className="message-text">{msg.text}</div>
            </div>
          ))}

          {loading && (
            <div className="chat-message bot-message">
              <img className="avatar-image" src={icons.chatboticon} alt="Bot" />
              <div className="message-text typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messageEndRef} />
        </div>

        <div className="chatbot-input-wrapper">
          <input
            className="chatbot-input"
            type="text"
            placeholder="Type something..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className="chatbot-send-button"
            onClick={() => sendMessage(inputValue)}
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatbotPopup;
