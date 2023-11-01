"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "next/link";
import Dialog from "../../components/Dialog";
import fetchEvaluation from "@/app/fetchCalls/fetchCompletion";

export default function SystemContinuousCompletion() {
  const initialConversation = [{ role: "system", content: "Act as Yoda" }];
  const [chatHistory, setChatHistory] = useState(initialConversation);

  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const messages = [
      ...chatHistory,
      { role: "user", content: `${userInput}` },
    ];

    try {
      await fetchEvaluation(messages).then((data) => {
        setChatHistory([
          ...messages,
          { role: "assistant", content: `${data.message}` },
        ]);

        setUserInput("");
        setLoading(false);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRefresh = () => {
    setUserInput("");
    setChatHistory([]);
  };

  const handleRegenerateResponse = async () => {
    setLoading(true);

    const tempChatHistory = [...chatHistory];
    tempChatHistory.pop();

    try {
      await fetchEvaluation(tempChatHistory).then((data) => {
        setChatHistory([
          ...tempChatHistory,
          { role: "assistant", content: `${data.message}` },
        ]);

        setUserInput("");
        setLoading(false);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  //removes system messages from the conversation UI
  const filteredConversation = chatHistory.filter(
    (message) => message.role !== "system",
  );

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
        System Completion Example
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Button
          size="large"
          variant="outlined"
          onClick={handleRegenerateResponse}
          sx={{
            color: "grey.500",
            mr: 2,
            mt: 2,
            borderColor: "grey.400",
            ":hover": {
              borderColor: "#ff5c35",
            },
          }}
          startIcon={<RestartAltIcon />}
        >
          Regenerate
        </Button>

        <Button
          size="large"
          variant="outlined"
          onClick={handleRefresh}
          sx={{
            mt: 2,

            borderColor: "#ff5c35",
            color: "#ff5c35",
            ":hover": {
              bgcolor: "#ff5c35",
              borderColor: "#ff5c35",
              color: "white",
            },
          }}
        >
          New Chat
        </Button>
      </Box>

      <Box
        sx={{
          height: "70vh",
          overflowY: "scroll",
          p: 1,
          paddingBottom: "60px",
        }}
      >
        {filteredConversation.map((message, index) => (
          <Dialog key={index} message={message} />
        ))}
      </Box>

      <Box sx={{ width: "90%", margin: "0 auto" }}>
        {loading && <LinearProgress />}
      </Box>

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                placeholder="Type a message"
                value={userInput}
                onChange={handleUserInput}
                onKeyDown={handleKeyDown}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      type="submit"
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
