import { useState } from "react";
import { useNavigate } from "react-router-dom";
import songsList from "../components/songsData.json";
import "../styles/Admin.css";

function AdminMainPage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = songsList.filter((song) =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
    );

    localStorage.setItem("searchResults", JSON.stringify(filtered));
    navigate("/results");
  };

  return (
    <div className="admin-bg text-white d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="mb-4">Search any song...</h1>
      <form onSubmit={handleSearch} className="w-75">
        <input
          type="text"
          placeholder="Enter song title or artist"
          className="form-control form-control-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-light mt-3 w-100">
          Search
        </button>
      </form>
    </div>
  );
}

export default AdminMainPage;
