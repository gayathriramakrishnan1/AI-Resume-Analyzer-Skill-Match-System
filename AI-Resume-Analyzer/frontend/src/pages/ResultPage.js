import { useLocation, useNavigate } from "react-router-dom";
import "./ResultPage.css";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state || {};

  if (!result) {
    return (
      <div className="result-page-container">
        <h1>No result found</h1>
        <button className="back-button" onClick={() => navigate("/dashboard")}>Go Back</button>
      </div>
    );
  }

  // Parse matched and missing skills if they are JSON strings
  let matchedSkills = [];
  let missingSkills = [];
  try {
    matchedSkills = typeof result.matched === 'string' ? JSON.parse(result.matched) : (result.matched || []);
    missingSkills = typeof result.missing === 'string' ? JSON.parse(result.missing) : (result.missing || []);
  } catch (e) {
    console.error("Error parsing skills:", e);
  }

  return (
    <div className="result-page-container">
      <div className="result-main-content">
        <div className="result-content-wrapper">
          {/* Header */}
          <div className="result-header">
            <h1 className="main-title">Analysis Results</h1>
            <p className="subtitle">Resume vs {result.jobDesc}</p>
          </div>

          {/* Score Card */}
          <section className="score-card">
            <div className="score-header">
              <h2 className="section-title">Match Score</h2>
              <span className="score-percentage" style={{ color: result.score > 70 ? '#00f5d4' : result.score > 40 ? '#fee440' : '#ff006e' }}>
                {result.score}%
              </span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ 
                  width: `${result.score}%`,
                  background: `linear-gradient(90deg, #7409b8, ${result.score > 70 ? '#00f5d4' : result.score > 40 ? '#fee440' : '#ff006e'})`
                }}
              ></div>
            </div>
          </section>

          {/* Skills Grid */}
          <div className="skills-grid">
            {/* Matched Skills */}
            <section className="skills-card matched">
              <div className="card-header">
                <div className="status-icon success">✓</div>
                <h2 className="card-title">Matched Skills</h2>
              </div>
              <div className="skills-tags">
                {matchedSkills.length > 0 ? (
                  matchedSkills.map((skill, index) => (
                    <span key={index} className="skill-tag match">{skill}</span>
                  ))
                ) : (
                  <span className="no-skills">No matching skills found</span>
                )}
              </div>
            </section>

            {/* Missing Skills */}
            <section className="skills-card missing">
              <div className="card-header">
                <div className="status-icon error">!</div>
                <h2 className="card-title">Missing Skills</h2>
              </div>
              <div className="skills-tags">
                {missingSkills.length > 0 ? (
                  missingSkills.map((skill, index) => (
                    <span key={index} className="skill-tag miss">{skill}</span>
                  ))
                ) : (
                  <span className="no-skills">Great! No missing skills detected</span>
                )}
              </div>
            </section>
          </div>

          <div className="result-actions">
            <button className="back-btn" onClick={() => navigate("/dashboard")}>
              Analyze Another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
