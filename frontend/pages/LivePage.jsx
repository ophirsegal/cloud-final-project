import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../api/socket";
import "../styles/Live.css";

function LivePage() {
  const [song, setSong] = useState(null);
  const [scrolling, setScrolling] = useState(false);
  const instrument = localStorage.getItem("instrument");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const isSinger = instrument === "vocals";

  useEffect(() => {
    const saved = localStorage.getItem("selectedSong");
    if (saved) setSong(JSON.parse(saved));

    socket.on("receive-song", (data) => {
      if (data) {
        setSong(data);
        localStorage.setItem("selectedSong", JSON.stringify(data));
      } else {
        localStorage.removeItem("selectedSong");
        navigate(role === "admin" ? "/admin" : "/player");
      }
    });

    return () => socket.off("receive-song");
  }, [navigate, role]);

  useEffect(() => {
    let interval;
    if (scrolling) {
      interval = setInterval(() => window.scrollBy(0, 1), 50);
    }
    return () => clearInterval(interval);
  }, [scrolling]);

  if (!song) return <p className="text-white">Waiting for song...</p>;

  return (
    <div className="live-page text-white p-4">
      <h2>{song.title}</h2>
      <h4 className="text-muted">{song.artist}</h4>
      <div className="mt-4">
        {song.lyrics.map((line, idx) => (
          <p key={idx} className="fs-4">
            {line.map((part, i) => (
              <span key={i} className="me-2">
                {part.lyrics}
                {!isSinger && part.chords && (
                  <span className="text-success ms-1">({part.chords})</span>
                )}
              </span>
            ))}
          </p>
        ))}
      </div>

      <button className="btn btn-outline-light mt-4 me-3" onClick={() => setScrolling(!scrolling)}>
        {scrolling ? "Stop Scroll" : "Start Scroll"}
      </button>


      {role === "admin" && (
        <button
          className="btn btn-danger mt-4"
          onClick={() => {
            socket.emit("send-song", null); 
          }}
        >
          Quit
        </button>
      )}
    </div>
  );
}

export default LivePage;
