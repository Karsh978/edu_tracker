const axios = require('axios');

exports.askAI = async (req, res) => {
  try {
    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    console.log("==> Hitting Gemini 1.5 Flash API...");

    // SAHI URL: Gemini 1.5 Flash v1beta endpoint par hi sabse best chalta hai
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [{ 
          text: `You are a university assistant. Help with: ${prompt}. Keep it under 2 lines.` 
        }]
      }]
    };

    const response = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    // Google API response parse karne ka sahi tarika
    if (response.data && response.data.candidates) {
        const aiReply = response.data.candidates[0].content.parts[0].text;
        res.json({ reply: aiReply });
    } else {
        res.json({ reply: "I am thinking, but no words came out. Try again!" });
    }

  } catch (error) {
    console.error("AI ASST ERROR LOG:", JSON.stringify(error.response?.data || error.message));
    
    // Asli error message user ko dikhana debugging ke liye
    const errorDetail = error.response?.data?.error?.message || "Internal Glitch";
    res.status(500).json({ reply: "Robot says: " + errorDetail });
  }
};