import "./home.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
import { BackgroundLinesDemo } from "../../background_lines";
import { SparklesPreview } from "../../notube";

function Home() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      {/* Hero */}
      <div className="hero">
      <div className="heading">
          <h2>Summarize Your Youtube Videos in One Go!</h2>
          <p>Generate Summaries, Mindmaps, Attempt Quiz, and test your knowledge all at one place.</p>
        </div>
        <div className="tryit">
          <a href="./app"><button>Try It..</button></a>
        </div>
      </div>

      {/* Features */}
      <div className="features">
        <h2 className="features-heading">Explore Our Features</h2>
        <div className="features-content">
          <div className="feature-1">
            <img src="src/assets/summary.jpg" alt="Summary" />
            <h3>Summarize Youtube Videos</h3>
          </div>

          <div className="feature-2">
            <img src="src/assets/quiz.jpg" alt="Quiz" />
            <h3>Attempt Quiz to Test Knowledge</h3>
          </div>

          <div className="feature-3">
            <img src="src/assets/mindmap.jpg" alt="Mindmap" />
            <h3>Generate Mindmaps for Quick Revisions</h3>
          </div>
        </div>
      </div>

      {/* How to USe */}

      <div className="howtouse">

          <div className="howtouse-heading">
            <h1>How to Use?</h1>
          </div>

          <div className="howtouse-containers">

              <div className="container-1">
                  <h5>Step 1:</h5>
                  <p>Simply copy and paste the YouTube video link into NoTube, and instantly get your video summarized quickly and easily.</p>
              </div>

              <div className="container-2">
                  <h5>Step 2:</h5>
                  <p>Click the Generate Summary button, and NoTube will fetch the transcript and summarize the YouTube video.</p>
              </div>

              <div className="container-3">
                  <h5>Step 3:</h5>
                  <p>Read the concise summary with NoTube and save valuable time by getting the key points of your YouTube videos quickly.</p>
              </div>
          </div>
      </div>

      {/* Practical use cases*/}

      <div className="practicalusecases">
         
         <div className="usecaseheading">
            <h1>Practical Use cases for various scenarios</h1>
         </div>

         <div className="usecases-containers">
              <div className="usecase1">
                  <img src="src\assets\forstudents.png" alt="" />
                  <h3>For Students</h3>
                  <p>Stay on track with your studies by quickly summarizing YouTube lectures and tutorials.Make learning more efficient with concise video overviews</p>
              </div>

              <div className="usecase1">
                  <img src="src\assets\forresearcher.jpg" alt="" />
                  <h3>For Researchers</h3>
                  <p>Effortlessly capture the main insights from industry talks, conferences, and webinars using the YouTube summarizer.</p>
              </div>

              <div className="usecase1">
                  <img src="src\assets\forprofessionals.png" alt="" />
                  <h3>For Professionals</h3>
                  <p>Notube can be invaluable for researchers, allowing them to quickly extract key insights and relevant information from academic talks, lectures, and webinars.</p>
              </div>
         </div>

         
      </div>

      {/* Footer */}

    <Footer/>
      
    </>
  );
}

export default Home;
