const axios = require('axios');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first'); // Render Connectivity Fix

exports.compileCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    
    if (!code) return res.status(400).json({ output: "Please write some code first!" });

    // Version ko "*" kar do taaki Piston latest version khud chun le
    const langConfig = {
      python: "3.10.0",
      cpp: "10.2.0",
      java: "15.0.2"
    };

    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: language,
      version: langConfig[language] || "3.10.0",
      files: [{ content: code }]
    });

    // Piston ka output 'run.output' mein hota hai
    const finalOutput = response.data.run.stderr || response.data.run.stdout || response.data.run.output;
    res.json({ output: finalOutput });

  } catch (error) {
    // Agar Piston crash karega toh yahan dikhega
    console.error("PISTON API ERROR:", error.response?.data || error.message);
    res.status(500).json({ output: "External Compiler Error: " + error.message });
  }
};