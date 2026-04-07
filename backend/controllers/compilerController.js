const axios = require('axios');
const dns = require('dns');

// IPv4 priority fix for Render DNS issues
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}

exports.compileCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    console.log("==> Code Lab: Processing", language); // Agar log mein 'Codex' dikha toh code galat hai

    const langData = {
      python: { l: "python", v: "3.10.0" },
      cpp: { l: "cpp", v: "10.2.0" },
      java: { l: "java", v: "15.0.2" }
    };

    const config = langData[language] || langData.python;

    // Is stable Piston Mirror ka use karein
    const response = await axios.post("https://piston.pydis.com/api/v2/piston/execute", {
      language: config.l,
      version: config.v,
      files: [{ content: code }]
    }, { timeout: 15000 });

    res.json({ output: response.data.run.output });

  } catch (error) {
    console.error("LOG ERROR:", error.message);
    res.status(500).json({ output: "Compiler connection issue. Please try again." });
  }
};