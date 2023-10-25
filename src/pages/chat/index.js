import React, { useState, useEffect} from 'react';
import { Box, TextField, Button, Grid, Container, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Dialog from '../../components/Dialog';
import LinearProgress from '@mui/material/LinearProgress';
import Link from 'next/link'


const initialConversation = [{role: 'system', content: 'Act as Snoop Dogg and get your dog pound on!'}]
const Chat = () => {
    
  const [conversation, setConversation] = useState(initialConversation);
  const [value, setValue] = useState('');
//   const [conversation, setConversation] = useState(initialConversation);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInput = (event) => {
    setValue(event.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = async (isInitial) => {
    setLoading(true);
    const assistantMessage = { role: 'user', content: value };
    let chatHistory = conversation
    if (!isInitial) {
    chatHistory = [...conversation, assistantMessage];
    }
    
    const response = await fetch('/api/full-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: chatHistory }),
    });

    const data = await response.json();
    console.log('DATA', data)
    console.log('chat history', chatHistory)
    setValue('');
    const updatedConvo = [...chatHistory, { role: 'assistant', content: data.item }];
    setConversation(updatedConvo);
    setLoading(false);
  };

 

  const handleRefresh = () => {
    setValue('');
    dispatch({type: 'SET_NEW_CONVERSATION'})
    // handleSendMessage()
  };

  useEffect(() => {
        handleSendMessage(true)
  }, []);

  const handleRegenerateResponse = async () => {
    const tempArray = [...conversation]
    tempArray.pop()
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: tempArray }),
    });

    const data = await response.json(); 
    const updatedConvo = [...tempArray, { role: 'assistant', content: data.item }];
    setConversation(updatedConvo);
    // setConversation([...conversation, { role: 'assistant', content: data.item }]);
    // setResponse(data.item);
  };

  //removes system messages from the conversation UI
  const filteredConversation =  conversation.filter(message => message.role !== 'system');

  return (
    <Box sx={{ height: '85vh', display: 'flex', flexDirection: 'column', maxWidth: '1000px', margin: '0 auto'}}>
      <Link href="/">
        <h2>Back to Completion</h2>
      </Link>
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
     <Button
       size="large"
       variant="outlined"
       onClick={handleRegenerateResponse}
       sx={{
         color: 'grey.500',
         mr: 2,
         mt: 2,
         borderColor: 'grey.400',
         ':hover': {
           borderColor: '#ff5c35',
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

         borderColor: '#ff5c35',
         color: '#ff5c35',
         ':hover': {
           bgcolor: '#ff5c35',
           borderColor: '#ff5c35',
           color: 'white',
         },
       }}
     >
       New Chat
     </Button>
   </Box>
 <Box sx={{ flexGrow: 1, overflow: 'auto', p: 1 }}>
   {filteredConversation.map((message, index) => (
     <Dialog key={index} message={message} />
   ))}
 </Box>
 <Box sx={{width: '90%', margin: '0 auto'}}>
     {loading && <LinearProgress />}
   </Box>
 <Box sx={{ p: 2 }}>
   <Grid container spacing={2}>
     <Grid item xs={12}>
       <TextField
         fullWidth
         placeholder="Type a message"
         value={value}
         onChange={handleInput}
         onKeyDown={handleKeyDown}
         InputProps={{
           endAdornment: (
             <IconButton type="button" onClick={() => handleSendMessage(false)} sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: '#ff5c35' }}>
               <SendIcon />
             </IconButton>
           ),
         }}
       />
     </Grid>
   </Grid>
 </Box>
</Box>

  )
};

export default Chat;

