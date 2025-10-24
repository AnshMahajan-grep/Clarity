import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // API baseURL already points to /api, so use the auth path relative to that
      const res = await API.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      window.location.href = "/dashboard"; // redirect
    } catch (err) {
      const msg = err.response?.data?.error || "Login failed";
      setError(msg);
    }
  };

  return (
    <div className="container">
      <div className="panel" style={{ maxWidth: 500, margin: '40px auto' }}>
        <div className="panel-header">
          <h2>Login</h2>
        </div>
        <div className="panel-body">
          <form onSubmit={handleSubmit}>
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
            <button className="btn btn-primary" type="submit">Login</button>
          </form>
          <p style={{ marginTop: 12 }}>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
