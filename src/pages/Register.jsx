import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Register.module.css";
import api from "../services/api";
import { showAlert } from "../services/alert";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      showAlert("warning", "Password Mismatch", "Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/signup", {
        email,
        password,
        role,
        name,
      });

      if (res.status === 201) {
        showAlert("success", "Registration Successful", "You can now login");
        await login(
          res.data.token,
          res.data.user.role,
          res.data.user,
          res.data.user.name,
          res.data.user.email
        );
        navigate(res.data.user.role === "admin" ? "/admin/questions" : "/quiz");
        // navigate(role === "admin" ? "/admin/questions" : "/quiz");
      }
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        // Server responded with a status code outside 2xx range
        const { status, data } = error.response;

        if (status === 400) {
          // Zod validation error or other bad request
          const errorMessage =
            data.error?.message ||
            data.message ||
            data.errors?.join(", ") ||
            "Validation failed";
          showAlert("error", "Registration Failed", errorMessage);
        } else if (status === 409) {
          showAlert("error", "Registration Failed", "Email already exists");
        } else {
          showAlert(
            "error",
            "Registration Failed",
            "An unexpected error occurred"
          );
        }
      } else if (error.request) {
        // Request was made but no response received
        showAlert(
          "error",
          "Network Error",
          "Please check your internet connection"
        );
      } else {
        // Something happened in setting up the request
        showAlert("error", "Error", "Failed to send request");
      }

      console.error("Registration error:", error);
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
