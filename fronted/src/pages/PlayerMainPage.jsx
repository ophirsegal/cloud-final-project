import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../api/socket";

function PlayerMainPage() {
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
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
      <h1 className="mb-3">Waiting for the next song...</h1>
      <p className="text-secondary">The admin will start the session shortly.</p>
    </div>
  );
}

export default PlayerMainPage;
