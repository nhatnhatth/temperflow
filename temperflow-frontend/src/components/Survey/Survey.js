import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import SurveyQuestion from "./SurveyQuestion";
import UserInfoPopover from "./UserInfoPopover";

const Survey = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

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
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Không tìm thấy người dùng!",
        text: "Vui lòng đăng nhập lại để tiếp tục.",
      });
      return;
    }

    const unanswered = questions.filter(
      (q) => !answers[q.id] && answers[q.id] !== 0
    );
    if (unanswered.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu câu trả lời",
        text: "Vui lòng điền đầy đủ tất cả các câu hỏi trước khi gửi phản hồi!",
        confirmButtonText: "Điền tiếp",
      });
      return;
    }

    const payload = {
      userId: user.id,
      answers: Object.entries(answers).map(([question_id, answer]) => ({
        question_id: Number(question_id), 
        answer: String(answer),          
      })),
    };

    console.log("Submitting survey payload:", payload); 

    fetch("http://127.0.0.1:8000/survey/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(() => {
        localStorage.setItem("latestSurvey", JSON.stringify(answers));

        Swal.fire({
          icon: "success",
          title: "🎉 Cảm ơn bạn!",
          text: "Khảo sát đã được gửi thành công 💚",
          confirmButtonText: "Đi tới gợi ý",
        }).then(() => {
          window.location.href = "/recommendations";
        });
      })
      .catch((err) => {
        console.error("Submit error:", err);
        Swal.fire({
          icon: "error",
          title: "Lỗi gửi khảo sát",
          text: "Vui lòng thử lại sau!",
        });
      });
  };


  if (loading) return <p>Loading survey...</p>;

  return (
    <div
      style={{
        position: "relative",
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
