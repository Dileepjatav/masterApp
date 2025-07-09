import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TakeQuiz from "./pages/TakeQuiz";
import Performance from "./pages/Performance";
import ManageQuestions from "./pages/Admin/ManageQuestions";
import UserReports from "./pages/Admin/UserReports";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<p>Page Not Found</p>} />

        <Route element={<ProtectedRoute roles="admin" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<TakeQuiz />} />
          <Route path="/performance" element={<Performance />} />
        </Route>

        <Route element={<ProtectedRoute roles="user" />}>
          <Route path="/admin/questions" element={<ManageQuestions />} />
          <Route path="/admin/reports" element={<UserReports />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
