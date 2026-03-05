import React, { useState, useEffect } from "react";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className = "", delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;
    
    timeout = setTimeout(() => {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((_, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3; 
      }, 30);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return (
    <span className={className}>
      {displayText || text.replace(/./g, " ")} 
    </span>
  );
};
