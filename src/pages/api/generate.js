import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const generateAIQuizzes = async (topic, count) => {
  const response = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Generate ${count} multiple-choice quiz questions about ${topic} in JSON format. Each question should have the following structure: { "text": "<question text>", "options": ["<option1>", "<option2>", "<option3>", "<option4>"], "correctAnswer": <index of correct option> }. Only provide the JSON array of questions.`,
      },
    ],
    model: "llama3-8b-8192",
  });

  const text = response.choices[0]?.message?.content.trim();
  console.log("Raw response text:", text);

  if (!text) {
    throw new Error("No response text received from Groq API");
  }

  const jsonStartIndex = text.indexOf("[");
  const jsonEndIndex = text.lastIndexOf("]") + 1;
  const jsonString = text.substring(jsonStartIndex, jsonEndIndex);

  try {
    const quizzes = JSON.parse(jsonString);
    console.log("Parsed quizzes:", quizzes);
    return quizzes;
  } catch (error) {
    console.error("Error parsing JSON response:", error);
    throw new Error("Invalid JSON format received from Groq API");
  }
};

export default async function handler(req, res) {
  // Set CORS headers if needed
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    switch (req.method) {
      case "POST":
        // Handle POST request
        if (!req.body.topic || !req.body.count) {
          return res.status(400).json({
            message: "Error",
            error: "Name and email are required",
          });
        }

        const questions = await generateAIQuizzes(
          req.body.topic,
          req.body.count
        );

        return res.status(201).json({
          message: "User created successfully",
          data: questions,
        });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({
          message: "Error",
          error: `Method ${req.method} Not Allowed`,
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error",
      error: "Internal server error",
    });
  }
}
