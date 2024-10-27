import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const generateAIQuizzes = async (topic, count) => {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Here’s a more detailed prompt to generate multiple-choice quiz questions in the specified JSON format:

            Create a JSON array containing multiple-choice quiz questions on topics as given by user. Follow the **exact JSON structure** below for each question:

            {
              "text": "<question text>",
              "options": ["<option1>", "<option2>", "<option3>", "<option4>"],
              "correctAnswer": <index of correct option>
            }

            Each question should:
            1. Be clearly worded, avoiding ambiguity.
            2. Offer four options, of which only **one is correct**.
            3. Represent the correct answer with a number from 0 to 3 in the correctAnswer field, denoting the index position in the options array.

            ### Example Format
            [
              {
                "text": "What is the capital of France?",
                "options": ["Madrid", "Rome", "Paris", "Berlin"],
                "correctAnswer": 2
              },
              {
                "text": "Which planet is known as the Red Planet?",
                "options": ["Earth", "Mars", "Jupiter", "Venus"],
                "correctAnswer": 1
              }
            ]

            Strictly return only the JSON array of questions, without additional commentary, explanations, or formatting outside the JSON. Make sure all entries are syntactically correct JSON.`,
      },
      {
        role: "user",
        content: `Generate ${count} multiple-choice quiz questions about ${topic} in STRICT JSON format.`,
      },
    ],
    model: "llama3-8b-8192",
  });

  const jsonString = response.choices[0]?.message?.content.trim();
  console.log("Raw response text:", jsonString);

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
