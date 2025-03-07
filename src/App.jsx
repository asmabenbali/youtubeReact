import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import VideoPreview from "./pages/VideoPreview";
import Favorites from "./pages/Favorites";
import { useSelector } from "react-redux";

function App() {
  const darkMode = useSelector((state) => state.ui.darkMode);
  return (
    <Router>
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar darkMode={darkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:id" element={<VideoPreview />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
