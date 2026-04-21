import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress
} from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state?.role || "fresher";

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email & password ❗");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed ❌");
        setLoading(false);
        return;
      }

      // 💾 Save token & role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // 🔀 Redirect based on role
      if (data.role === "fresher") {
        navigate("/fresher");
      } else {
        navigate("/org");
      }

    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <Card
        style={{
          padding: "30px",
          borderRadius: "15px",
          maxWidth: "400px",
          margin: "auto",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            🔐 {role === "fresher" ? "Fresher Login" : "Organization Login"}
          </Typography>

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login 🚀"}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;