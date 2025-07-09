import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Manage.module.css";
import { showConfirmDialog, showAlert } from "../../services/alert";
import Navtab from "../../components/AdminTab";

const ManageQuestions = () => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    try {
      const response = await api.get("/users");
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
      await api.post("/auth/signup", form);
      showAlert("success", "User", "Save successfully");
      setForm({
        id: "",
        name: "",
        email: "",
      });
      fetchSkills();
    } catch (err) {
      console.error("Failed to add question:", err);
    }
  };

  const handleDelete = async (id) => {
    const res = await showConfirmDialog(
      "alert",
      "Are you sure you want to delete this User ?"
    );

    if (!res.isConfirmed) return;

    try {
      await api.delete(`/users/${id}`);
      fetchSkills();
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        <Navtab></Navtab>
        <h2 className={styles.header}>Manage Users</h2>
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
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className={`${styles.input} `}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles.submitButton}>
            Add User
          </button>
        </form>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Id</th>
              <th className={styles.th}>User Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((q) => (
              <tr key={q.id}>
                <td className={styles.td}>{q.id}</td>
                <td className={styles.td}>{q.name}</td>
                <td className={styles.td}>{q.email}</td>
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
