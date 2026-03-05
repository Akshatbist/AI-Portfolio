import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import icons from "./icons.tsx";
import ChatbotPopup from "./ChatbotPopup.tsx";

const ChatbotUI = () => {
  const [modalOn, setModal] = useState(false);

  const handleClose = () => {
    setModal(false);
  };

  return (
    <div className="chatbot-container">
      {!modalOn && (
        <button className="chatbot-button" onClick={() => setModal(true)}>
          <img src={icons.chatboticon} alt="Chatbot Icon" />
        </button>
      )}
      <AnimatePresence>
        {modalOn && <ChatbotPopup onClose={handleClose} />}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotUI;
