import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
import TakeQuiz from "./pages/TakeQuiz";
import Performance from "./pages/Performance";
import ManageQuestions from "./pages/Admin/ManageQuestions";
import UserReports from "./pages/Admin/UserReports";
import Users from "./pages/Admin/UserManage";
import ProtectedRoute from "./components/ProtectedRoutes";
import Skill from "./pages/Admin/Skill";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />

        <Route element={<ProtectedRoute roles="admin" />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/quiz" element={<TakeQuiz />} />
          <Route path="/performance" element={<Performance />} />
        </Route>

        <Route element={<ProtectedRoute roles="user" />}>
          <Route path="/admin/questions" element={<ManageQuestions />} />
          <Route path="/admin/skills" element={<Skill />} />
          <Route path="/admin/reports" element={<UserReports />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
