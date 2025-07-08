import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <button onClick={() => navigate("/quiz")}>Take Quiz</button>
      <button onClick={() => navigate("/performance")}>View Performance</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
