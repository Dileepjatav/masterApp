import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Manage.module.css";
import { showConfirmDialog, showAlert } from "../../services/alert";
import Navtab from "../../components/AdminTab";
import DataTable from "../../components/DataTable";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({
    skill_id: "",
    question_text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: "",
  });
  const [skills, setSkills] = useState([]);

  const [option, setOption] = useState(["A", "B", "C", "D"]);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedID] = useState("");

  const fetchSkills = async () => {
    try {
      const response = await api.get("/skills");
      setSkills(response.data);
    } catch (err) {
      console.error("Failed to load skills:", err);
      alert("Failed to load skills");
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await api.get("/questions");
      console.log(response.data.data);
      setQuestions(response.data.data);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to load questions:", err);
      alert("Failed to load questions");
    }
  };

  useEffect(() => {
    fetchQuestions();
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
      editMode
        ? await api.put(`/questions/${selectedId}`, form)
        : await api.post("/questions", form);

      editMode
        ? showAlert("success", "Question", "Update successfully")
        : showAlert("success", "Question", "Save successfully");

      setForm({
        skill_id: "",
        question_text: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_option: "",
      });
      await fetchQuestions();
    } catch (err) {
      console.error("Failed to add question:", err);
    }
  };

  const handleDelete = async (id) => {
    const res = await showConfirmDialog(
      "alert",
      "Are you sure you want to delete this question?"
    );

    if (!res.isConfirmed) return;

    try {
      await api.delete(`/questions/${id}`);
      await fetchQuestions();
    } catch (err) {
      console.error("Failed to delete question:", err);
      alert("Failed to delete question");
    }
  };

  const handlEdit = async (row) => {
    setForm(row.original);
    setEditMode(true);
    setSelectedID(row.original.id);
  };

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Skill Category",
      accessorKey: "skill_name",
    },
    {
      header: "Question",
      accessorKey: "question_text",
    },

    {
      header: "Options",
      cell: ({ row }) => (
        <ul>
          <li>A {row.original.option_a}</li>
          <li>B {row.original.option_b}</li>
          <li>C {row.original.option_c}</li>
          <li>D {row.original.option_d}</li>
        </ul>
      ),
    },
    {
      header: "Answer",
      accessorKey: "correct_option",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <>
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
          <button
            onClick={() => handlEdit(row)}
            style={{
              backgroundColor: "#dcdchg",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <Navbar></Navbar>
      <Navtab></Navtab>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <select
            name="skill_id"
            className={`${styles.input} `}
            value={form.skill_id}
            onChange={(e) => {
              const { name, value } = e.target;
              setForm((prev) => ({
                ...prev,
                skill_id: value,
              }));
            }}
            required
          >
            <option value="">Select Skill</option>
            {skills.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <input
            className={styles.input}
            name="question_text"
            placeholder="Question"
            value={form.question_text}
            onChange={handleChange}
            required
          />
          <input
            className={`${styles.input} `}
            name="option_a"
            placeholder="option_a"
            value={form.option_a}
            onChange={handleChange}
            required
          />
          <input
            className={`${styles.input} `}
            name="option_b"
            placeholder="option_b"
            value={form.option_b}
            onChange={handleChange}
            required
          />
          <input
            className={`${styles.input} `}
            name="option_c"
            placeholder="option_c"
            value={form.option_c}
            onChange={handleChange}
            required
          />
          <input
            className={`${styles.input} `}
            name="option_d"
            placeholder="option_d"
            value={form.option_d}
            onChange={handleChange}
            required
          />

          <select
            name="correct_option"
            className={`${styles.input} ${styles.optionInput}`}
            value={form.correct_option}
            onChange={(e) => {
              const { name, value } = e.target;
              setForm((prev) => ({
                ...prev,
                correct_option: value,
              }));
            }}
            required
          >
            <option value="">Right Option</option>
            {option.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button type="submit" className={styles.submitButton}>
            {editMode ? "Update Question" : "Add Question"}
          </button>
        </form>
      </div>
      <div className={styles.container}>
        <DataTable data={questions} columns={columns}></DataTable>
      </div>
    </>
  );
};

export default ManageQuestions;
