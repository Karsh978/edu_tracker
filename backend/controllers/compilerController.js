const axios = require('axios');

exports.compileCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    // Codex API supports 'py', 'cpp', 'java' shortcodes
    const langMap = {
      python: "py",
      cpp: "cpp",
      java: "java"
    };

    const targetLang = langMap[language] || "py";

    console.log(`Switching to Codex API for ${targetLang}...`);

    // We use CodeX API (One of the most stable free APIs now)
    const response = await axios.post("https://api.codex.one/", {
      code: code,
      language: targetLang,
      input: "" // User input (currently empty)
    });

    // CodeX return format handles success and error nicely
    if (response.data && response.data.output) {
        res.json({ output: response.data.output });
    } else if (response.data && response.data.error) {
        res.json({ output: "Compiler Error: " + response.data.error });
    } else {
        res.json({ output: "Executed. No output recorded." });
    }

  } catch (error) {
    console.error("COMPILER CRASH:", error.message);
    res.status(500).json({ 
        output: "Backend Connection Error: Codex server is busy. Try again later." 
    });
  }
};