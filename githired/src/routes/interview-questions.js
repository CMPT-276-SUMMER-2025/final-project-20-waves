
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

import multer from "multer";
import pdfParse from "pdf-parse";

const router = express.Router();
const upload = multer();

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

router.post("/cover-letter-feedback", async (req, res) => {
  console.log("🟢 Received POST /api/cover-letter-feedback with data:", req.body);

  const { jobDescription, coverLetter } = req.body;

  if (!jobDescription || !coverLetter) {
    return res.status(400).json({ error: "Missing job description or cover letter" });
  }

  const prompt = `
You are a professional cover letter reviewer.
Please analyze the following cover letter and give constructive feedback in the context of the job description.
Focus on tone, structure, relevance, clarity, and persuasiveness.

Job Description:
${jobDescription}

Cover Letter:
${coverLetter}

Provide your suggestions in bullet points or short paragraphs.
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

    const feedback = result.response.text();
    res.json({ feedback });
  } catch (error) {
    console.error("Gemini API error (cover-letter):", error);
    res.status(500).json({ error: "Failed to generate cover letter feedback" });
  }
});

router.post("/extract-pdf-text", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const data = await pdfParse(req.file.buffer);
    res.json({ text: data.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to extract text from PDF" });
  }
});


export default router;
