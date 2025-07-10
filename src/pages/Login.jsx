import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import styles from "../styles/Login.module.css";
import { showWarning } from "../services/alert";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, role, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "admin" && role !== null) {
      navigate("/admin/questions");
    } else if (role === "user") {
      navigate("/quiz");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });
      await login(
        res.data.token,
        res.data.user.role,
        res.data.user,
        res.data.user.name,
        res.data.user.email
      );
      navigate(res.data.user.role === "admin" ? "/admin/questions" : "/quiz");
    } catch (err) {
      console.log(err);
      showWarning(
        "Login Failed",
        err.response?.data.message || "Invalid credentials"
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h2 className={styles.loginTitle}>Login</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
          />
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
        <p className={styles.registerText}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.registerLink}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
