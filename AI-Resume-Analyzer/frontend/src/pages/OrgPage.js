import { useNavigate } from "react-router-dom";

function OrgPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(135deg, #1d3557, #457b9d)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontFamily: "Poppins"
    }}>

      {/* 🔝 LOGIN */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}>
        <button
          onClick={() => navigate("/dashboard", { state: { role: "organization" } })}
          style={{
            padding: "8px 18px",
            borderRadius: "20px",
            border: "none",
            background: "rgba(255,255,255,0.2)",
            color: "white",
            cursor: "pointer"
          }}
        >
          ANALYZE NOW
        </button>
      </div>

      {/* 🎯 CONTENT */}
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "45px" }}>
          AI RESUME ANALYZER
        </h1>

        <h2>For ORGANIZATIONS</h2>

        <p>Evaluate Candidates</p>

        <div style={{
          margin: "30px auto",
          width: "300px",
          padding: "20px",
          border: "2px dashed white",
          borderRadius: "10px"
        }}>
          Upload Multiple Resumes <br />
          Drag & Drop Files
        </div>
      </div>

      {/* 🔽 SWITCH */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <p>For Freshers</p>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            borderRadius: "20px",
            border: "none",
            background: "white",
            color: "black"
          }}
        >
          Click Here
        </button>
      </div>
    </div>
  );
}

export default OrgPage;