import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Register.module.css";
import api from "../services/api";
import { showAlert } from "../services/alert";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      showAlert("warning", "Password Mismatch", "Passwords do not match");
      return;
    }
    try {
      let res = await api.post("/auth/signup", { email, password, role, name });
      if (res.status === 201) {
        showAlert(
          "success",
          "Registration Successful",
          "You have registered successfully"
        );
        navigate("/");
      } else {
        showAlert(
          "error",
          "Registration Failed",
          res.data?.error?.message || "An error occurred"
        );
      }
    } catch (err) {
      showAlert("warning", "Registration Failed", err.response?.data.message);
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
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
