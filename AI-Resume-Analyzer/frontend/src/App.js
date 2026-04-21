import { BrowserRouter, Routes, Route } from "react-router-dom";

import FresherPage from "./pages/FresherPage";
import OrgPage from "./pages/OrgPage";
import Dashboard from "./pages/Dashboard";
import ResultPage from "./pages/ResultPage";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FresherPage />} />
        <Route path="/org" element={<OrgPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;