import "./mainapp.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
import React, { useState } from "react";

function MainApp() {
    const [url, setUrl] = useState("");
    const [summary, setSummary] = useState("");
    const [mindmapUrl, setMindmapUrl] = useState(""); // To store mindmap URL
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/submit-url", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });

            const result = await response.json();
            setSummary(result.summary);

            // After fetching the summary, generate the mindmap
            generateMindmap(result.summary);

        } catch (error) {
            console.error("Error submitting URL:", error);
        } finally {
            setLoading(false);
        }
    };

    const generateMindmap = async (summaryText) => {
        try {
            const mindmapResponse = await fetch("http://localhost:3000/generate-mindmap", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ summary: summaryText }),
            });

            const mindmapResult = await mindmapResponse.json();
            setMindmapUrl(mindmapResult.mindmapUrl);  // Set the mindmap URL

        } catch (error) {
            console.error("Error generating mindmap:", error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="main-hero-section">
                <div className="inner-hero">
                    <h1>Enter Youtube Video Link</h1>
                    <p>Get Video Summary, Mindmap, and get hold of knowledge by attempting quiz.</p>

                    <form onSubmit={handleSubmit} className="urlform">
                        <input
                            type="url"
                            className="url-input"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter URL"
                            required
                        />
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? "Processing..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>

            {loading && <p>Loading summary...</p>}

            {!loading && summary && (
                <div className="generatedsummary-canvas">
                  <h2>Generated Summary</h2>
                  <div className="Summary-Content">
                  <div dangerouslySetInnerHTML={{ __html: summary }} />
                  </div>
                </div>
                )}


            {!loading && mindmapUrl && (
                <div className="generatedmindmap-canvas">
                    <h2>Mindmap</h2>
                    <img src={mindmapUrl} alt="Mindmap" />
                    <a href={mindmapUrl} download className="download-button">Download</a>
                </div>
            )}

            <Footer />
        </>
    );
}

export default MainApp;
