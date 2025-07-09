import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Register.module.css";
import api from "../services/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { email, password, role });
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerContainer}>
        <h2 className={styles.registerTitle}>Register</h2>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.inputField}
          />
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
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.selectField}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>
        <p className={styles.loginText}>
          I have an account?{" "}
          <Link to="/" className={styles.loginLink}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
