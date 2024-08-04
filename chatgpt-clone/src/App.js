import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './App.css';

// Get your API token in this site : https://aistudio.google.com/app/apikey
const genAI = new GoogleGenerativeAI('YOUR-API-TOKEN');

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState([]);

  const handleSend = async () => {
    if(input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = await response.text();

      const botMessage = { sender: 'bot', text};
      setMessages([...messages, userMessage, botMessage]);
    } catch( error){
      console.error('Error en la api:', error);
    }

    setInput('');
  };

  return (
    <div className="App">
      <div className='chat-box'>
        {messages.map((msg,index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className='input-box'>
        <input
          type="text"
          value={input}
          onChange={(e)=> setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
