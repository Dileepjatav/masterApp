import { useEffect, useState } from "react";
import api from "../services/api";

const TakeQuiz = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    api
      .get("/skills")
      .then((res) => setSkills(res.data))
      .catch(() => alert("Failed to load skills"));
  }, []);

  const startQuiz = async () => {
    try {
      const res = await api.get(`/questions/by-skill/${selectedSkill}`);
      setQuestions(res.data);
      setAnswers({});
      setSubmitted(false);
    } catch {
      alert("Failed to load questions");
    }
  };

  const handleSelect = (qId, index) => {
    setAnswers({ ...answers, [qId]: index });
  };

  const submitQuiz = async () => {
    const attempt = {
      skill: selectedSkill,
      responses: questions.map((q) => ({
        questionId: q.id,
        selected: answers[q.id],
        correct: q.answer,
      })),
    };

    const correctCount = attempt.responses.filter(
      (r) => r.selected === r.correct
    ).length;
    setScore(correctCount);
    setSubmitted(true);

    try {
      await api.post("/attempts", attempt);
    } catch {
      alert("Failed to save attempt");
    }
  };

  return (
    <div>
      <h2>Take Quiz</h2>

      <select
        value={selectedSkill}
        onChange={(e) => setSelectedSkill(e.target.value)}
      >
        <option value="">Select Skill</option>
        {skills.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button onClick={startQuiz} disabled={!selectedSkill}>
        Start Quiz
      </button>

      {questions.length > 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitQuiz();
          }}
        >
          {questions.map((q, i) => (
            <div key={q.id}>
              <p>
                <b>
                  Q{i + 1}: {q.question}
                </b>
              </p>
              {q.options.map((opt, idx) => (
                <div key={idx}>
                  <label>
                    <input
                      type="radio"
                      name={`q_${q.id}`}
                      value={idx}
                      checked={answers[q.id] === idx}
                      onChange={() => handleSelect(q.id, idx)}
                    />
                    {opt}
                  </label>
                </div>
              ))}
            </div>
          ))}

          <button type="submit">Submit Quiz</button>
        </form>
      )}

      {submitted && (
        <div>
          <h3>
            Your Score: {score} / {questions.length}
          </h3>
        </div>
      )}
    </div>
  );
};

export default TakeQuiz;
