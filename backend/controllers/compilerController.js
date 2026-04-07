const axios = require('axios');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first'); // Render Connectivity Fix

exports.compileCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    
    // Safety check taaki crash na ho
    if (!code) return res.status(400).json({ output: "Please write some code first!" });

    const langData = {
      python: { name: "python", version: "3.10.0" },
      cpp: { name: "cpp", version: "10.2.0" },
      java: { name: "java", version: "15.0.2" }
    };

    const config = langData[language] || langData.python;

    console.log(`Sending to Piston API: ${config.name}`);

    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: config.name,
      version: config.version,
      files: [{ content: code }]
    }, {
      timeout: 10000 // 10 sec timeout taaki server hang na ho
    });

    res.json({ output: response.data.run.output || "Code executed successfully." });

  } catch (error) {
    console.error("COMPILER LOG ERROR:", error.message);
    res.status(500).json({ 
        output: "Backend Connection Error: " + error.message,
        tip: "Please try again, the external compiler is waking up." 
    });
  }
};