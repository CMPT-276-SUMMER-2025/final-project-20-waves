
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/interview-questions", async (req, res) => {
  console.log("🟢 Received POST /api/interview-questions with job:", req.body);

  const { job } = req.body;

  if (!job || !job.title) {
    return res.status(400).json({ error: "Invalid job data" });
  }

  const prompt = `
Generate 5 basic behavioral and situational interview questions based on this job:
Title: ${job.title}
Description: ${job.snippet || "No description provided."}
Please avoid technical/coding questions.
  `;

  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text = result.response.text();

    const questions = text
      .split("\n")
      .map(q => q.trim())
      .filter(q => q.length > 0);

    res.json({ questions });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate interview questions" });
  }
});

export default router;
