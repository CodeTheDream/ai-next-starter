"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Button,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { companyInfo, companyReviews } from "../utils/data";

export default function Page() {
  const [dateInput, setDateInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateInput = (event) => {
    setDateInput(event.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      generatePosts();
    }
  };

  // Send the prompt to the API and set the generated text
  const generatePosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: dateInput, companyInfo, companyReviews }),
      });
      const data = await response.json();
      setPosts(data.message.posts);
      setIsLoading(false);
    } catch (error) {
      throw new Error();
    }
  };

  const postsToDisplay = posts.map((post, index) => {
    return (
      <Box
        my={2}
        p={2}
        border={"1px solid gray"}
        borderRadius={"6px"}
        key={index}
      >
        <Typography
          variant="h6"
          component="h2"
          color="textSecondary"
          gutterBottom
        >
          {post.date}
        </Typography>
        <Typography variant="h4" component="h1" color="primary" gutterBottom>
          {post.title}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          color="textSecondary"
          gutterBottom
        >
          {post.description}
        </Typography>
      </Box>
    );
  });

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
        Social Media Generator
      </Typography>

      <TextField
        fullWidth
        placeholder="Enter the date"
        value={dateInput}
        type="date"
        onChange={handleDateInput}
        onKeyDown={handleKeyDown}
      />

      <Button
        sx={{
          background: "#1876d2",
          border: 0,
          borderRadius: "6px",
          color: "white",
          height: 48,
          padding: "0 30px",
          marginTop: "8px",
        }}
        onClick={() => generatePosts()}
      >
        Submit
      </Button>

      {isLoading && (
        <Paper
          variant="outlined"
          sx={{
            mt: 2,
            p: 1,
            borderRadius: "10px 10px 5px 10px",
          }}
        >
          <LinearProgress />
        </Paper>
      )}
      {posts.length === 0 ? <></> : postsToDisplay}
    </Container>
  );
}
