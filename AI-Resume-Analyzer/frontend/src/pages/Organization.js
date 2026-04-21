import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  TextField,
  Typography,
  Card,
  CardContent
} from "@mui/material";

function Organization() {
  const [files, setFiles] = useState([]);
  const [jobDesc, setJobDesc] = useState("");
  const navigate = useNavigate();

  const analyze = async () => {
    if (files.length === 0) {
      alert("Upload resumes ❗");
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("resumes", files[i]);
    }

    formData.append("jobDesc", jobDesc);

    const res = await fetch("/analyze-multiple", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    navigate("/ranking", { state: { results: data } });
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Card style={{ padding: "20px", borderRadius: "15px" }}>
        <CardContent>
          <Typography variant="h5">Organization Panel 🏢</Typography>

          <br />

          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />

          <br /><br />

          <TextField
            label="Job Description"
            multiline
            rows={4}
            fullWidth
            onChange={(e) => setJobDesc(e.target.value)}
          />

          <br /><br />

          <Button variant="contained" fullWidth onClick={analyze}>
            Analyze All 🚀
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Organization;