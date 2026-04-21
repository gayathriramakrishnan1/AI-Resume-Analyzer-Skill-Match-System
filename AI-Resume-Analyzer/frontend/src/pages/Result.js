import { useLocation } from "react-router-dom";

function Result() {
  const location = useLocation();
  const { score, matched, missing } = location.state || {};

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f5f5"
    }}>
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        width: "400px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)"
      }}>
        <h2>Analysis Result 🎯</h2>

        <h3>Score: {score}%</h3>

        <h4>Matched Skills ✅</h4>
        <p>{matched}</p>

        <h4>Missing Skills ❌</h4>
        <p>{missing}</p>
      </div>
    </div>
  );
}

export default Result;