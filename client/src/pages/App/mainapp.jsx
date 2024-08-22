import "./mainapp.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer"
import React, { useState } from "react";

function MainApp() {


  

    const [url, setUrl] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Submitted URL:", url);
    };


    return (
        <>
        <Navbar></Navbar>

        <div className="main-hero-section" >
            <div className="inner-hero">
                <h1>Enter Youtube Video Link</h1>
                <p>Get Video Summary, Mindmap, and get hold of knowledge by attempting quiz.</p>

                <form onSubmit={handleSubmit} className="urlform">
                <input
                  type="url"
                  className="url-input"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter URL"  // Provide guidance with the placeholder
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
            <img src="src\assets\mindmap.jpg"></img>
            <button className="download-button">Download</button>
        </div>

        <div className="generatedquiz-canvas">
            
        </div>

        <Footer></Footer>

        </>
    );
}

export default MainApp;
