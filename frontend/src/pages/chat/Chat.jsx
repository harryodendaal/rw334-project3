import axiosInstance from '../../api/axios';
import React, { useState, useEffect } from 'react'

let ws;

export const Chat = () => {
  const [message, setMessage] = useState('');
  const [roomName, setRoomName] = useState('');
  const [chatBox, setChatBox] = useState('');
  const [chatStarted, setChatStarted] = useState(false);

  const handleChange = (e) => setRoomName(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleChatBoxChange = (e) => setChatBox(e.target.value);

  useEffect(() => {
    
    // setMessages();
  }, []);

  const updateRoom = () => {
    const token = localStorage.getItem('access_token');

    ws = new WebSocket('ws://127.0.0.1:8000/ws/api/chat/' + roomName + '/?token=' + token);
    axiosInstance.get('chats/?name=chat_' + roomName)
    .then((res) => {
      // Add loader here...
      let chatBox_ = ''; 
      
      res.data[0].messages.forEach(element => {
        const sender = element.user;
        chatBox_ = chatBox_ + sender + ': ' + element.content + '\n';
      });
      setChatBox(chatBox_);
    })
    .catch((e) => {
      console.log(e);
      alert(e);
    });
    setChatStarted(true);
    
    ws.onopen = () => {
      console.log('connected');
    }

    ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        updateChatbox(data.message, data.sender);
    };

    ws.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };
  }

  const sendMessage = () => {
    ws.send(JSON.stringify({
        'message': message
    }));
  }

  const updateChatbox = (msg, sender) => {
    if (sender === '') {
      sender = localStorage.getItem('username');
    }
    
    setChatBox(chatBox => chatBox + sender + ': ' + msg + '\n');
    setMessage('');
    
  }

  if (chatStarted) {
    return (
      <>
        <div>
          <h4>Room: {roomName}</h4>
          <textarea id="chat-log" cols="100" rows="20" value={chatBox} onChange={handleChatBoxChange}></textarea>
          <input id="chat-message-input" type="text" size="100" placeholder="Enter Message" value={message} onChange={handleMessageChange} />
          <input id="chat-message-submit" type="button" value="Send"  onClick={sendMessage}/>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div>
          <input type="text" name='room-name' id='input-room-name' placeholder='Enter Room Name' value={roomName} onChange={handleChange}/>
          <input id="chat-message-submit" type="button" value="Enter" onClick={() => updateRoom()}/>
        </div>
      </>
    )
  }
};