"use client";
import { useState } from "react";
import {
  Button,
  Container,
  IconButton,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function SingleCompletion() {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Set the generated text and watch for changes
  const [generatedText, setGeneratedText] = useState("");

  const handleInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      fetchGeneratedText();
    }
  };
  // Send the prompt to the API and set the generated text
  const fetchGeneratedText = async () => {
    setIsLoading(true);
    console.log(userInput);
    try {
      const messages = [{ role: "user", content: userInput }];

      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messages),
      });

      const data = await response.json();
      console.log("data", data.message);

      setGeneratedText(data.message);
      setUserInput("");
      setIsLoading(false);
    } catch (error) {
      setGeneratedText(error.message);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        width: "100vw",
        height: "100vh",
        pt: 2,
        position: "relative",
      }}
    >
      <Link href="/">
        <Button
          variant="outlined"
          sx={{ position: "absolute", top: "10px", left: "10px" }}
        >
          Back
        </Button>
      </Link>

      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", marginTop: "8px", fontWeight: "bold" }}
      >
        Single Completion Example
      </Typography>

      <TextField
        fullWidth
        placeholder="Type a message"
        value={userInput}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <IconButton
              type="button"
              onClick={() => fetchGeneratedText()}
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#ff5c35",
              }}
            >
              <SendIcon />
            </IconButton>
          ),
        }}
      />

      <Paper
        variant="outlined"
        sx={{
          mt: 2,
          p: 1,
          borderRadius: "10px 10px 5px 10px",
        }}
      >
        {isLoading && <LinearProgress />}
        <Typography variant="h6">Generated Text:</Typography>
        <ReactMarkdown>{generatedText}</ReactMarkdown>
      </Paper>
    </Container>
  );
}
