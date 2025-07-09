import { useEffect, useState } from "react";
import api from "../services/api";
import styles from "../styles/Performance.module.css";
import Navbar from "../components/Navbar";
import { showConfirmDialog } from "../services/alert";
import UserTab from "../components/UserTab";
import DataTable from "../components/DataTable";
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

const Performance = () => {
  const [history, setHistory] = useState([]);

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

  const chartData = {
    labels: history.map((r) => r.email),
    datasets: [
      {
        label: "Avg Score",
        data: history.map((r) => r.total_score),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "total attempt",
        data: history.map((r) => r.total_attempts),
        backgroundColor: "rgba(134, 214, 104, 0.6)",
      },
      {
        label: "total score",
        data: history.map((r) => r.total_score),
        backgroundColor: "rgba(234, 95, 21, 0.6)",
      },
    ],
  };

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

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Score",
      accessorKey: "total_score",
    },
    {
      header: "Start on",
      cell: ({ row }) => (
        <>
          {new Intl.DateTimeFormat("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(row.original.started_at))}
        </>
      ),
      accessorKey: "started_at",
    },
    {
      header: "Completed on",
      cell: ({ row }) => (
        <>
          <>
            {row.original.completed_at == null
              ? "Not subimited"
              : new Intl.DateTimeFormat("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(row.original.completed_at))}
          </>
        </>
      ),
      accessorKey: "completed_at",
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <>{row.original.completed_at == null ? "Pending" : "Completed"}</>
      ),
      accessorKey: "completed_at",
    },
    // {
    //   header: "Actions",
    //   cell: ({ row }) => (
    //     <button
    //       onClick={() => handleDelete(row.original.id)}
    //       style={{
    //         backgroundColor: "#dc3545",
    //         color: "white",
    //         padding: "6px 12px",
    //         border: "none",
    //         borderRadius: "4px",
    //         cursor: "pointer",
    //       }}
    //     >
    //       Delete
    //     </button>
    //   ),
    // },
  ];

  return (
    <>
      <Navbar></Navbar>

      <div className={styles.container}>
        <UserTab></UserTab>

        {/* <div className={styles.chartContainer}>
          <Bar data={chartData} />
        </div> */}
        <DataTable data={history} columns={columns}></DataTable>
      </div>
    </>
  );
};

export default Performance;
