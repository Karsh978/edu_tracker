import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const EduBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I am EduBot 👋\nAsk me anything about your studies!' }
  ]);
  const [loading, setLoading] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const msgsRef = useRef(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, loading]);

  const timeNow = () => {
    const n = new Date();
    return `${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}`;
  };

  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    setShowChips(false);
    setMessages(prev => [...prev, { role: 'user', text, time: timeNow() }]);
    setInput('');
    setLoading(true);
    try {
      const res = await axios.post('https://edutrack-api-8t5g.onrender.com/api/ai/chat', { prompt: text });
      setMessages(prev => [...prev, { role: 'bot', text: res.data.reply, time: timeNow() }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Oops! Something went wrong. Try again?', time: timeNow() }]);
    }
    setLoading(false);
  };

  const chips = ['📚 Study tips', '🧮 Math help', '✍️ Essay writing', '🔬 Science'];

  return (
    <>
      <style>{`
        @keyframes slideUp{from{opacity:0;transform:translateY(20px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes fadeMsg{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ripple{0%{box-shadow:0 0 0 0 rgba(99,102,241,.5)}70%{box-shadow:0 0 0 12px rgba(99,102,241,0)}100%{box-shadow:0 0 0 0 rgba(99,102,241,0)}}
        @keyframes dot{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
        @keyframes gradMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.4}}
        .edu-window{animation:slideUp .3s cubic-bezier(.22,1,.36,1)}
        .edu-msg{animation:fadeMsg .22s ease}
        .edu-dot{animation:dot 1.2s infinite}
        .edu-dot:nth-child(2){animation-delay:.15s}
        .edu-dot:nth-child(3){animation-delay:.3s}
        .edu-fab{animation:ripple 2.5s infinite}
        .edu-status{animation:blink 2s infinite}
        .edu-header{background:linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4);background-size:300% 300%;animation:gradMove 6s ease infinite}
        .edu-bubble-user{background:linear-gradient(135deg,#6366f1,#8b5cf6)}
        .edu-chip:hover{background:#eef2ff;color:#6366f1;border-color:#a5b4fc}
        .edu-inp:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.12)}
        .edu-sbtn:hover{transform:scale(1.08)}
        .edu-sbtn:active{transform:scale(.93)}
        .edu-fab-btn:hover{transform:scale(1.1)}
      `}</style>

      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>

        {/* CHAT WINDOW */}
        {isOpen && (
          <div className="edu-window" style={{ width: 360, height: 500, background: '#fff', borderRadius: 24, overflow: 'hidden', border: '0.5px solid #e5e7eb', display: 'flex', flexDirection: 'column', marginBottom: 14, boxShadow: '0 8px 40px rgba(0,0,0,0.14)' }}>

            {/* Header */}
            <div className="edu-header" style={{ padding: '0 16px', height: 68, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              <div style={{ width: 42, height: 42, borderRadius: 14, background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: '0.5px solid rgba(255,255,255,.25)' }}>🤖</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: '#fff' }}>EduBot AI</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.75)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <span className="edu-status" style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  Online · Ready to help
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,.15)', border: '0.5px solid rgba(255,255,255,.3)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>–</button>
            </div>

            {/* Messages */}
            <div ref={msgsRef} style={{ flex: 1, padding: '16px 14px 8px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {messages.map((m, i) => (
                <div key={i} className="edu-msg" style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 7 }}>
                  {m.role === 'bot' && (
                    <div style={{ width: 28, height: 28, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🤖</div>
                  )}
                  <div>
                    <div className={m.role === 'user' ? 'edu-bubble-user' : ''} style={{
                      padding: '10px 14px', borderRadius: 18,
                      borderBottomRightRadius: m.role === 'user' ? 5 : 18,
                      borderBottomLeftRadius: m.role === 'bot' ? 5 : 18,
                      maxWidth: 260, fontSize: 13.5, lineHeight: 1.55, wordBreak: 'break-word',
                      background: m.role === 'user' ? undefined : '#f3f4f6',
                      color: m.role === 'user' ? '#fff' : '#111',
                      border: m.role === 'bot' ? '0.5px solid #e5e7eb' : 'none',
                      whiteSpace: 'pre-line'
                    }}>{m.text}</div>
                    {m.time && <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 3, padding: '0 4px', textAlign: m.role === 'user' ? 'right' : 'left' }}>{m.time}</div>}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🤖</div>
                  <div style={{ display: 'flex', gap: 5, padding: '10px 14px', background: '#f3f4f6', border: '0.5px solid #e5e7eb', borderRadius: 18, borderBottomLeftRadius: 5 }}>
                    {[0, 1, 2].map(n => <div key={n} className="edu-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#a5b4fc', animationDelay: `${n * 0.15}s` }} />)}
                  </div>
                </div>
              )}
            </div>

            {/* Quick chips */}
            {showChips && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '0 14px 10px' }}>
                {chips.map(c => (
                  <span key={c} className="edu-chip" onClick={() => handleSend(c.replace(/^[^\s]+\s/, ''))}
                    style={{ padding: '5px 10px', borderRadius: 20, background: '#f9fafb', border: '0.5px solid #e5e7eb', fontSize: 12, color: '#6b7280', cursor: 'pointer', transition: 'all .15s' }}>{c}</span>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ borderTop: '0.5px solid #e5e7eb', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, background: '#fff', flexShrink: 0 }}>
              <input className="edu-inp" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask EduBot anything..."
                style={{ flex: 1, border: '0.5px solid #e5e7eb', borderRadius: 22, padding: '9px 15px', fontSize: 13.5, outline: 'none', background: '#f9fafb', color: '#111', transition: 'border-color .15s,box-shadow .15s' }} />
              <button className="edu-sbtn" onClick={() => handleSend()} disabled={loading}
                style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform .15s', opacity: loading ? .5 : 1 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>

          </div>
        )}

        {/* FAB Button */}
        <button className={`edu-fab-btn ${!isOpen ? 'edu-fab' : ''}`} onClick={() => setIsOpen(!isOpen)}
          style={{ width: 58, height: 58, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', border: 'none', fontSize: isOpen ? 20 : 26, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 18px rgba(99,102,241,.45)', transition: 'transform .2s' }}>
          {isOpen ? '✕' : '🤖'}
        </button>

      </div>
    </>
  );
};

export default EduBot;