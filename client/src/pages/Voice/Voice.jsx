import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import './Voice.css';

const Voice = () => {
  const [transcript, setTranscript] = useState(''); // Holds the transcript from voice input
  const [summary, setSummary] = useState(''); // Holds the generated summary
  const [isListening, setIsListening] = useState(false); // Tracks if voice recognition is active
  const [isSupported, setIsSupported] = useState(true); // Checks if the browser supports Speech Recognition
  const [loading, setLoading] = useState(false); // Loading state for generating the summary
  const [isMicrophoneActive, setIsMicrophoneActive] = useState(false); // State for microphone wave animation

  // Check if the browser supports Speech Recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  let recognition;
  if (isSupported) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    // Capture the speech recognition results
    recognition.onresult = (event) => {
      const transcriptArray = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ');
      setTranscript(transcriptArray); // Update transcript in the state
      console.log('Transcript updated:', transcriptArray); // Log the transcript update
    };

    // Handle speech recognition errors
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  }

  // Start the speech recognition
  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
      setIsMicrophoneActive(true); // Activate wave effect
    }
  };

  // Stop the speech recognition
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      setIsMicrophoneActive(false); // Deactivate wave effect
    }
  };

  // Function to send the transcript to the backend and fetch the summary
  const generateSummary = async () => {
    if (!transcript) {
      alert("Please provide a transcript to generate the summary."); // Handle empty transcript
      return;
    }
    
    setLoading(true); // Show loading indicator
    console.log('Sending transcript to backend:', transcript); // Log the transcript being sent

    try {
      const response = await fetch('http://localhost:3000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript }), // Send transcript as JSON payload
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get error details if response not OK
        throw new Error(errorData.error || 'Error while fetching summary'); // Corrected to use error from response
      }

      const data = await response.json();
      console.log('Summary received:', data.summary); // Log the received summary
      setSummary(data.summary); // Update summary in the state

    } catch (error) {
      console.error('Error summarizing transcript:', error);
      alert('Error while generating summary: ' + error.message); // Error handling for user feedback
    } finally {
      setLoading(false); // Remove loading state
    }
  };

  return (
    <>
      <Navbar />
      <div className="voice-container">
        <h1 className="title">Voice Input</h1>

        {/* Check if the browser supports speech recognition */}
        {!isSupported ? (
          <p className="error-message">
            Sorry, your browser doesn’t support voice input.
          </p>
        ) : (
          <>
            <div className="button-container">
              <button onClick={startListening} disabled={isListening} className='button-start'>
                Start Listening
              </button>
              <button onClick={stopListening} disabled={!isListening} className='button-stop'>
                Stop Listening
              </button>
            </div>

            {/* Microphone wave animation */}
            <div className={`microphone-wave ${isMicrophoneActive ? 'active' : ''}`}>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
            </div>

            <div className="transcript-container">
              <h2>Transcript:</h2>
              <p className="transcript">
                {transcript || 'Speak something to see the transcript...'}
              </p>
            </div>

            {/* Generate summary button */}
            <button className="summary-button" onClick={generateSummary} disabled={loading || !transcript}>
              {loading ? 'Generating Summary...' : 'Generate Summary'}
            </button>

            {/* Display the generated summary */}
            <div className="summary-container">
  <h2>Summary:</h2>
  <div
    className="summary"
    dangerouslySetInnerHTML={{ __html: summary || 'No summary available yet...' }}
  />
</div>
          </>
        )}
      </div>
    </>
  );
};

export default Voice;
