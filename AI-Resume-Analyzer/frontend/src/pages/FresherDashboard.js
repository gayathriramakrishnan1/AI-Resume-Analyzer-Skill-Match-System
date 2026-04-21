import { useState } from "react";
import "./fresher.css";

function FresherDashboard() {
  const [file, setFile] = useState(null);

  return (
    <div className="main-container">

      {/* 🔝 HEADER */}
      <div className="header">
        <h1><span>AI</span> RESUME ANALYZER</h1>
        <button className="login-btn">LOG IN | SIGN UP</button>
      </div>

      {/* 🎯 TITLE */}
      <div className="center-text">
        <h2>For FRESHERS</h2>
        <p>Analyze Your Resume</p>
      </div>

      {/* 📤 UPLOAD */}
      <div className="upload-box">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <p>Drag & Drop or <span>Browse</span></p>
      </div>

      {/* 📊 RESULTS */}
      <div className="results">
        <h3>Results</h3>

        <div className="result-grid">

          {/* Score */}
          <div className="score-circle">
            <div className="circle">
              <h1>82</h1>
              <p>Your Score</p>
            </div>
          </div>

          {/* Matched */}
          <div className="card green">
            <h4>Matched Skills</h4>
            <p>6 Skills Matched</p>
            <span>JavaScript, Project Management</span>
          </div>

          {/* Missing */}
          <div className="card red">
            <h4>Missing Skills</h4>
            <p>4 Skills Missing</p>
            <span>Machine Learning, SQL</span>
          </div>

        </div>
      </div>

      {/* 📜 HISTORY */}
      <div className="history">
        <h3>History</h3>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

    </div>
  );
}

export default FresherDashboard;