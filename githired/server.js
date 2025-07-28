import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import https from "https";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyD7dT37z8-CGgqjydCo7M2HQa-jW3n90_g",
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
        console.log("Jooble API response:", json); // check response
        res.json({ jobs: json.jobs || [] }); // always send jobs array
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on http://localhost:${PORT}`);
});
