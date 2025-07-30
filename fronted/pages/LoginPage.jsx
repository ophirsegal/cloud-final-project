import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/Login.css";

function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);
      const { role, instrument } = res.data.user;

      localStorage.setItem("role", role);
      localStorage.setItem("instrument", instrument);

      navigate(role === "admin" ? "/admin" : "/player");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed. Check your credentials.");
    }
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          borderRadius: "16px",
          minWidth: "380px",
          color: "#fff",
        }}
      >
        <h2 className="text-center mb-4 fw-bold">Login to JaMoveo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-success w-100 fw-bold">Login</button>
        </form>
        <p className="text-center mt-3 small">
          Don't have an account?{" "}
          <span
            className="text-info fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
