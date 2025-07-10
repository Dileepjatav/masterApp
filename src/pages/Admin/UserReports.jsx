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

const UserReports = () => {
  const [reports, setReports] = useState([]);
  const [skillgap, setSkillgap] = useState([]);
  const [timeBased, setTimeVased] = useState([]);

  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2026-12-31");

  const handleStartChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndChange = (e) => {
    setEndDate(e.target.value);
  };

  useEffect(() => {
    fetchTimeBased();
  }, [endDate]);

  const fetchReports = async () => {
    try {
      const res = await api.get("/reports/user-performance");
      setReports(res.data);
      console.log(res.data);
    } catch (err) {
      alert("Failed to fetch reports");
    }
  };
  const fetchGap = async () => {
    try {
      const res = await api.get("/reports/skill-gap");
      setSkillgap(res.data);
      console.log(res.data);
    } catch (err) {
      alert("Failed to fetch reports");
    }
  };

  const fetchTimeBased = async () => {
    try {
      const res = await api.get(
        "/reports/time-based?" +
          "startDate=" +
          startDate +
          "&endDate=" +
          endDate
      );
      setTimeVased(res.data);
      console.log(res.data);
    } catch (err) {
      alert("Failed to fetch reports");
    }
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    fetchReports();
    fetchGap();
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
        label: "Total attempt",
        data: reports.map((r) => r.total_attempts),
        backgroundColor: "rgba(134, 214, 104, 0.6)",
      },
      {
        label: "Total score",
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

  const skillchartData = {
    labels: skillgap.map((r) => r.skill_name),
    datasets: [
      {
        label: "Skill Name",
        data: skillgap.map((r) => r.skill_name),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Total attempt",
        data: skillgap.map((r) => r.total_attempts),
        backgroundColor: "rgba(134, 214, 104, 0.6)",
      },
      {
        label: "Avg score",
        data: skillgap.map((r) => r.avg_score),
        backgroundColor: "rgba(234, 95, 21, 0.6)",
      },
    ],
  };

  const skillolumns = [
    {
      header: "ID",
      accessorKey: "skill_id",
    },
    {
      header: "Skill Name",
      accessorKey: "skill_name",
    },

    {
      header: "Avrage Score",
      accessorKey: "avg_score",
    },
    {
      header: "Total attempt",
      accessorKey: "total_attempts",
    },
  ];

  const TimechartData = {
    labels: timeBased.map((r) => r.month),
    datasets: [
      {
        label: "Total attempt",
        data: timeBased.map((r) => r.total_attempts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Total Score",
        data: timeBased.map((r) => r.total_score),
        backgroundColor: "rgba(134, 214, 104, 0.6)",
      },
      {
        label: "Avg score",
        data: timeBased.map((r) => r.average_score),
        backgroundColor: "rgba(234, 95, 21, 0.6)",
      },
    ],
  };

  const timecolumns = [
    {
      header: "Month",
      accessorKey: "month",
    },
    {
      header: "Total score",
      accessorKey: "total_score",
    },
    {
      header: "Avrage Score",
      accessorKey: "average_score",
    },
    {
      header: "Total attempt",
      accessorKey: "total_attempts",
    },
  ];

  return (
    <>
      <Navbar></Navbar>
      <Navtab></Navtab>
      <div className={styles.container}>
        <h2>User Performance Report</h2>
        <div className={styles.chartContainer}>
          <Bar data={chartData} />
        </div>
      </div>
      <div className={styles.container}>
        <DataTable data={reports} columns={columns}></DataTable>
      </div>
      <div className={styles.container}>
        <h2>Skill Gap Report</h2>
        <div className={styles.chartContainer}>
          <Bar data={skillchartData} />
        </div>
      </div>
      <div className={styles.container}>
        <DataTable data={skillgap} columns={skillolumns}></DataTable>
      </div>
      <div className={styles.container}>
        <h2>Time Based Report</h2>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartChange}
              max={endDate} // restrict selection
            />
          </div>

          <div>
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndChange}
              min={startDate} // restrict selection
            />
          </div>
        </div>
        <div className={styles.chartContainer}>
          {" "}
          <Bar data={TimechartData} />
        </div>
      </div>
      <div className={styles.container}>
        <DataTable data={timeBased} columns={timecolumns}></DataTable>
      </div>
    </>
  );
};

export default UserReports;
