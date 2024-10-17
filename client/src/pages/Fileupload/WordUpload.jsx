import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';

function WordUpload() {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const extractTextAndSummarize = async () => {
        if (!file) return;

        setLoading(true);
        setError('');
        
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result; // This is the raw text content from the Word file

            try {
                const response = await fetch('http://localhost:3000/summarize-word', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ transcript: text }),
                });
                
                const data = await response.json();
                if (response.ok) {
                    setSummary(data.summary);
                } else {
                    throw new Error(data.error || 'Failed to generate summary');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        reader.readAsText(file);
    };

    return (
        <>
        <Navbar></Navbar>
        <div className="file-upload-container">
            <h1>Upload Word Document</h1>
            <input type="file" accept=".doc,.docx" onChange={handleFileChange} />
            <button onClick={extractTextAndSummarize} disabled={!file || loading}>
                {loading ? 'Loading...' : 'Generate Summary'}
            </button>
            {error && <div className="error">{error}</div>}
            {summary && (
                <div className="summary">
                    <h3>Summary</h3>
                    <div className="summary-content" dangerouslySetInnerHTML={{ __html: summary }} />
                </div>
            )}
        </div>
        </>
    );
}

export default WordUpload;
