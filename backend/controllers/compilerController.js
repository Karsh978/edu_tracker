const axios = require('axios');
const dns = require('dns');

// 1. Force Node.js to use IPv4 only (Render Fix)
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}

exports.compileCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    console.log("==> Starting Compilation for:", language);

    const langConfig = {
      python: { language: "python", version: "3.10.0" },
      cpp: { language: "cpp", version: "10.2.0" },
      java: { language: "java", version: "15.0.2" }
    };

    const config = langConfig[language] || langConfig.python;

    // 2. Using Piston API with IP-Family 4 support
    const response = await axios({
      method: 'post',
      url: 'https://emkc.org/api/v2/piston/execute',
      data: {
        language: config.language,
        version: config.version,
        files: [{ content: code }]
      },
      // 3. Sabse Important: Render ke DNS ko bypass karne ke liye
      family: 4, 
      timeout: 15000 
    });

    if (response.data && response.data.run) {
      console.log("==> Success!");
      res.json({ output: response.data.run.output });
    } else {
      res.json({ output: "Executed with no output." });
    }

  } catch (error) {
    console.error("COMPILER CRASH:", error.message);
    res.status(500).json({ 
        output: "Compiler connection timed out. This is a common issue with Render Free tier. Please click Run again in 10 seconds." 
    });
  }
};