const axios = require('axios');
const dns = require('dns');

// 🔥 RENDER CONNECTIVITY FIX: Render ko force karein IPv4 use karne ke liye
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}

exports.compileCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    const langConfig = {
      python: { language: "python", version: "3.10.0" },
      cpp: { language: "c++", version: "10.2.0" },
      java: { language: "java", version: "15.0.2" }
    };

    const config = langConfig[language] || langConfig.python;

    // --- Using a VERY Stable PythonDiscord Piston Mirror ---
    // Ye mirror kabhi whitelist nahi maangta aur stable hai
    const response = await axios.post("https://piston.pydis.com/api/v2/piston/execute", {
      language: config.language,
      version: config.version,
      files: [{ content: code }]
    }, { timeout: 15000 }); // 15 sec timeout taaki server busy na lage

    if (response.data && response.data.run) {
        res.json({ output: response.data.run.output });
    } else {
        res.json({ output: "Compilation Finished with no results." });
    }

  } catch (error) {
    console.error("COMPILER LOG ERROR:", error.message);
    res.status(500).json({ 
        output: "Backend Connection Delay. Please try again in 5 seconds." 
    });
  }
};