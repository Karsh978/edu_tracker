const axios = require('axios'); // Check: Pehle install hona chahiye

exports.compileCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    // Default configuration if language is missing
    const langMap = {
      python: { language: "python", version: "3.10.0" },
      cpp: { language: "c++", version: "10.2.0" },
      java: { language: "java", version: "15.0.2" }
    };

    const selectedConfig = langMap[language] || langMap.python;

    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: selectedConfig.language,
      version: selectedConfig.version,
      files: [{ content: code }]
    });

    if (response.data && response.data.run) {
        res.json({ output: response.data.run.output });
    } else {
        res.json({ output: "No output received from execution engine." });
    }

  } catch (error) {
    console.error("COMPILER CRASH ERROR:", error.message);
    res.status(500).json({ output: "Compiler Server is temporary busy. Try again." });
  }
};