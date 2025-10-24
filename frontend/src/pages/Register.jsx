import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // API baseURL already points to /api, so call the auth route relative to it
      const res = await API.post("/auth/register", { name, email, password });
      login(res.data.user, res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      const msg = err.response?.data?.error || "Registration failed";
      setError(msg);
    }
  };

  return (
    <div className="container">
      <div className="panel" style={{ maxWidth: 520, margin: '40px auto' }}>
        <div className="panel-header">
          <h2>Register</h2>
        </div>
        <div className="panel-body">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="College Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <div style={{ color: 'crimson', marginBottom: 8 }}>{error}</div>}
            <button className="btn btn-primary" type="submit">Register</button>
          </form>
          <p style={{ marginTop: 12 }}>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
