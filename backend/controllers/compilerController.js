const axios = require('axios');

exports.compileCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    // JDoodle specific language settings
    const langConfig = {
      python: { lang: "python3", version: "4" },
      cpp: { lang: "cpp17", version: "0" },
      java: { lang: "java", version: "4" }
    };

    const config = langConfig[language] || langConfig.python;

    console.log(`==> Compiling via JDoodle: ${config.lang}`);

    const response = await axios.post("https://api.jdoodle.com/v1/execute", {
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      script: code,
      language: config.lang,
      versionIndex: config.version,
    });

    res.json({ output: response.data.output });

  } catch (error) {
    console.error("JDOODLE ERROR:", error.response?.data || error.message);
    res.status(500).json({ output: "Compiler API Error. Please check JDoodle Credits." });
  }
};