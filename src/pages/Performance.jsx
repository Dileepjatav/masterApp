import { useEffect, useState } from "react";
import api from "../services/api";
import styles from "../styles/Performance.module.css";
import Navbar from "../components/Navbar";
import { showConfirmDialog } from "../services/alert";
import UserTab from "../components/UserTab";
import DataTable from "../components/DataTable";

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
          {new Intl.DateTimeFormat("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(row.original.completed_at))}
        </>
      ),
      accessorKey: "completed_at",
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <>{row.original.completed_at == null ? "Not subimited" : "Completed"}</>
      ),
      accessorKey: "completed_at",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <button
          onClick={() => handleDelete(row.original.id)}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            padding: "6px 12px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <>
      <Navbar></Navbar>

      <div className={styles.container}>
        <UserTab></UserTab>
        <h2 className={styles.header}>Performance History</h2>
        <DataTable data={history} columns={columns}></DataTable>
      </div>
    </>
  );
};

export default Performance;
