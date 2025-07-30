import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import socket from "./api/socket";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminMainPage from "./pages/AdminMainPage";
import ResultsPage from "./pages/ResultsPage";
import LivePage from "./pages/LivePage";
import PlayerMainPage from "./pages/PlayerMainPage";
import SignupAdminPage from "./pages/SignupAdminPage";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("receive-song", (song) => {
      if (song) {
        localStorage.setItem("selectedSong", JSON.stringify(song));
        navigate("/live");
      }
    });

    return () => socket.off("receive-song");
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin" element={<AdminMainPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/live" element={<LivePage />} />
      <Route path="/player" element={<PlayerMainPage />} />
      <Route path="/signup-admin" element={<SignupAdminPage />} />
    </Routes>
  );
}

export default App;
