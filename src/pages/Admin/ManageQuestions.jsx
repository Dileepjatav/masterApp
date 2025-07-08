import { useEffect, useState } from "react";
import api from "../../services/api";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({
    skill: "",
    question: "",
    options: ["", "", "", ""],
    answer: 0,
  });

  const fetchQuestions = async () => {
    try {
      const res = await api.get("/questions");
      setQuestions(res.data);
    } catch (err) {
      alert("Failed to load questions");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("option")) {
      const index = parseInt(name.slice(-1));
      const updatedOptions = [...form.options];
      updatedOptions[index] = value;
      setForm({ ...form, options: updatedOptions });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/questions", form);
      setForm({
        skill: "",
        question: "",
        options: ["", "", "", ""],
        answer: 0,
      });
      fetchQuestions();
    } catch (err) {
      alert("Failed to add question");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/questions/${id}`);
      fetchQuestions();
    } catch (err) {
      alert("Failed to delete question");
    }
  };

  return (
    <div>
      <h2>Manage Questions</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="skill"
          placeholder="Skill"
          value={form.skill}
          onChange={handleChange}
          required
        />
        <input
          name="question"
          placeholder="Question"
          value={form.question}
          onChange={handleChange}
          required
        />
        {form.options.map((opt, i) => (
          <input
            key={i}
            name={`option${i}`}
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={handleChange}
            required
          />
        ))}
        <input
          name="answer"
          type="number"
          min="0"
          max="3"
          placeholder="Correct Option Index (0-3)"
          value={form.answer}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Question</button>
      </form>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Skill</th>
            <th>Question</th>
            <th>Options</th>
            <th>Answer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td>{q.skill}</td>
              <td>{q.question}</td>
              <td>
                <ul>
                  {q.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              </td>
              <td>{q.answer}</td>
              <td>
                <button onClick={() => handleDelete(q.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageQuestions;
