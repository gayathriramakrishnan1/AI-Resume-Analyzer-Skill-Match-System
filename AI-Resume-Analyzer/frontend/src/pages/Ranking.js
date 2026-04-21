import { useLocation } from "react-router-dom";
import { Container, Typography, Card, CardContent } from "@mui/material";

function Ranking() {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <Container style={{ marginTop: "50px" }}>
      <Typography variant="h4">Top Candidates 🎯</Typography>

      {results.map((item, index) => (
        <Card key={index} style={{ marginTop: "15px", padding: "10px" }}>
          <CardContent>
            <Typography variant="h6">
              Rank #{index + 1}
            </Typography>

            <Typography>
              Score: {item.score}%
            </Typography>

            <Typography>
              File: {item.file}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Ranking;