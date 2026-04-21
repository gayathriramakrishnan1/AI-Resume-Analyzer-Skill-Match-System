import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./History.css";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/history");
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await fetch(`/history/${id}`, { method: "DELETE" });
      setHistory(history.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="history-page-container">
      <div className="history-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        <h1>Saved Analyses History</h1>
      </div>

      <div className="history-content">
        {loading ? (
          <div className="loading-spinner">Loading History...</div>
        ) : history.length === 0 ? (
          <div className="no-history">
            <p>No past analyses found. Start by scanning a resume!</p>
            <button onClick={() => navigate("/dashboard")}>Analyze Now</button>
          </div>
        ) : (
          <div className="history-grid">
            {history.map((item) => (
              <div 
                key={item._id} 
                className="history-card"
                onClick={() => navigate("/result", { state: { result: item } })}
              >
                <div className="card-top">
                  <span className="file-name">📄 {item.resumeText.substring(0, 20)}...</span>
                  <span className="match-badge">{item.score}% Match</span>
                </div>
                <div className="card-middle">
                  <p><strong>Role:</strong> {item.jobDesc}</p>
                  <p className="timestamp">{new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()}</p>
                </div>
                <div className="card-bottom">
                   <button className="delete-btn" onClick={(e) => deleteEntry(item._id, e)}>Delete</button>
                   <span className="view-link">View Details →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
