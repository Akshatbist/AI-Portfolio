import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

export const Reveal = ({ children, width = "100%", delay = 0.05 }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20px 0px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ 
          type: "spring", 
          stiffness: 80, 
          damping: 20, 
          mass: 0.5,
          delay: delay 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
