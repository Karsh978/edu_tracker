import React, { useState } from 'react';
import axios from 'axios';

const EduBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ role: 'bot', text: 'Hi! I am EduBot. How can I help you today?' }]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post('https://edutrack-api-8t5g.onrender.com/api/ai/chat', { prompt: input });
      setMessages(prev => [...prev, { role: 'bot', text: res.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Oops! My brain is foggy.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {/* CHAT WINDOW */}
      {isOpen && (
        <div style={{ width: '300px', height: '400px', background: '#fff', boxShadow: '0 5px 20px rgba(0,0,0,0.2)', borderRadius: '15px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ background: '#1a73e8', color: '#fff', padding: '15px', fontWeight: 'bold' }}>EduBot AI</div>
          
          <div style={{ flex: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ 
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                background: m.role === 'user' ? '#1a73e8' : '#f1f3f4',
                color: m.role === 'user' ? '#fff' : '#333',
                padding: '8px 12px', borderRadius: '12px', maxWidth: '80%', fontSize: '14px'
              }}>
                {m.text}
              </div>
            ))}
            {loading && <div style={{ fontSize: '12px', color: '#888' }}>Thinking...</div>}
          </div>

          <div style={{ display: 'flex', borderTop: '1px solid #ddd' }}>
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..." 
              style={{ flex: 1, border: 'none', padding: '15px', outline: 'none' }} 
            />
            <button onClick={handleSend} style={{ border: 'none', background: '#1a73e8', color: '#fff', padding: '0 15px', cursor: 'pointer' }}>➔</button>
          </div>
        </div>
      )}

      {/* FLOAT BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#1a73e8', color: '#fff', border: 'none', fontSize: '30px', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}
      >
        {isOpen ? '×' : '🤖'}
      </button>
    </div>
  );
};

export default EduBot;