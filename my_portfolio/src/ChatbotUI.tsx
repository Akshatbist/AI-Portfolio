import React, { useState } from "react";
import "./App.css";
import icons from "./icons.tsx";
import ChatbotPopup from "./ChatbotPopup.tsx";

const ChatbotUI = () => {
  const [modalOn, setModal] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setModal(false);
      setClosing(false);
    }, 300); 
  };

  return (
    <div className="chatbot-container">
      {!modalOn && (
        <button className="chatbot-button" onClick={() => setModal(true)}>
          <img src={icons.chatboticon} alt="Chatbot Icon" />
        </button>
      )}
      {modalOn && <ChatbotPopup onClose={handleClose} closing={closing} />}
    </div>
  );
};

export default ChatbotUI;
