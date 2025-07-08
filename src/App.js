import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TakeQuiz from "./pages/TakeQuiz";
import Performance from "./pages/Performance";
import ManageQuestions from "./pages/Admin/ManageQuestions";
import UserReports from "./pages/Admin/UserReports";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute role="user" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<TakeQuiz />} />
          <Route path="/performance" element={<Performance />} />
        </Route>

        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin/questions" element={<ManageQuestions />} />
          <Route path="/admin/reports" element={<UserReports />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
