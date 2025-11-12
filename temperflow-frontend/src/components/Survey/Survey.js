import React, { useState, useEffect } from "react";
import SurveyQuestion from "./SurveyQuestion";
import UserInfoPopover from "./UserInfoPopover";

const Survey = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Load user từ localStorage khi mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Lấy danh sách câu hỏi
  useEffect(() => {
    fetch("http://127.0.0.1:8000/survey/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (!user) return alert("User not found!");

    // Kiểm tra tất cả câu hỏi đã điền chưa
    const unanswered = questions.filter(q => !answers[q.id] && answers[q.id] !== 0);
    if (unanswered.length > 0) {
      alert("Vui lòng điền đầy đủ tất cả các câu hỏi trước khi gửi phản hồi!");
      return;
    }

    fetch("http://127.0.0.1:8000/survey/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, answers }),
    })
      .then(res => res.json())
      .then(() => {
        localStorage.setItem("latestSurvey", JSON.stringify(answers));
        alert("Cảm ơn bạn đã hoàn thành khảo sát 💚");
        window.location.href = "/recommendations";
      })
      .catch(err => console.error("Submit error:", err));
  };


  if (loading) return <p>Loading survey...</p>;

  return (
    <div
      style={{
        position: "relative", // để popover avatar hiển thị đúng
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #A8FBD3, #637AB9)",
        backgroundImage:
          "url(https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        margin: 0,
      }}
    >
      {/* Survey Form */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "40px",
          textAlign: "center",
          color: "#31326F",
        }}
      >
        <h2 style={{ marginBottom: "30px", color: "#4FB7B3" }}>
          🧠 Temperflow Survey
        </h2>

        {questions.map((q) => (
          <SurveyQuestion
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={handleChange}
          />
        ))}

        <button
          onClick={handleSubmit}
          style={{
            marginTop: "30px",
            backgroundColor: "#4FB7B3",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "30px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#637AB9")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4FB7B3")}
        >
          Gửi phản hồi 💬
        </button>
      </div>

      {/* Avatar + Popover */}
      <UserInfoPopover
        user={user}
        onLogout={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      />
    </div>
  );
};

export default Survey;
