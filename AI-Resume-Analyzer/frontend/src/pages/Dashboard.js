import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 1;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a resume first! ❗");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDesc", jobRole || "Software Engineer"); 

    try {
      setLoading(true);

      const res = await fetch("/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let errorMessage = "Analysis failed";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use the status text
          errorMessage = res.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }
      
      const data = await res.json();
      
      // Navigate to result page with the analysis data
      navigate("/result", { state: { result: data } });

    } catch (err) {
      alert("Error: " + err.message + " ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">AI Resume Screening System</h1>
        </div>

        <div className="upload-section">
          <div className="upload-label">Upload Resume</div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
            accept=".pdf"
          />

          <div className="drop-zone" onClick={handleBrowseClick}>
            <div className="drop-zone-left">
              <svg className="cloud-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <div className="drop-text-wrapper">
                <h4>Drag and drop file here</h4>
                <p>Limit 200MB per file • PDF</p>
              </div>
            </div>
            <button className="browse-button">Browse files</button>
          </div>

          {file && (
            <div className="file-preview-container">
              <div className="file-info-row">
                <div className="file-info-left">
                  <svg className="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{formatFileSize(file.size)}</span>
                </div>
                <button className="remove-file-btn" onClick={handleRemoveFile}>✕</button>
              </div>

              <div className="success-alert">
                Resume Uploaded Successfully
              </div>

              <div className="job-role-section">
                <div className="input-label">Enter Job Role (Example: Python Developer)</div>
                <input 
                  type="text" 
                  className="job-role-input" 
                  placeholder="Type here..." 
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                />
              </div>

              <button className="analyze-btn" onClick={() => handleAnalyze()}>
                 {loading ? "Analyzing..." : "Analyze Resume"}
              </button>
            </div>
          )}

          {loading && <div className="loading-text">Analyzing your resume... 🧠</div>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;