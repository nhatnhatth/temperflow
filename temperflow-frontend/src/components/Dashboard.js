import React, { useEffect, useState } from "react";
import axios from "axios";

const questions = [
  { id: 1, question_text: "What is your current anger level (1–10)?", type: "level" },
  { id: 2, question_text: "How many minutes are you willing to spend to calm down?", type: "time" },
  { id: 3, question_text: "Where are you currently located?", type: "where" },
  { id: 4, question_text: "Select the emotions you are currently feeling (e.g., happy, sad, anxious, calm)", type: "choice" },
];

const cardStyles = {
  sessionCard: {
    backgroundColor: "#E6FFFA",
    border: "1px solid #4FB7B3",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  itemCard: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #4FB7B3",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  sessionTitle: {
    fontSize: "20px",
    color: "#4FB7B3",
    fontWeight: "600",
    marginBottom: "15px",
  },
  questionText: {
    fontWeight: "500",
    marginBottom: "5px",
  },
  answerText: {
    color: "#555",
  },
};

const dashboardStyle = {
  minHeight: "100vh",
  padding: "40px",
  backgroundImage:
    "url('https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/hinh-nen-may-tinh-chill/2905_hinh-nen-may-tinh-sieu-chill-sac-net-4K.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const backButtonStyle = {
  backgroundColor: "#4FB7B3",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "14px",
  marginBottom: "20px",
};

const Dashboard = ({ userId }) => {
  const [surveyData, setSurveyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchSurveyAnswers = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/survey/user/${user.id}/answers`
        );

        const answers = res.data;
        const sessionsMap = {};

        answers.forEach((a, index) => {
          const sessionId = a.answered_at || index;
          if (!sessionsMap[sessionId]) {
            sessionsMap[sessionId] = {
              answered_at: a.answered_at,
              answers: [],
            };
          }
          sessionsMap[sessionId].answers.push(a);
        });

        const sessions = Object.values(sessionsMap).sort(
          (a, b) => new Date(b.answered_at) - new Date(a.answered_at)
        );

        setSurveyData(sessions);
      } catch (err) {
        console.error("Failed to fetch survey answers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyAnswers();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (surveyData.length === 0) return <div>No survey data found.</div>;

  return (
    <div style={dashboardStyle}>
      {/* 🔙 BACK BUTTON */}
      <button
        style={backButtonStyle}
        onClick={() => window.history.back()}
        onMouseOver={(e) => (e.target.style.opacity = "0.8")}
        onMouseOut={(e) => (e.target.style.opacity = "1")}
      >
        ← Back
      </button>

      <h1
        style={{
          fontSize: "28px",
          fontWeight: "700",
          marginBottom: "30px",
          color: "#fff",
          textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
        }}
      >
        Dashboard - User {userId}
      </h1>

      {surveyData.map((session, idx) => (
        <div key={idx} style={cardStyles.sessionCard}>
          <div style={cardStyles.sessionTitle}>
            Session at: {new Date(session.answered_at).toLocaleString()}
          </div>

          {session.answers.map((a, i) => {
            const q = questions.find((q) => q.id === a.question_id);
            const answerDisplay =
              typeof a.answer === "object"
                ? JSON.stringify(a.answer)
                : a.answer;

            return (
              <div key={i} style={cardStyles.itemCard}>
                <div style={cardStyles.questionText}>
                  {q ? q.question_text : `Question ${a.question_id}`}
                </div>
                <div style={cardStyles.answerText}>{answerDisplay}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
