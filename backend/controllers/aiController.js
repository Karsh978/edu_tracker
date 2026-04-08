const { GoogleGenerativeAI } = require("@google/generative-ai");
const dns = require('dns');

// Force IPv4 for Render network stability
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}

// Ensure your API key is correctly loaded
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    // USE 'gemini-pro' - It's the most compatible model name
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // AI logic execution
    const chatContext = `Assistant Name: EduBot. 
    Role: EduTrack University Helper. 
    Task: Answer the student's question briefly. 
    Question: ${prompt}`;

    const result = await model.generateContent(chatContext);
    const response = await result.response;
    const text = response.text();

    console.log("✅ AI Response Generated!");
    res.json({ reply: text });

  } catch (error) {
    console.error("❌ AI SYSTEM ERROR:", error.message);

    // Specific error handling for User visibility
    let errorMsg = "My circuits are a bit tangled. Please try again in 5 seconds.";
    
    if (error.message.includes("API key")) {
        errorMsg = "System Error: Invalid API Key on server.";
    }

    res.status(500).json({ reply: errorMsg });
  }
};