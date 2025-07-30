import { useNavigate } from "react-router-dom";
import "../styles/Results.css";
import socket from "../api/socket";

function ResultsPage() {
  const navigate = useNavigate();
  const results = JSON.parse(localStorage.getItem("searchResults")) || [];

  const handleSelectSong = (song) => {
    localStorage.setItem("selectedSong", JSON.stringify(song));
    socket.emit("send-song", song); 
    navigate("/live");
  };

  return (
    <div className="results-bg text-white p-4 min-vh-100">
      <h1 className="mb-4 text-center">Search Results</h1>
      <div className="row justify-content-center g-4">
        {results.map((song) => (
          <div className="col-md-4" key={song.id}>
            <div className="card h-100 bg-dark text-white shadow song-card">
              <img src={song.image} alt={song.title} className="card-img-top" />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{song.title}</h5>
                  <p className="card-text text-secondary">{song.artist}</p>
                </div>
                <button
                  className="btn btn-success mt-3 w-100"
                  onClick={() => handleSelectSong(song)}
                >
                  Select & Start
                </button>
              </div>
            </div>
          </div>
        ))}
        {results.length === 0 && (
          <p className="text-center text-muted">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default ResultsPage;
