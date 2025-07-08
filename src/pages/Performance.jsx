import { useEffect, useState } from "react";
import api from "../services/api";

const Performance = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const res = await api.get("/attempts/history");
        setHistory(res.data);
      } catch (err) {
        alert("Failed to load performance history");
      }
    };

    fetchPerformance();
  }, []);

  return (
    <div>
      <h2>Performance History</h2>
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Skill</th>
            <th>Score</th>
            <th>Total Questions</th>
          </tr>
        </thead>
        <tbody>
          {history.map((attempt, i) => (
            <tr key={i}>
              <td>{new Date(attempt.date).toLocaleString()}</td>
              <td>{attempt.skill}</td>
              <td>{attempt.score}</td>
              <td>{attempt.totalQuestions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Performance;
