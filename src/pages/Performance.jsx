import { useEffect, useState } from "react";
import api from "../services/api";
import styles from "../styles/Performance.module.css";
import Navbar from "../components/Navbar";
import { showConfirmDialog, showAlert } from "../services/alert";
import { useNavigate } from "react-router-dom";

const Performance = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const fetchPerformance = async () => {
    try {
      const res = await api.get("/attempts");
      setHistory(res.data.data);
    } catch (err) {
      alert("Failed to load performance history");
    }
  };

  useEffect(() => {
    fetchPerformance();
  }, []);

  const handleDelete = async (id) => {
    const res = await showConfirmDialog(
      "alert",
      "Are you sure you want to delete this Attempt?"
    );

    if (!res.isConfirmed) return;

    try {
      await api.delete(`/attempts/${id}`);
      fetchPerformance();
    } catch (err) {
      console.error("Failed to delete question:", err);
      alert("Failed to delete question");
    }
  };

  return (
    <>
      <Navbar></Navbar>

      <div className={styles.container}>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/quiz")}>Take Quiz</button>

        <h2 className={styles.header}>Performance History</h2>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Id</th>
              <th className={styles.th}>Skill</th>
              <th className={styles.th}>Score</th>
              <th className={styles.th}>Start Date</th>
              <th className={styles.th}>Submited Date</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((attempt, i) => (
              <tr key={i}>
                <td className={styles.td}>{attempt.id}</td>
                <td className={styles.td}>{attempt.name}</td>
                <td className={`${styles.td} ${styles.scoreCell}`}>
                  {attempt.total_score}
                </td>
                <td className={`${styles.td} ${styles.dateCell}`}>
                  {new Intl.DateTimeFormat("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(attempt.started_at))}
                </td>
                <td className={styles.td}>
                  {attempt.completed_at == null
                    ? "Not subimited"
                    : new Date(attempt.started_at).toLocaleString()}
                </td>
                <td className={styles.td}>
                  {attempt.completed_at == null ? "Pending" : "Complete"}
                </td>
                <td className={styles.td}>
                  <button
                    onClick={() => handleDelete(attempt.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Performance;
