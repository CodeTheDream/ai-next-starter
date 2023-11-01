import { Box, Typography, Avatar, Paper } from "@mui/material";
import ReactMarkdown from "react-markdown";

const Dialog = ({ message }) => {
  const isUser = message.role === "user";
  const bgColor = isUser ? "#12284C" : "#E7F6F4";
  const textColor = isUser ? "#fff" : "#333";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isUser ? "row" : "row-reverse",
        alignItems: "flex-start",
      }}
    >
      <Avatar
        src={!isUser ? "" : ""}
        sx={{ bgcolor: isUser ? "#b34025" : "#ffad95" }}
      >
        {isUser ? "U" : "AI"}
      </Avatar>
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          mr: isUser ? 0 : 1,
          ml: isUser ? 1 : 0,
          mb: 2,
          backgroundColor: bgColor,
          color: textColor,
          borderRadius: isUser ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
        }}
      >
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </Paper>
    </Box>
  );
};

export default Dialog;
