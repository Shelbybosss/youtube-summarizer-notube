import "./mainapp.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
import React, { useState, useEffect } from "react";
import mermaid from "mermaid"; // Import Mermaid
import * as d3 from "d3"; // Import D3.js

function MainApp() {
    const [url, setUrl] = useState("");
    const [summary, setSummary] = useState("");
    

    const [mindmapData, setMindmapData] = useState(""); // Store the Mermaid syntax
    

    const [loading, setLoading] = useState(false);

    // Initialize Mermaid when the component mounts
    useEffect(() => {
        mermaid.initialize({ startOnLoad: true });
    }, []);

    // Re-render D3 tree whenever the mindmapData changes
    useEffect(() => {
        if (mindmapData) {
            drawTree(mindmapData);  // Call the function to draw the tree
        }
    }, [mindmapData]);

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

    const generateMindmap = (summaryText) => {
        try {
            // Parse the HTML string into a DOM structure
            const parser = new DOMParser();
            const doc = parser.parseFromString(summaryText, "text/html");

            // Initialize the hierarchical data structure
            const mindmapData = {
                name: doc.querySelector("h1").innerText,
                children: [],
            };

            // Extract all h3 headings and their respective content
            const headings = doc.querySelectorAll("h3");
            
            headings.forEach(heading => {
                const title = heading.innerText;
                const node = {
                    name: title,
                    children: [],
                };
                
                const listItems = heading.nextElementSibling.querySelectorAll("li");
                listItems.forEach(item => {
                    const content = item.innerText.split(":")[0]; // Get the part before the colon
                    node.children.push({ name: content });
                });

                mindmapData.children.push(node);
            });

            // Update the mindmap data state
            setMindmapData(mindmapData);  // Set the hierarchical data
        } catch (error) {
            console.error("Error generating mindmap:", error);
        }
    };

    // Function to draw the D3 tree
    const drawTree = (data) => {
        // Clear any previous SVG
        d3.select(".generatedmindmap-canvas").select("svg").remove();
    
        // Set dimensions and margins for the tree diagram
        const width = 1400;
        const height = 700;
        const margin = { top: 40, right: 120, bottom: 40, left: 120 };
    
        // Create an SVG canvas
        const svg = d3.select(".generatedmindmap-canvas").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
        // Create a tree layout (horizontal)
        const tree = d3.tree()
            .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
    
        // Generate the root node
        const root = d3.hierarchy(data);
    
        // Create the tree nodes
        tree(root);
    
        // Update the positions of the nodes
        root.descendants().forEach((d) => {
            d.y = d.depth * 250; // Adjust horizontal spacing between levels
        });
    
        // Draw the links (lines connecting nodes)
        svg.selectAll(".link")
            .data(root.links())
            .enter().append("path")
            .attr("class", "link")
            .style("fill", "none")
            .style("stroke", "#aaa")
            .style("stroke-width", "2px")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x));
    
        // Draw the nodes
        const node = svg.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", d => `node${d.children ? " node--internal" : " node--leaf"}`)
            .attr("transform", d => `translate(${d.y},${d.x})`);
    
        // Add circles to nodes
        node.append("circle")
            .attr("r", 10)
            .style("fill", "#fff")
            .style("stroke", "#4CAF50")
            .style("stroke-width", "3px");
    
        // Add labels to nodes with shortened text
        node.append("text")
            .attr("dy", 3)
            .attr("x", d => d.children ? -15 : 15)
            .style("text-anchor", d => d.children ? "end" : "start")
            .style("font-size", "14px")
            .style("fill", "#333")
            .text(d => d.data.name);
    
        // Add pan functionality without zoom
        const zoom = d3.zoom()
            .scaleExtent([1, 1]) // Fix scale to 1, effectively disabling zoom
            .on("zoom", (event) => {
                svg.attr("transform", event.transform);
            });
    
        d3.select(".generatedmindmap-canvas > svg")
            .call(zoom)
            .on("wheel.zoom", null); // Disable zoom on scroll
    };

    //QUIZ

    
    
    return (
        <>
            <Navbar />

            <div className="main-hero-section">
                <div className="inner-hero">
                    <h1>Enter YouTube Video Link</h1>
                    <p>Get Video Summary, Mindmap, and get hold of knowledge by attempting a quiz.</p>

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

{!loading && mindmapData && (
    <div className="generatedmindmap-canvas" style={{ position: "relative", minHeight: "600px", paddingBottom: "50px" }}>
        <h2>Mindmap</h2>
        {/* This div will hold the dynamically rendered D3 diagram */}

        {/* Download button */}
        <button
            onClick={() => {
                const svgElement = document.querySelector(".generatedmindmap-canvas svg");

                if (svgElement) {
                    // Function to inline styles from CSS into the SVG elements
                    const inlineStyles = (svg) => {
                        const styles = window.getComputedStyle(svg);
                        const svgClone = svg.cloneNode(true);
                        const allElements = svgClone.querySelectorAll("*");

                        allElements.forEach((el) => {
                            const computedStyles = window.getComputedStyle(el);
                            for (let i = 0; i < computedStyles.length; i++) {
                                const key = computedStyles[i];
                                el.style[key] = computedStyles.getPropertyValue(key);
                            }
                        });

                        return svgClone;
                    };

                    // Inline styles into the SVG
                    const styledSvgElement = inlineStyles(svgElement);

                    // Convert the SVG to a string
                    const serializer = new XMLSerializer();
                    const svgString = serializer.serializeToString(styledSvgElement);

                    // Create a canvas and set its dimensions
                    const canvas = document.createElement("canvas");
                    canvas.width = svgElement.clientWidth;
                    canvas.height = svgElement.clientHeight;
                    const ctx = canvas.getContext("2d");

                    // Set a white background on the canvas
                    ctx.fillStyle = "#ffffff";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Create an image from the SVG
                    const img = new Image();
                    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
                    const url = URL.createObjectURL(svgBlob);

                    img.onload = function() {
                        // Draw the SVG image onto the canvas
                        ctx.drawImage(img, 0, 0);
                        URL.revokeObjectURL(url); // Free up the URL object

                        // Create a PNG from the canvas
                        const pngUrl = canvas.toDataURL("image/png");

                        // Trigger the download
                        const downloadLink = document.createElement("a");
                        downloadLink.href = pngUrl;
                        downloadLink.download = "mindmap.png";
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                    };

                    img.src = url;
                }
            }}
            style={{
                position: "absolute",
                bottom: "20px",  // Keep some space from the bottom
                left: "50%",
                transform: "translateX(-50%)",
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}
        >
            Download PNG
        </button>
    </div>
)}




            <Footer />
        </>
    );
}

export default MainApp;
