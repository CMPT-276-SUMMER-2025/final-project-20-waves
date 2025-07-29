// backend/routes/interviewQuestions.js
import express from "express";
import { GeminiClient } from "some-gemini-sdk"; // replace with your Gemini client

const router = express.Router();

router.post("/interview-questions", async (req, res) => {
  const { job } = req.body;

  const prompt = `
    Generate 5 basic behavioral and situational interview questions based on this job:
    Title: ${job.title}
    Description: ${job.snippet || "No description provided."}
    Please avoid technical/coding questions.
  `;

  try {
    const response = await GeminiClient.chat.completions.create({
      model: "gemini-1.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0].message.content;

    // Parse questions assuming they're separated by new lines
    const questions = text.split("\n").filter(q => q.trim().length > 0);

    res.json({ questions });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate interview questions" });
  }
});

export default router;
