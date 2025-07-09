import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Manage.module.css";
import { showConfirmDialog, showAlert } from "../../services/alert";
import Navtab from "../../components/AdminTab";
import DataTable from "../../components/DataTable";

const ManageQuestions = () => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    try {
      const response = await api.get("/skills");
      setSkills(response.data);
    } catch (err) {
      console.error("Failed to load skills:", err);
      alert("Failed to load skills");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("Form value", form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/skills", form);
      showAlert("success", "Question", "Save successfully");
      setForm({
        id: "",
        name: "",
        description: "",
      });
      fetchSkills();
    } catch (err) {
      console.error("Failed to add question:", err);
    }
  };

  const handleDelete = async (id) => {
    const res = await showConfirmDialog(
      "alert",
      "Are you sure you want to delete this Skill Category?"
    );

    if (!res.isConfirmed) return;

    try {
      await api.delete(`/skills/${id}`);
      fetchSkills();
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
  };

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Skill Category",
      accessorKey: "name",
    },
    {
      header: "Question",
      accessorKey: "description",
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
        <Navtab></Navtab>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className={`${styles.input} `}
            name="description"
            placeholder="description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles.submitButton}>
            Add skill Category
          </button>
        </form>

        <DataTable data={skills} columns={columns}></DataTable>
      </div>
    </>
  );
};

export default ManageQuestions;
