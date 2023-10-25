import { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown';
import { Box, TextField, Button, Grid, Container, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
// import Dialog from '../../components/Dialog';
import LinearProgress from '@mui/material/LinearProgress';


export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Set the generated text and watch for changes
  const [generatedText, setGeneratedText] = useState('');

  const handleInput = (event) => {
    setPrompt(event.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      fetchGeneratedText();
    }
  };
  // Send the prompt to the API and set the generated text
  const fetchGeneratedText = async () => {
    setIsLoading(true);
    console.log(prompt);
    try {
      // fetch the generated text from the Next.js API server
      const response = await fetch('/api/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      console.log('response', response)
      // if the response is not ok, throw an error
      if (!response.ok) {
        setGeneratedText(`Error fetching generated text: ${response.statusText}`);
      }
      // get the data from the response
      const data = await response.json();
      console.log('data', data)
      // if the data is not null, set the generated text
      if(data !== null){
        setGeneratedText(data.item.trim());
        setPrompt('');
        setIsLoading(false)
      }
      // if there is an error, set the generated text to the error message
    } catch (error) {
      setGeneratedText('Error fetching generated text:', error.message);
    }
    
  };



  return (
    <>
      <Head>
        <title>CTD AI Starter</title>
        <meta name="description" content="A Next.js OpenAI starter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Next.js OpenAI Starter</h1>
        <p>This is a starter kit for integrating <a target="_blank" href="https://platform.openai.com/docs/api-reference">OpenAI's API</a> into a <a target="_blank" href="https://nextjs.org">Next.js</a> project. It is crafted with minimal styling and basic API integration so you can strip it and bring your own libraries to make it your own. Feel free to fork and create something amazing!</p>
        <Link href="/chat">
        <h2>Go to Chat</h2>
        </Link>
        <div>
        <h2>Completion Example</h2>

<Box sx={{ p: 2 }}>
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        placeholder="Type a message"
        value={prompt}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <IconButton type="button" onClick={() => fetchGeneratedText()} sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: '#ff5c35' }}>
              <SendIcon />
            </IconButton>
          ),
        }}
      />
    </Grid>
  </Grid>
</Box>
  <Paper
    variant="outlined"
    sx={{
      p: 1,
      mr: 1,
      ml:  0,
      mb: 2,
      // backgroundColor: "#333",
      // color: textColor,
      borderRadius: '20px 20px 5px 20px',
    }}
    >
  {isLoading && <LinearProgress />}
  <h3>Generated Text:</h3>
  <ReactMarkdown>{generatedText}</ReactMarkdown>
  </Paper>
    </div>
    </main>
    </>
  )
}
