import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Initialize express app and set the port
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Initialize Google Generative AI (Gemini) with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to extract video ID from YouTube URL
const extractVideoId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|.+\?v=)?([^&\n]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Function to send transcript to Gemini API and get a summary
const summarizeTranscript = async (transcriptText) => {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Use the generateContent method to get a summary
    const result = await model.generateContent(`Summarize the following YouTube transcript:\n${transcriptText}`);

    // Extract the summarized text from the result
    return result.response.text();
  } catch (error) {
    console.error('Error summarizing transcript with Gemini:', error.message);
    return 'Failed to summarize transcript.';
  }
};

// Route to handle form submission and fetch YouTube transcript
app.post('/submit-url', async (req, res) => {
  const url = req.body.url;

  // Extract the video ID from the URL
  const videoId = extractVideoId(url);
  if (!videoId) {
    return res.status(400).send('Invalid YouTube URL');
  }

  try {
    // Fetch the transcript for the video
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    // Map through the transcript array and extract only the text
    const transcriptText = transcript.map(item => item.text).join(' ');

    // Send the transcript to Gemini for summarization
    const summary = await summarizeTranscript(transcriptText);

    // Log the summary to the console
    console.log('Generated Summary:', summary);

    // Send both the plain transcript and the summary back to the frontend
    res.json({ transcript: transcriptText, summary });

  } catch (error) {
    console.error('Error fetching transcript:', error);
    res.status(500).send('Error fetching transcript');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
