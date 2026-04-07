const axios = require('axios');

exports.compileCode = async (req, res) => {
    try {
        const { code, language } = req.body;
        console.log(`Executing ${language} code...`); // Render logs mein dikhega

        const langData = {
            python: { name: "python", version: "3.10.0" },
            cpp: { name: "cpp", version: "10.2.0" },
            java: { name: "java", version: "15.0.2" }
        };

        const config = langData[language] || langData.python;

        const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
            language: config.name,
            version: config.version,
            files: [{ content: code }]
        });

        console.log("Compiler result received.");
        res.status(200).json({ 
            output: response.data.run.output || "Execution finished with no output." 
        });

    } catch (error) {
        console.error("COMPILER CRASH:", error.message);
        res.status(500).json({ output: "Compiler Server is busy. Error: " + error.message });
    }
};