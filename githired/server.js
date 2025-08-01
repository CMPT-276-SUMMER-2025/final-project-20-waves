import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

const JOOBLE_API_KEY = "ec5e7f3c-25e2-4016-be55-b47e3ff4560a";
const GEMINI_API_KEY = "AIzaSyCPg2LanlGaziWXu72ddmVmyWbODbNqt2E";
const PORT = 5000;

const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

app.use(cors());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientBuildPath = path.join(__dirname, "dist"); 

app.use(express.static(clientBuildPath));

app.post("/api/jobs", (req, res) => {
  const { keywords = "", location = "Bern", salary, radius } = req.body;

  const postDataObj = { keywords, location };

  if (salary) postDataObj.salary = salary;
  if (radius && radius !== "0") postDataObj.radius = radius;

  const postData = JSON.stringify(postDataObj);

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
        if (!json.jobs) {
          console.warn("No jobs returned by Jooble:", json);
          return res
            .status(502)
            .json({ error: "No jobs returned by Jooble", raw: json });
        }
        res.json({ jobs: json.jobs });
      } catch (e) {
        console.error("Invalid JSON from Jooble");
        res.status(500).json({ error: "Invalid JSON from Jooble" });
      }
    });
  });

  apiReq.on("error", (e) => {
    console.error("Request error:", e.message);
    res
      .status(500)
      .json({ error: "Request to Jooble failed", details: e.message });
  });

  apiReq.write(postData);
  apiReq.end();
});

app.post("/api/summarize", async (req, res) => {
  try {
    const { jobs } = req.body;
    if (!jobs || !Array.isArray(jobs)) {
      return res.status(400).json({ error: "Invalid jobs array" });
    }

    const jobList = jobs
      .map((j, i) => `${i + 1}. ${j.title} – ${j.location}`)
      .join("\n");

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an AI assistant for job-seeking interns. Summarize the following job listings:\n\n${jobList}`,
            },
          ],
        },
      ],
    });

    res.json({ summary: result.response.text() });
  } catch (err) {
    console.error("Gemini error:", err);
    res
      .status(500)
      .json({ error: "Failed to generate summary", details: err.message });
  }
});
app.post("/api/interview-questions", async (req, res) => {
  try {
    const { job } = req.body;
    if (!job || !job.title) {
      return res.status(400).json({ error: "Invalid job data" });
    }

    const prompt = `
      Generate 5 basic behavioral and situational interview questions based on this job:
      Title: ${job.title}
      Description: ${job.snippet || "No description provided."}
      Please avoid technical or coding questions.
    `;

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

    // Assume questions are separated by new lines, split and filter empty lines
    const questions = text.split("\n").map(q => q.trim()).filter(q => q.length > 0);

    res.json({ questions });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Failed to generate interview questions", details: err.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
