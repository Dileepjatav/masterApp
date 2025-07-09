import Navbar from "../components/Navbar";
import UserTab from "../components/UserTab";

const Dashboard = () => {
  return (
    <div>
      <Navbar></Navbar>
      <h2>User Dashboard</h2>
      <UserTab></UserTab>
    </div>
  );
};

export default Dashboard;
