import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/Login.css";

function SignupAdminPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", {
        ...formData,
        instrument: "admin",
        role: "admin",
      });

      localStorage.setItem("role", "admin");
      localStorage.setItem("instrument", "admin");
      navigate("/admin");
    } catch (err) {
      alert("Signup failed. Try a different username.");
    }
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 bg-dark text-white" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Admin Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-light w-100">
            Register as Admin
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupAdminPage;
