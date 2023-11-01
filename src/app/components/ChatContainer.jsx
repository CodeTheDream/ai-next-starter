import React, { useEffect, useRef } from "react";
import Response from "./Response";
import Box from "@mui/material/Box";

export default function ChatContainer({ chatHist }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when the component mounts or updates
    scrollToBottom();
  });

  const scrollToBottom = () => {
    // Scroll to the bottom of the container
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        overflowY: "auto",
        height: "100%",
        width: "100%",
        overflow: "auto",
        border: "2px solid #ffffff",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      {chatHist.map((message, idx) => (
        <Response key={idx} message={message.content} role={message.role} />
      ))}
    </Box>
  );
}
