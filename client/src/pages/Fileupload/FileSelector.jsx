import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FileSelector.css';
import Navbar from '../../components/navbar/navbar';
import wordIcon from '../../assets/word-icon.png.png'; // Path to Word image
import pdfIcon from '../../assets/pdf-icon.png.png';   // Path to PDF image

function FileSelector() {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <>
      <Navbar />
      <div className="file-selector-container">
        <div
          className="file-option word-file"
          onClick={() => handleNavigate('/wordupload')}
        >
          <img src={wordIcon} alt="Word Icon" className="file-icon" />
          <h2>Upload Word File</h2>
          <p>Click here to upload a Word document (.docx)</p>
        </div>

        <div
          className="file-option pdf-file"
          onClick={() => handleNavigate('/fileupload')}
        >
          <img src={pdfIcon} alt="PDF Icon" className="file-icon" />
          <h2>Upload PDF File</h2>
          <p>Click here to upload a PDF document (.pdf)</p>
        </div>
      </div>
    </>
  );
}

export default FileSelector;
