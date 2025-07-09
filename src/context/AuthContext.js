// context/AuthContext.js
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [name, setName] = useState(localStorage.getItem("name") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || null);

  const login = (token, role, user, name, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", user);
    localStorage.setItem("user", name);
    localStorage.setItem("email", email);

    setToken(token);
    setRole(role);
    setUser(user);
    setName(name);
    setEmail(email);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setUser(null);
    setName(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, role, login, logout, user, name, email }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
