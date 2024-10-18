import React, { useState } from 'react';

const QuizComponent = () => {
    const [summary, setSummary] = useState(""); // State for summary input
    const [quizData, setQuizData] = useState([]); // State to hold parsed quiz data
    const [error, setError] = useState(null); // State to hold any error messages

    // Function to handle quiz generation from summary
    const generateQuiz = async () => {
        if (!summary.trim()) {
            setError("Please enter a summary.");
            return;
        }
        
        try {
            const response = await fetch('/generate-quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ summary }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate quiz.');
            }

            const data = await response.json();
            const quizQuestions = data.quiz.split('\n').filter(q => q.trim()); // Split the quiz response into questions
            setQuizData(quizQuestions);
            setError(null); // Reset error state
            setSummary(""); // Clear summary input
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Quiz Generator</h2>
            <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Enter the summary text"
                rows="4"
                style={{ width: "100%", marginBottom: "10px" }}
            />
            <button onClick={generateQuiz}>Generate Quiz</button>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error if any */}
            <div>
                {quizData.length > 0 ? (
                    <ul>
                        {quizData.map((question, index) => (
                            <li key={index}>{question}</li> // Render each question
                        ))}
                    </ul>
                ) : (
                    <p>No quiz generated yet.</p> // Message if no quiz is generated
                )}
            </div>
        </div>
    );
};

export default QuizComponent;
