import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";

export const NotFound = () => {
  const [text, setText] = useState("");
  const fullText = "404 - This route is unhandled.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">
          {text}<span className="cursor-blink">_</span>
        </h1>
        <Magnetic>
          <a href="/" className="return-home-btn">Return Home</a>
        </Magnetic>
      </div>
    </div>
  );
};
