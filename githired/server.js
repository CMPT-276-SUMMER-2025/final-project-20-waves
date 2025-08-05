import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import multer from "multer";
import pdfParse from "pdf-parse";


const app = express();
const router = express.Router();
const upload = multer();

router.post("/api/extract-pdf-text", upload.single("file"), async (req, res) => {
  try {
    const buffer = req.file?.buffer;
    if (!buffer) return res.status(400).json({ error: "No file uploaded" });

    const data = await pdfParse(buffer);
    return res.json({ text: data.text });
  } catch (err) {
    console.error("PDF extraction error:", err);
    return res.status(500).json({ error: "Failed to extract text from PDF" });
  }
});

export default router;

// Should move to .env file
const JOOBLE_API_KEY = "ec5e7f3c-25e2-4016-be55-b47e3ff4560a";
const GEMINI_API_KEY = "AIzaSyCPg2LanlGaziWXu72ddmVmyWbODbNqt2E";
const PORT = 5000;
const GITHUB_CLIENT_ID = "Iv23lim0mPy31j2pxNbg";
const GITHUB_SECRET_ID = "e755902fc5e092250b7dec0cdeaf89d525be17ab";

const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

app.use(cors());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientBuildPath = path.join(__dirname, "dist");

app.use("/images", express.static(path.join(__dirname, "images")));
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
    const questions = text
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    res.json({ questions });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({
      error: "Failed to generate interview questions",
      details: err.message,
    });
  }
});

app.post("/api/cover-letter-feedback", async (req, res) => {
  try {
    const { jobDescription, coverLetter } = req.body;

    if (!jobDescription || !coverLetter) {
      return res.status(400).json({ error: "Missing job description or cover letter" });
    }

    const prompt = `
You are an AI assistant helping job applicants improve their cover letters.
Given the following job description and cover letter, provide constructive, specific feedback
on how the applicant could improve their writing.

Job Description:
${jobDescription}

Cover Letter:
${coverLetter}
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

    const feedback = result.response.text();

    res.json({ feedback });
  } catch (err) {
    console.error("Gemini error (feedback):", err);
    res.status(500).json({
      error: "Failed to generate cover letter feedback",
      details: err.message,
    });
  }
});


app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Express route for Github Login
app.get("/external-signup", async (req, res) => {
  try {
    const code = req.query.accessToken;
    if (!code) return res.status(400).json({ error: "Missing code" });

    // Step 1: Exchange code for access token
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_SECRET_ID,
          code: code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return res.status(401).json({ error: "Failed to obtain access token" });
    }

    // Step 2: Fetch user profile
    const userProfileResponse = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userProfile = await userProfileResponse.json();

    res.json({
      name: userProfile.name,
      email: userProfile.email,
      avatar: userProfile.avatar_url,
      githubUsername: userProfile.login,
    });
  } catch (err) {
    console.error("GitHub login error:", err);
    res
      .status(500)
      .json({ error: "GitHub login failed", details: err.message });
  }
});
