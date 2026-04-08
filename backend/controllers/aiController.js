const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.askAI = async (req, res) => {
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // AI ko context dena taaki wo university ke baare mein baat kare
    const chatContext = `You are EduBot, an AI assistant for EduTrack University Portal. 
    Help students with study tips, portal navigation, and general academic advice. 
    Answer briefly and professionally. User says: ${prompt}`;

    const result = await model.generateContent(chatContext);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ reply: "Sorry, I am taking a nap. Try again later!" });
  }
};