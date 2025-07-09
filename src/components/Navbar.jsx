// src/components/Navbar.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { role, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        height: "60px",
        backgroundColor: "#2c3e50",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>Quezz</div>

      {role && (
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span>
            Role: {role.toUpperCase()} Name: {user.name}
          </span>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#e74c3c",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
