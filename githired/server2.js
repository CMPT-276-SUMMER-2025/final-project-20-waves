import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/universities', async (req, res) => {
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

    // Extract the JSON array from Gemini's response
    const match = text.match(/\[[^\]]*\]/); // Match array like ["A", "B"]
    let suggestions = [];

    if (match) {
      suggestions = JSON.parse(match[0]);
    } else {
      console.warn("No valid JSON array found in Gemini response:", text);
    }

    res.json({ suggestions });
  } catch (error) {
    console.error("Gemini error:", error.message);
    res.json({ suggestions: [] });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
