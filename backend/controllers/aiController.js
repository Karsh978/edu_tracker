const axios = require('axios');

exports.askAI = async (req, res) => {
  try {
    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    console.log("==> Sending request to Google Gemini (v1)...");

    // FIX: Using stable 'v1' instead of 'v1beta'
    // Model changed to 'gemini-pro' for maximum compatibility
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [{ 
          text: `You are EduBot, an AI for EduTrack portal. User question: ${prompt}. Answer briefly.` 
        }]
      }]
    };

    const response = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    // Check if response has valid data
    if (response.data.candidates && response.data.candidates.length > 0) {
        const aiReply = response.data.candidates[0].content.parts[0].text;
        console.log("✅ Robot Responded Successfully!");
        res.json({ reply: aiReply });
    } else {
        res.json({ reply: "My circuits are clear, but I have no answer." });
    }

  } catch (error) {
    // Ye line Render log mein asli wajah batayegi
    console.error("AI Error Status:", error.response?.status);
    console.error("AI Error Body:", JSON.stringify(error.response?.data));

    res.status(500).json({ 
        reply: "Error: " + (error.response?.data?.error?.message || "Internal Glitch") 
    });
  }
};