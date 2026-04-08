const Groq = require("groq-sdk");


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("==> Asking Llama 3 AI on Groq...");

    // We use llama3-8b-8192 which is extremely fast and FREE
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are EduBot, a helpful assistant for EduTrack university. Give very short 1-line answers."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
     model: "llama-3.1-8b-instant" ,
    });

    const aiReply = chatCompletion.choices[0]?.message?.content || "I am thinking...";
    
    console.log("✅ AI Response received from Groq!");
    res.json({ reply: aiReply });

  } catch (error) {
    console.error("GROQ ERROR:", error.message);
    res.status(500).json({ reply: "My brain is currently resting. Please try again." });
  }
};