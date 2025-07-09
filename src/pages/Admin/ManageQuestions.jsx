import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Manage.module.css";
import { showConfirmDialog, showAlert } from "../../services/alert";
import { useNavigate } from "react-router-dom";

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

  const fetchQuestions = async () => {
    try {
      const response = await api.get("/questions");
      console.log(response.data.data);
      setQuestions(response.data.data);
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
      await api.post("/questions", form);
      showAlert("success", "Question", "Save successfully");
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

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        <button onClick={() => navigate("/admin/skills")}>Manage Skills</button>
        <h2 className={styles.header}>Manage Questions</h2>
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
            Add Question
          </button>
        </form>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Id</th>
              <th className={styles.th}>Category</th>
              <th className={styles.th}>Question</th>
              <th className={styles.th}>Options</th>
              <th className={styles.th}>Answer</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id}>
                <td className={styles.td}>{q.id}</td>
                <td className={styles.td}>{q.skill_name}</td>
                <td className={styles.td}>{q.question_text}</td>
                <td className={styles.td}>
                  <ul className={styles.ul}>
                    <li className={styles.li}>{q.option_a}</li>
                    <li className={styles.li}>{q.option_b}</li>
                    <li className={styles.li}>{q.option_c}</li>
                    <li className={styles.li}>{q.option_d}</li>
                  </ul>
                </td>
                <td className={styles.td}>{q.correct_option}</td>
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
