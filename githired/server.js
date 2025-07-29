// ===== IMPORTS =====
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import https from "https";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ===== CONFIG =====
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// ===== JOOBLE JOB SEARCH ENDPOINT =====
const JOOBLE_API_KEY = "ec5e7f3c-25e2-4016-be55-b47e3ff4560a";

app.post("/api/jobs", (req, res) => {
  const postData = JSON.stringify({
    keywords: req.body.keywords || "",
    location: req.body.location || "Bern",
  });

  const options = {
    hostname: "jooble.org",
    path: `/api/${JOOBLE_API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  const apiReq = https.request(options, (apiRes) => {
    let data = "";
    apiRes.on("data", (chunk) => {
      data += chunk;
    });

    apiRes.on("end", () => {
      try {
        const json = JSON.parse(data);
        console.log("Jooble API response:", json);
        res.json({ jobs: json.jobs || [] });
      } catch (e) {
        res.status(500).json({ error: "Invalid JSON from Jooble" });
      }
    });
  });

  apiReq.on("error", (e) => {
    console.error("Request error:", e);
    res.status(500).json({ error: "Request to Jooble failed" });
  });

  apiReq.write(postData);
  apiReq.end();
});

// ===== GEMINI AUTOCOMPLETE ENDPOINT =====
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/universities", async (req, res) => {
  const { query } = req.body;

  if (!query || query.length < 1) {
    return res.json({ suggestions: [] });
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
Given the input "${query}", return a JSON array of up to 4 real university names that start with this input. 
Output format: ["University A", "University B", ...]
Only return the JSON array. Do not include any explanation or text before or after it.
`;

  try {
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    const match = text.match(/\[[^\]]*\]/);
    const suggestions = match ? JSON.parse(match[0]) : [];

    res.json({ suggestions });
  } catch (error) {
    console.error("Gemini error:", error.message);
    res.json({ suggestions: [] });
  }
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
