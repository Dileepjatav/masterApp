import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Manage.module.css";
import { showConfirmDialog, showAlert } from "../../services/alert";
import { useNavigate } from "react-router-dom";

const ManageQuestions = () => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [skills, setSkills] = useState([]);

  const navigate = useNavigate();

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

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        <button onClick={() => navigate("/admin/questions")}>
          Manage Questions
        </button>
        <button onClick={() => navigate("/admin/reports")}>User reports</button>
        <h2 className={styles.header}>Manage Skills</h2>
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

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Id</th>
              <th className={styles.th}>Skill Category</th>
              <th className={styles.th}>Description</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((q) => (
              <tr key={q.id}>
                <td className={styles.td}>{q.id}</td>
                <td className={styles.td}>{q.name}</td>
                <td className={styles.td}>{q.description}</td>
                <td className={styles.td}>
                  <button
                    onClick={() => handleDelete(q.id)}
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

export default ManageQuestions;
