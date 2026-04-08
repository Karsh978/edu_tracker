const axios = require('axios');

exports.askAI = async (req, res) => {
  try {
    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    console.log("Asking Gemini AI directly via API...");

    // Hum SDK use nahi kar rahe, seedha URL use karenge taaki 404 na aaye
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await axios.post(url, {
      contents: [{
        parts: [{ text: `System: You are EduBot assistant. Question: ${prompt}. Answer in 1-2 lines.` }]
      }]
    });

    // Google API se response nikaalne ka tarika
    const aiReply = response.data.candidates[0].content.parts[0].text;
    
    console.log("✅ AI Answered!");
    res.json({ reply: aiReply });

  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    res.status(500).json({ 
        reply: "I'm having a small glitch. Please ask me again in a moment!" 
    });
  }
};