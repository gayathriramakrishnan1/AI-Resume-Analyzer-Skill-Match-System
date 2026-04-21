import { useNavigate } from "react-router-dom";
import "./Fresher.css";

function FresherPage() {
  const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="fresher-container">
      {/* 🔝 TOP RIGHT LOGIN */}
      <div className="header-nav">
        <button
          className="login-signup-btn"
          onClick={handleNavigateToDashboard}
        >
          ANALYZE NOW
        </button>
      </div>

      <div className="fresher-main-content">
        {/* 🎯 HEADER TITLES */}
        <div className="hero-section">
          <h1 className="main-title">
            <span className="gradient-text">AI</span> <span className="white-text">RESUME ANALYZER FOR FRESHERS</span>
          </h1>
          <p className="sub-description">Analyze Your Resume</p>
        </div>

        {/* 🖼️ ILLUSTRATION */}
        <div className="illustration-wrapper">
          <img 
            src="/resume_analyzer_illustration.png" 
            alt="Resume Analyzer" 
            className="illustration-img" 
          />
        </div>

        {/* 📤 STATIC UPLOAD BOX (Now just a visual) */}
        <div className="upload-container">
          <div className="upload-box" style={{ cursor: 'default', opacity: 0.9 }}>
            <div className="upload-icon-wrapper">
               <span className="upload-icon">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                   <polyline points="17 8 12 3 7 8"></polyline>
                   <line x1="12" y1="3" x2="12" y2="15"></line>
                 </svg>
               </span>
            </div>
            <div className="upload-text">
              <h3>Upload Your Resume</h3>
              <p>Drag & Drop or <span className="browse-link" style={{ pointerEvents: 'none' }}>Browse</span></p>
            </div>
          </div>
        </div>

        {/* 📊 STATIC RESULTS SECTION (Visual illustration only) */}
        <div className="results-section">
          <div className="results-divider">
            <span className="line"></span>
            <span className="text">Results</span>
            <span className="line"></span>
          </div>
          
          <div className="results-grid">
            {/* Gauge Meter */}
            <div className="gauge-card-wrapper">
              <div className="gauge-container">
                <div className="gauge-ring"></div>
                <div className="gauge-center">
                  <div className="gauge-score">--</div>
                  <div className="gauge-label">Your Score</div>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="cards-wrapper">
              <div className="result-card matched-card">
                <div className="card-header">
                  <div>Matched Skills</div>
                  <div className="overlay-glare"></div>
                </div>
                <div className="card-content">
                  <strong>0 Skills Matched</strong>
                  <p>JavaScript, React, etc.</p>
                </div>
              </div>

              <div className="result-card missing-card">
                <div className="card-header">
                  <div>Missing Skills</div>
                  <div className="overlay-glare"></div>
                </div>
                <div className="card-content">
                  <strong>0 Skills Missing</strong>
                  <p>Machine Learning, SQL, etc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FresherPage;