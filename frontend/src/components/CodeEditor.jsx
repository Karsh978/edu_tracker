import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import axios from 'axios'; 
import API from '../api';

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your C++ or Python code here");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);


const runCode = async () => {
    setLoading(true);
    try {
      // Dhyan de: Yahan hum seedha 'axios' use kar rahe hain na ki hamara wrapper
      const res = await axios.post('https://edutrack-api-8t5g.onrender.com/api/compile', { 
        code: code,
        language: language 
      });

      setOutput(res.data.output);
    } catch (err) {
      console.error("401 Check:", err.response); // Debug karne ke liye
      setOutput("Error: Request rejected. " + (err.response?.status === 401 ? "Please remove Auth check for compile route." : ""));
    }
    setLoading(false);
};

  return (
    <div style={{ padding: '20px', background: '#1e1e1e', borderRadius: '10px', color: '#fff' }}>
      <div style={{ marginBottom: '10px' }}>
        <select onChange={(e) => setLanguage(e.target.value)} value={language} style={{padding:'5px'}}>
          <option value="python">Python 3</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
        <button onClick={runCode} style={{ marginLeft: '10px', background: 'green', color: '#fff', border:'none', padding: '5px 15px', cursor: 'pointer' }}>
          {loading ? "Running..." : "▶ Run Code"}
        </button>
      </div>

      <Editor
        height="400px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
      />

      <div style={{ marginTop: '20px', padding: '10px', background: '#000', borderRadius: '5px', minHeight: '100px' }}>
        <h4 style={{ margin: 0, color: 'lime' }}>Output:</h4>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;