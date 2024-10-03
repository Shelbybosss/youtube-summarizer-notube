import "./mainapp.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
import React, { useState } from "react";

function MainApp() {
    const [url, setUrl] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        // Send the URL to your backend server
        const response = await fetch("http://localhost:3000/submit-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),  // Send the URL as JSON
        });

        const result = await response.text();
        console.log("Server Response:", result);  // Log response from server

      } catch (error) {
        console.error("Error submitting URL:", error);
      }
    };

    return (
        <>
            <Navbar></Navbar>

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
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                </div>
            </div>

            <div className="generatedsummary-canvas">
                <h2>The Mysterious Forest</h2>
                <p>
                  Once upon a time, deep within an enchanted forest, there was a small village where the villagers lived in harmony with nature.
                  One day, a young boy named Leo wandered into the forest, following a trail of glowing butterflies.
                  As he ventured further, he stumbled upon a hidden grove where an ancient tree whispered forgotten secrets.
                  The tree revealed that Leo had the power to communicate with nature, and with his newfound ability,
                  he helped the villagers protect the forest from a looming danger.
                  From that day on, the village and the forest thrived together, bound by a magical bond that could never be broken.
                </p>
            </div>

            <div className="generatedmindmap-canvas">
                <h2>Mindmap</h2>
                <img src="src/assets/mindmap.jpg" alt="Mindmap" />
                <button className="download-button">Download</button>
            </div>

            <div className="generatedquiz-canvas"></div>

            <Footer></Footer>
        </>
    );
}

export default MainApp;
