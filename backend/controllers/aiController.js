const { GoogleGenerativeAI } = require("@google/generative-ai");
const dns = require('dns');

// Force IPv4 for Render (Vahi purana fix jo Nodemailer mein kiya tha)
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.askAI = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    // NEW MODEL NAME: Use 'gemini-1.5-flash' (Most stable)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chatContext = `You are EduBot, an expert assistant for EduTrack University. 
    User Question: ${prompt}. 
    Please answer in a friendly, helpful, and very short manner (max 2 sentences).`;

    const result = await model.generateContent(chatContext);
    const text = result.response.text();

    console.log("AI Replied successfully!");
    res.json({ reply: text });

  } catch (error) {
    // Ye log humein Render dashboard par batayega asli problem kya hai
    console.error("AI ASST ERROR:", error.message);
    res.status(500).json({ reply: "I'm having trouble connecting to my brain cells. Error: " + error.message });
  }
};