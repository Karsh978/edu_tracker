import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import axios from 'axios';

// 1. Boilerplate snippets 
const boilerplates = {
  python: `print("Welcome to EduTrack Coding Lab!")\n# Write your code here\nprint(5 + 5)`,
  
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Welcome to EduTrack C++ Lab" << endl;\n    return 0;\n}`,
  
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Welcome to EduTrack Java Lab");\n    }\n}`
};

const CodeEditor = () => {
  // Default values
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(boilerplates.python);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Language badalte hi code ko reset 
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(boilerplates[newLang]); 
    setOutput(""); // clear old output
  };

  const runCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://edutrack-api-8t5g.onrender.com/api/compile', { 
        code, 
        language 
      });
      setOutput(response.data.output);
    } catch (err) {
      setOutput("Error: Server could not respond. " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', background: '#1e1e1e', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
      <div style={{ marginBottom: '15px', display:'flex', gap:'10px' }}>
        <select 
          onChange={(e) => handleLanguageChange(e.target.value)} 
          value={language} 
          style={{padding:'8px', borderRadius:'5px', background:'#333', color:'#fff', border:'1px solid #555'}}
        >
          <option value="python">Python 3</option>
          <option value="cpp">C++ (GCC)</option>
          <option value="java">Java (JDK)</option>
        </select>
        
        <button onClick={runCode} disabled={loading} style={{ background: '#10B981', color: '#fff', border:'none', padding: '8px 20px', borderRadius:'5px', cursor: 'pointer', fontWeight:'bold' }}>
          {loading ? "⌛ Compiling..." : "▶ Run Code"}
        </button>
      </div>

      <Editor
        height="400px"
        language={language === 'cpp' ? 'cpp' : language}
        theme="vs-dark"
        value={code} // State se code lega
        onChange={(value) => setCode(value)} // Typings ko state mein save karega
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />

      <div style={{ marginTop: '20px', padding: '15px', background: '#000', borderRadius: '8px', minHeight: '120px', border: '1px solid #333' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#10B981', fontFamily: 'monospace' }}>Terminal Output:</h4>
        <pre style={{ margin: 0, color: '#ddd', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
            {output || "Output will appear here..."}
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;