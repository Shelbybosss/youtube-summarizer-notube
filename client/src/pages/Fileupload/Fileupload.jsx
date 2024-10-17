import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';
import './Fileupload.css'; // Create a CSS file for styles
import Navbar from '../../components/navbar/navbar';

function Fileupload() {
  const [pdfText, setPdfText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator

  const extractText = async (event) => {
    const file = event.target.files[0];
    try {
      const text = await pdfToText(file);
      setPdfText(text);
      setSummary('');
    } catch (error) {
      console.error('Failed to extract text from PDF', error);
    }
  };

  const generateSummary = async () => {
    if (!pdfText) {
      alert('Please upload a PDF first.');
      return;
    }

    setLoading(true); // Set loading to true
    setSummary(''); // Reset summary before generating a new one

    try {
      const response = await fetch('http://localhost:3000/filesummarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdfText }),
      });

      const data = await response.json();
      if (response.ok) {
        setSummary(data.summary);
      } else {
        setSummary('Failed to generate summary: ' + data.error);
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('Error generating summary.');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="file-upload-container">
      <header className="header">
        <h1>PDF Summarizer</h1>
        <input type="file" accept="application/pdf" onChange={extractText} />
        <button onClick={generateSummary} disabled={!pdfText || loading}>
          {loading ? 'Generating Summary...' : 'Generate Summary'}
        </button>
      </header>
      <div className="summary">
        <h3>Summary:</h3>
        <div className="summary-content" dangerouslySetInnerHTML={{ __html: summary }} />
      </div>
    </div>
    </>
  );
}

export default Fileupload;
