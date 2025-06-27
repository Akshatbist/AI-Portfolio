import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import icons from "./icons.tsx";

interface ChatbotPopupProps {
  onClose: () => void;
  closing: boolean;
}

const ChatbotPopup: React.FC<ChatbotPopupProps> = ({ onClose, closing }) => {
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
      const response = await fetch("http://127.0.0.1:8000/answer_question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message }),
      });

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
    <div
      className={`chatbot-popup-overlay ${
        closing ? "fade-out-popup" : "fade-in-popup"
      }`}
    >
      <div className="chatbot-popup-container" ref={containerRef}>
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

          {/* Typing animation while loading */}
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
    </div>
  );
};

export default ChatbotPopup;
