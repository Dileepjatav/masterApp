// [PREVIOUS CODE OMITTED FOR BREVITY — unchanged sections remain here]

// src/pages/Admin/UserReports.js
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get("/reports/user-performance");
        setReports(res.data);
      } catch (err) {
        alert("Failed to fetch reports");
      }
    };

    fetchReports();
  }, []);

  const chartData = {
    labels: reports.map((r) => r.email),
    datasets: [
      {
        label: "Avg Score",
        data: reports.map((r) => r.avgScore),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>User Reports</h2>

      <div style={{ width: "600px", margin: "20px auto" }}>
        <Bar data={chartData} />
      </div>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th>User</th>
            <th>Total Quizzes</th>
            <th>Average Score</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, i) => (
            <tr key={i}>
              <td>{r.email}</td>
              <td>{r.totalQuizzes}</td>
              <td>{r.avgScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserReports;
