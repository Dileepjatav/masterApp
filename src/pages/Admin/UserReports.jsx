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
import Navbar from "../../components/Navbar";
import styles from "../../styles/UserReport.module.css";
import Navtab from "../../components/AdminTab";
import DataTable from "../../components/DataTable";

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
  const fetchReports = async () => {
    try {
      const res = await api.get("/reports/user-performance");
      setReports(res.data);
      console.log(res.data);
    } catch (err) {
      alert("Failed to fetch reports");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const chartData = {
    labels: reports.map((r) => r.email),
    datasets: [
      {
        label: "Avg Score",
        data: reports.map((r) => r.avg_score),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "total attempt",
        data: reports.map((r) => r.total_attempts),
        backgroundColor: "rgba(134, 214, 104, 0.6)",
      },
      {
        label: "total score",
        data: reports.map((r) => r.total_score),
        backgroundColor: "rgba(234, 95, 21, 0.6)",
      },
    ],
  };

  const columns = [
    {
      header: "ID",
      accessorKey: "user_id",
    },
    {
      header: "Name",
      accessorKey: "user_name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Avrage Score",
      accessorKey: "avg_score",
    },
    {
      header: "Total Score",
      accessorKey: "total_score",
    },
    {
      header: "Total attempt",
      accessorKey: "total_attempts",
    },
  ];

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        <Navtab></Navtab>
        <div className={styles.chartContainer}>
          <Bar data={chartData} />
        </div>
        <DataTable data={reports} columns={columns}></DataTable>
      </div>
    </>
  );
};

export default UserReports;
