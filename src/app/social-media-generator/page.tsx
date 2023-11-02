"use client";
import { useState,
  // useEffect
} from "react";
import Link from "next/link";
import {
  Button,
  Container,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { companyInfo, companyReviews } from "../utils/data";
// import Posts from "../components/Posts";

export default function Page() {
  const [date, setDate] = useState("");
  const [info, setInfo] = useState("");
  const [posts, setPosts] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Set the generated text and watch for changes
  const [generatedText, setGeneratedText] = useState("");

  // useEffect(() => {}, [posts])

  const handleDateInput = (event) => {
    setDate(event.target.value);
  };

  const handleInfoInput = (event) => {
    setInfo(event.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      fetchGeneratedText();
    }
  };

  // Send the prompt to the API and set the generated text
  const fetchGeneratedText = async () => {
    console.log("date ===> ", date);
    console.log("info ===> ", info);
    setIsLoading(true);
    console.log(userInput);
    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, companyInfo, companyReviews }),
      });

      const data = await response.json();
      console.log("data", data);
      console.log("data.message", data.message);
      console.log("data.message.posts ===> ", data.message.posts);
      setPosts(data.message.posts)
      console.log("posts ====> ", posts);

      setGeneratedText(data.message);
      setUserInput("");
      setIsLoading(false);
    } catch (error) {
      setGeneratedText(error.message);
    }
  };

  const postsToDisplay = posts.map((post) => {
    return (
      <div>
        <p>{post.date}</p>
        <p>{post.title}</p>
        <p>{post.description}</p>
      </div>
    )
  })

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
        placeholder="Put the date"
        value={date}
        type="date"
        onChange={handleDateInput}
        onKeyDown={handleKeyDown}
      />

      <TextField
        fullWidth
        placeholder="Put your company info"
        value={info}
        onChange={handleInfoInput}
        onKeyDown={handleKeyDown}
      />

      <Button onClick={() => fetchGeneratedText()}>Submit</Button>

      <Paper
        variant="outlined"
        sx={{
          mt: 2,
          p: 1,
          borderRadius: "10px 10px 5px 10px",
        }}
      >
        {isLoading && <LinearProgress />}
        {/* {postsToDisplay} */}
        {posts.length === 0 ? <></> : postsToDisplay}

        <Typography variant="h6">Generated Text:</Typography>
        {/* <ReactMarkdown>{generatedText}</ReactMarkdown> */}
      </Paper>
    </Container>
  );
}
