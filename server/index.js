import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { YoutubeTranscript } from 'youtube-transcript';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Function to extract video ID from YouTube URL
const extractVideoId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|.+\?v=)?([^&\n]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
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
    console.log(transcriptText);

    // Send the plain transcript text back to the frontend
    res.send(transcriptText);

  } catch (error) {
    console.error('Error fetching transcript:', error);
    res.status(500).send('Error fetching transcript');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
