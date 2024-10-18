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
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb' })); // Set the limit as needed
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
    const result = await model.generateContent(`
      
      You are an advanced language model tasked with summarizing a YouTube transcript accurately and concisely. The summary should reflect the content with at least 95% accuracy. Structure the summary in HTML format, using <h3> tags for the headings and <ul> with <li> tags for the content under each heading. Ensure that each key point is presented as a bullet point within the list under the respective heading. Follow these instructions to produce a well-formatted summary:"

      Understand the Context:
          
      Read the entire transcript to comprehend the video’s theme, purpose, and key arguments.
      Ensure that all critical points are included in the summary.
      Key Information to Include:
          
      Main Topics: Structure each key topic as a heading using <h3>.
      Important Details: Present each key detail, fact, or argument in a bullet-pointed list under each heading using <ul> and <li> tags.
      Conclusions: Ensure the final takeaways or conclusions are also included in the bullet points.
      Length:
          
      Keep the summary concise, but include all important details (150-300 words).
      Clarity:
          
      Use simple language and structure to make the summary easy to understand.
      Break complex ideas into simpler statements, each presented in a bullet point.
      Format:
          
      Begin the summary with an overview using an <h1> heading and just include the heading name in this.
      Structure each key point as a bullet point under the appropriate heading using <ul> and <li> tags.:\n${transcriptText}`);

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

// Route to generate mindmap based on summary
app.post('/generate-mindmap', async (req, res) => {
  const { summary } = req.body;

  try {
      const lines = summary.split('\n').filter(line => line.trim() !== '');

      if (lines.length < 1) {
          throw new Error('Summary does not have enough data to generate a mindmap.');
      }

      // Create a request to the Gemini API to generate the mindmap structure
      const geminiResponse = await generateMindmapWithGemini(lines);
      
      // Extract mindmap data from Gemini's response
      const mindmapData = geminiResponse.data;

      // Send the structured data back to the frontend
      res.json({ mindmapData });
  } catch (error) {
      console.error('Error generating mindmap:', error);
      res.status(500).send('Error generating mindmap');
  }
});

// Function to request Gemini to create the mindmap structure
async function generateMindmapWithGemini(lines) {
  const prompt = `Create an extremely concise mindmap structure based on these topics, using only single words or 2-word phrases maximum:

${lines.map(line => `- ${line}`).join('\n')}

Provide a JSON structure with 'topic' and 'subtopics' keys. Example:
{
  "topic": "MainTopic",
  "subtopics": [
    {
      "topic": "Subtopic1",
      "subtopics": [
        {"topic": "Sub1.1"},
        {"topic": "Sub1.2"}
      ]
    },
    {"topic": "Subtopic2"}
  ]
}`;

  const response = await google.generativeai.chat({
    model: 'gemini-1.5',
    messages: [{ role: 'user', content: prompt }]
  });

  let mindmap = JSON.parse(response.choices[0].message.content);

  function trimTopic(topic) {
    return topic.split(' ').slice(0, 2).join(' ');
  }

  function processMindmap(node) {
    node.topic = trimTopic(node.topic);
    if (node.subtopics) {
      node.subtopics = node.subtopics.map(processMindmap);
    }
    return node;
  }

  return processMindmap(mindmap);
}

//Voice Summary

