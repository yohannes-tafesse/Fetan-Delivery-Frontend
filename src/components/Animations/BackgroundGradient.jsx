"use client";

import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className = "",
  containerClassName = "",
}) => {
  const backgroundVariants = {
    initial: {
      backgroundPosition: "0% 50%",
    },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    },
  };

  const glowVariants = {
    pulse: {
      boxShadow: [
        "0 0 0px rgba(244, 154, 58, 0)",
        "0 0 30px rgba(244, 154, 58, 0.8)",
        "0 0 70px rgba(244, 154, 58, 1)",
        "0 0 30px rgba(244, 154, 58, 0.8)",
        "0 0 0px rgba(244, 154, 58, 0)",
      ],
    },
  };

  const gradientStyle = {
    backgroundImage: `
      radial-gradient(circle at 0% 100%, #f49a3a, transparent),
      radial-gradient(circle at 100% 0%, #fcb045, transparent),
      radial-gradient(circle at 100% 100%, #ff9966, transparent),
      radial-gradient(circle at 0% 0%, #ff5e62, #1a1a1a)
    `,
    backgroundSize: "100% 100%",
   borderRadius: "0.5rem"
  };

  return (
    <motion.div
      className={`position-relative p-2 rounded-4 ${containerClassName}`}
      variants={glowVariants}
      animate="pulse"
      transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      {/* Gradient blur layer */}
      <motion.div
        className="position-absolute top-0 start-0 w-100 h-100 opacity-50 rounded-4 blur"
        style={gradientStyle}
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Main animated background */}
      <motion.div
        className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
        style={gradientStyle}
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Content */}
      <div className={`position-relative z-1 ${className}`}>{children}</div>
    </motion.div>
  );
};
