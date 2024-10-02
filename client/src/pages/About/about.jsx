import React from 'react';
import './about.css'; // Import your stylesheet


    const About = () => {
        return (
          <>
            <section className="purpose-vision">
              <div className="box-container">
                <div className="content">
                  <h2>Purpose and Vision</h2>
                  <p>
                    To make learning and knowledge consumption more efficient and accessible. In today’s fast-paced world, where online education and video-based content are rapidly growing, individuals often face the challenge of sifting through lengthy videos to find the key information they need. We built this platform to bridge that gap, giving users the ability to quickly grasp the essence of any video with just a few clicks.
                  </p>
                  <p>
                    Our vision is to revolutionize the way people interact with educational content, making knowledge acquisition faster and more personalized. Whether you're a student looking to summarize complex lectures, a professional seeking insights from webinars, or a content creator who wants to increase audience engagement, our platform serves as a powerful tool.
                  </p>
                </div>
                <div className="image-container">
                  <img src="src/assets/purposevision.jpg" alt="Purpose and Vision" />
                </div>
              </div>
            </section>
      
            {/* Benefits */}
            <div className="benefits">
              <h2 className="benefits-heading">Benefits</h2>
              <div className="features-content">
                <div className="benefit-1">
                  <img src="src/assets/savetime.png" alt="Saves Time" />
                  <h3>Save Time and Learn Efficiently</h3>
                </div>
      
                <div className="benefit-2">
                  <img src="src/assets/boostproductivity.jpg" alt="Quiz" />
                  <h3>Boosts Your Productivity</h3>
                </div>
      
                <div className="benefit-3">
                  <img src="src/assets/improvedunderstanding.png" alt="Mindmap" />
                  <h3>Improve Understanding and Retention</h3>
                </div>
              </div>
            </div>

            <div className="upcomingfeatures">

          <div className="upcomingfeatures-heading">
            <h1>Upcoming Features</h1>
          </div>

          <div className="upcomingfeatures-containers">

              <div className="container-1">
                  <h4>Video to Podcast Conversion</h4>
                  <p>This feature will allow users to convert YouTube videos into audio podcasts, enabling them to listen to content on the go, without the need for video playback.</p>
              </div>

              <div className="container-2">
                  <h4>Advanced Search</h4>
                  <p>Users can perform keyword-based searches within the generated summaries, making it easier to locate specific information quickly from long videos.</p>
              </div>

              <div className="container-3">
                  <h4>Multilingual Support</h4>
                  <p>The platform will support multiple languages, allowing users to generate summaries and interact with content in their preferred language, making the tool accessible to a global audience.</p>
              </div>
          </div>
      </div>


          </>
        );
      };
      
export default About;
      

