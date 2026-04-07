const axios = require('axios');

exports.compileCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    const langConfig = {
      python: { name: "python", version: "3.10.0" },
      cpp: { name: "c++", version: "10.2.0" },
      java: { name: "java", version: "15.0.2" }
    };

    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: langConfig[language].name,
      version: langConfig[language].version,
      files: [{ content: code }]
    });

    res.json({ output: response.data.run.stdout || response.data.run.stderr || "Code executed with no output." });
  } catch (error) {
    console.error("Compiler Error:", error.message);
    res.status(500).json({ output: "Server Error: Could not connect to Compiler" });
  }
};