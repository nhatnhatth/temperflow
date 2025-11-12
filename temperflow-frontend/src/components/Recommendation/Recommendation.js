import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "./TaskCard";

const Recommendation = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState([]);
  const navigate = useNavigate();

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
      .then((data) => setTasks(data || []))
      .catch((err) => {
        console.error("Fetch recommendations error:", err);
        setTasks([]);
      })
      .finally(() => setLoading(false));
  }, [user]);

  // Khi task hoàn thành
  const handleCompleteTask = (taskId) => {
    setCompletedTasks((prev) => [...prev, taskId]);
  };

  // Tự động redirect khi tất cả task hoàn thành
  useEffect(() => {
    console.log(completedTasks)
    console.log(tasks)
    if (tasks.length > 0 && completedTasks.length === tasks.length) {
      navigate("/motivation"); // sang màn Motivation
    }
  }, [completedTasks, tasks, navigate]);

  // Thêm logic onStart: sau khi bấm Bắt đầu -> giả lập hoàn thành task sau duration phút
  const handleStartTask = (task) => {
    alert(`Bắt đầu task: ${task.title}`);
    // Giả lập xong task sau task.duration phút (chỉ demo)
    setTimeout(() => handleCompleteTask(task.id), task.duration * 60000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #A8FBD3, #637AB9)",
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
    </div>
  );
};

export default Recommendation;
