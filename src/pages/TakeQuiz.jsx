import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import styles from "../styles/TakeQuiz.module.css";

const TakeQuiz = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [attemptId, setAttemptId] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get("/skills")
      .then((res) => setSkills(res.data))
      .catch(() => alert("Failed to load skills"));
  }, []);

  const startQuiz = async () => {
    try {
      const res = await api.post("/attempts", {
        skill_id: selectedSkill,
      });
      console.log(res.data.data);
      setQuestions(res.data.data);
      setAttemptId(res.data.attemptId);
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
        correct: q.correct_option.toLowerCase(),
      })),
    };

    const correctCount = attempt.responses.filter(
      (r) => r.selected === r.correct
    ).length;

    setScore(correctCount);
    setSubmitted(true);

    return;

    try {
      await api.post("/attempts", attempt);
    } catch {
      alert("Failed to save attempt");
    }
  };

  return (
    <>
      <Navbar></Navbar>

      <div className={styles.quizContainer}>
        <button onClick={() => navigate("/dashboard")}>Dashnoard</button>
        <button onClick={() => navigate("/performance")}>
          View Performance
        </button>

        <h2 className={styles.quizHeader}>Take Quiz</h2>

        <div className={styles.quizControls}>
          <select
            className={styles.skillSelect}
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

          <button
            className={styles.startButton}
            onClick={startQuiz}
            disabled={!selectedSkill}
          >
            Start Quiz
          </button>
        </div>
        {attemptId !== 0 && <p>Quiz Attempt ID {attemptId}</p>}

        {questions.length > 0 && (
          <form
            className={styles.quizForm}
            onSubmit={(e) => {
              e.preventDefault();
              submitQuiz();
            }}
          >
            {questions.map((q, i) => (
              <div className={styles.questionContainer} key={q.id}>
                <p className={styles.questionText}>
                  <b>
                    Q{i + 1}: {q.question_text}
                  </b>
                </p>

                {["a", "b", "c", "d"].map((optionKey) => (
                  <div className={styles.optionContainer} key={optionKey}>
                    <label className={styles.optionLabel}>
                      <input
                        className={styles.optionRadio}
                        type="radio"
                        name={`q_${q.id}`}
                        value={optionKey}
                        checked={answers[q.id] === optionKey}
                        onChange={() => handleSelect(q.id, optionKey)}
                      />
                      {q[`option_${optionKey}`]}
                    </label>
                  </div>
                ))}
              </div>
            ))}

            <button type="submit" className={styles.submitButton}>
              Submit Quiz
            </button>
          </form>
        )}

        {submitted && (
          <div className={styles.resultContainer}>
            <h3 className={styles.resultScore}>
              Your Score: {score} / {questions.length}
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default TakeQuiz;