// Voice Summary Endpoint
app.post('/summarize', async (req, res) => {
  const { transcript } = req.body; // Extract transcript from request body
  console.log('Received transcript:', transcript); // Log it for debugging

  if (!transcript) {
    return res.status(400).json({ error: 'Transcript is required' });
  }

  try {
    // Call the voiceSummary function to get the summary
    const summary = await voiceSummary(transcript);
    
    // Respond with the generated summary
    res.json({ message: 'Transcript received successfully', summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    return res.status(500).json({ error: 'Failed to generate summary' });
  }
});

//Voice SUmmary
const voiceSummary = async (transcript) => { // Changed from transcriptText to transcript
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Use the generateContent method to get a summary
    const result = await model.generateContent(`You are an advanced language model tasked with summarizing a YouTube transcript accurately and concisely. Your summary should reflect the content with at least 95% accuracy and be structured in HTML format.

Understand the Context: Read the entire transcript to comprehend the video’s theme, purpose, and key arguments. Ensure that all critical points are included in the summary.

Key Information to Include:

Main Topics: Structure each key topic as a heading using <h3>.
Important Details: Present each key detail, fact, or argument in a bullet-pointed list under each heading using <ul> and <li> tags.
Conclusions: Ensure the final takeaways or conclusions are also included in the bullet points.
Length: Keep the summary concise, ideally between 150-300 words.

Clarity: Use simple language and structure to make the summary easy to understand. Break complex ideas into simpler statements.

Please summarize the following transcript and return the result:\n${transcript}`);

    // Extract the summarized text from the result
    return result.response.text();
  } catch (error) {
    console.error('Error summarizing transcript with Gemini:', error.message);
    return 'Failed to summarize transcript.';
  }
};

//Function for quiz generation

app.post('/filesummarize', async (req, res) => {
  const { pdfText } = req.body; // Extract the PDF text from request body
  console.log('Received PDF text:', pdfText); // Log it for debugging

  if (!pdfText) {
    return res.status(400).json({ error: 'PDF text is required' });
  }

  try {
    // Call the summarizePdfText function to get the summary
    const summary = await summarizePdfText(pdfText);
    
    // Respond with the generated summary
    res.json({ message: 'PDF text received successfully', summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    return res.status(500).json({ error: 'Failed to generate summary' });
  }
});

// PDF Summary Function
const summarizePdfText = async (pdfText) => {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Use the generateContent method to get a summary
    const result = await model.generateContent(`You are an advanced language model tasked with summarizing a provided PDF text accurately and concisely. Your summary should reflect the content with at least 95% accuracy and be structured in HTML format.

Understand the Context: Read the entire text to comprehend the document’s theme, purpose, and key arguments. Ensure that all critical points are included in the summary.

Key Information to Include:

Main Topics: Structure each key topic as a heading using <h3>.
Important Details: Present each key detail, fact, or argument in a bullet-pointed list under each heading using <ul> and <li> tags.
Conclusions: Ensure the final takeaways or conclusions are also included in the bullet points.
Length: Keep the summary concise, ideally between 150-300 words.

Clarity: Use simple language and structure to make the summary easy to understand. Break complex ideas into simpler statements.

Please summarize the following text and return the result:\n${pdfText}`);

    // Extract the summarized text from the result
    return result.response.text();
  } catch (error) {
    console.error('Error summarizing PDF text with Gemini:', error.message);
    return 'Failed to summarize PDF text.';
  }
};


//wordfile
// Word Summary Endpoint
app.post('/summarize-word', async (req, res) => {
  const { transcript } = req.body; // Extract transcript from request body
  

  if (!transcript) {
    return res.status(400).json({ error: 'Transcript is required' });
  }

  try {
    // Call the wordSummary function to get the summary
    const summary = await wordSummary(transcript);
    
    // Respond with the generated summary
    res.json({ message: 'Transcript received successfully', summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    return res.status(500).json({ error: 'Failed to generate summary' });
  }
});

// Word Summary Function
const wordSummary = async (transcript) => {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Use the generateContent method to get a summary
    const result = await model.generateContent(`You are an advanced language model tasked with summarizing a Word document accurately and concisely. Your summary should reflect the content with at least 95% accuracy and be structured in HTML format.

    Understand the Context: Read the entire transcript to comprehend the document’s theme, purpose, and key arguments. Ensure that all critical points are included in the summary.

    Key Information to Include:

    Main Topics: Structure each key topic as a heading using <h3>.
    Important Details: Present each key detail, fact, or argument in a bullet-pointed list under each heading using <ul> and <li> tags.
    Conclusions: Ensure the final takeaways or conclusions are also included in the bullet points.
    Length: Keep the summary concise, ideally between 150-300 words.

    Clarity: Use simple language and structure to make the summary easy to understand. Break complex ideas into simpler statements.

    Please summarize the following transcript and return the result:\n${transcript}`);

    // Extract the summarized text from the result
    return result.response.text();
  } catch (error) {
    console.error('Error summarizing transcript with Gemini:', error.message);
    return 'Failed to summarize transcript.';
  }
};



//QUIZ LOGIC

// Function to generate quiz based on summary
// Function to generate quiz based on summary
const generateQuizFromSummary = async (summaryText) => {
  try {
    // Sending the summary to Gemini to generate quiz questions
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(`
      Based on the following summary, create a set of quiz questions that test comprehension of the key points. 
      Provide 5 questions in the following format:
      
      Question 1:
      - Question text: [text]
      - Option 1: [option1]
      - Option 2: [option2]
      - Option 3: [option3]
      - Correct answer: [correct answer]

      Summary: ${summaryText}
    `);

    return result.response.text(); // Return quiz response text
  } catch (error) {
    console.error('Error generating quiz:', error.message);
    return 'Failed to generate quiz.';
  }
};

// Route to generate quiz based on the su

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
