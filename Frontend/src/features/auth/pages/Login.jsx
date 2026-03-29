import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const success = await handleLogin({ email, password });
      if (success) {
        navigate("/");
      }
    }
  };

  return (
    <div className="page login-page">
      <h1>Doctor Login</h1>

      <p className="login-text">
        Login to access your hospital dashboard and manage appointments.
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        {error && <p className="error">{error}</p>}

        <div className="login-options">
          <label>
            <input type="checkbox" /> Remember Me
          </label>

          <a href="#">Forgot Password?</a>
        </div>

        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="signup-link">
          Don&apos;t have an account?
          <Link to="/register"> Register</Link>
        </p>
      </form>
    </div>
  );
}
