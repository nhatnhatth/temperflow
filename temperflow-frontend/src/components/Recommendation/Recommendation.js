import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // ✅ import thư viện
import TaskCard from "./TaskCard";
import UserInfoPopover from "../Survey/UserInfoPopover";


const Recommendation = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState([]);
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useState(user || null);

  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("user");
      if (stored) setLocalUser(JSON.parse(stored));
    }
  }, [user]);

  // Lấy gợi ý task từ API
  useEffect(() => {
    if (!user) return;

    setLoading(true);

    const surveyAnswers = JSON.parse(localStorage.getItem("latestSurvey")) || {};

    fetch("http://127.0.0.1:8000/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        anger_level: surveyAnswers[1] || 5,
        free_time: surveyAnswers[2] || 20,
        location: surveyAnswers[3] || "home",
        emotions: [],
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTasks(data || []);
      })
      .catch((err) => {
        console.error("Fetch recommendations error:", err);
        Swal.fire({
          icon: "error",
          title: "Lỗi tải gợi ý 😢",
          text: "Không thể lấy danh sách gợi ý. Vui lòng thử lại sau.",
          confirmButtonText: "OK",
        });
        setTasks([]);
      })
      .finally(() => setLoading(false));
  }, [user]);

  // Khi task hoàn thành
  const handleCompleteTask = (taskId) => {
    setCompletedTasks((prev) => [...prev, taskId]);
  };

  // Khi tất cả task hoàn thành thì sang màn Motivation
  useEffect(() => {
    if (tasks.length > 0 && completedTasks.length === tasks.length) {
      Swal.fire({
        icon: "success",
        title: "Hoàn thành tất cả nhiệm vụ 🎉",
        text: "Tuyệt vời! Cùng xem điều gì chờ bạn tiếp theo nhé.",
        confirmButtonText: "Let's go 🚀",
      }).then(() => {
        navigate("/motivation");
      });
    }
  }, [completedTasks, tasks, navigate]);

  // Khi bấm "Bắt đầu" task
  const handleStartTask = (task) => {
    Swal.fire({
      title: `Bắt đầu nhiệm vụ:`,
      text: `${task.title}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Bắt đầu ngay 💪",
      cancelButtonText: "Để sau",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Đang thực hiện...",
          text: `Hãy dành ${task.duration} phút để hoàn thành nhé!`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        // Giả lập hoàn thành task sau duration phút (chỉ demo)
        setTimeout(() => {
          handleCompleteTask(task.id);
          Swal.fire({
            icon: "success",
            title: "Hoàn thành nhiệm vụ ✅",
            text: `${task.title} đã được đánh dấu là hoàn thành!`,
            timer: 2000,
            showConfirmButton: false,
          });
        }, task.duration * 60000);
      }
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #A8FBD3, #637AB9)",
        backgroundImage:
          "url(https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "30px",
          textAlign: "center",
          color: "#31326F",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#4FB7B3" }}>
          Gợi ý việc nên làm hôm nay
        </h2>

        {loading && <p>Đang tải gợi ý...</p>}
        {!loading && tasks.length === 0 && <p>Chưa có nhiệm vụ nào phù hợp.</p>}

        {!loading &&
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStart={handleStartTask}
              onComplete={handleCompleteTask}
            />
          ))}
      </div>
      <UserInfoPopover
        user={localUser}
        onLogout={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      />

    </div>
  );
};

export default Recommendation;
