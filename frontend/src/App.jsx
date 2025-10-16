import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MatchMonitoring from "./pages/MatchMonitoring";
import Profiles from "./pages/Profiles";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match-monitoring" element={<MatchMonitoring />} />
        <Route path="/profiles" element={<Profiles />} />
      </Routes>
    </>
  );
}

export default App;
