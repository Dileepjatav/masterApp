import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar></Navbar>
      <h2>User Dashboard</h2>
      <button onClick={() => navigate("/quiz")}>Take Quiz</button>
      <button onClick={() => navigate("/performance")}>View Performance</button>
    </div>
  );
};

export default Dashboard;
