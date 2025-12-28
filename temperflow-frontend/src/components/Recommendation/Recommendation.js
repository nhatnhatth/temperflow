import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TaskCard from "./TaskCard";
import UserInfoPopover from "../Survey/UserInfoPopover";

const Recommendation = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState([]);
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useState(user || null);

  // Load user từ localStorage nếu không có prop
  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("user");
      if (stored) setLocalUser(JSON.parse(stored));
    }
  }, [user]);

  // Fetch task recommendation từ backend
  useEffect(() => {
    if (!localUser) return;

    setLoading(true);

    const surveyAnswers = JSON.parse(localStorage.getItem("latestSurvey")) || {};

    fetch("http://127.0.0.1:8000/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localUser.id,
        anger_level: surveyAnswers[1] || 5,
        free_time: surveyAnswers[2] || 20,
        location: surveyAnswers[3] || "home",
        emotions: surveyAnswers[4] || "none",
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setTasks(data || []))
      .catch((err) => {
        console.error("Fetch recommendations error:", err);
        Swal.fire({
          icon: "error",
          title: "Failed to load recommendations 😢",
          text: "Unable to fetch the recommendation list. Please try again later.",
          confirmButtonText: "OK",
        });
        setTasks([]);
      })
      .finally(() => setLoading(false));
  }, [localUser]);

  const handleCompleteTask = (taskId) => {
    setCompletedTasks((prev) => [...prev, taskId]);
  };

  // Khi hoàn tất tất cả task
  useEffect(() => {
    if (tasks.length > 0 && completedTasks.length === tasks.length - 1) {
      Swal.fire({
        icon: "success",
        title: "All tasks completed 🎉",
        text: "Great! Let's see what’s next for you.",
        confirmButtonText: "Let's go 🚀",
      }).then(() => {
        navigate("/motivation");
      });
    }
  }, [completedTasks, tasks, navigate]);

  const handleStartTask = (task) => {
    Swal.fire({
      title: `Start task:`,
      text: `${task.title}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Start now 💪",
      cancelButtonText: "Later",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "In progress...",
          text: `Please spend ${task.duration} minutes to complete this task!`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          handleCompleteTask(task.id);
          Swal.fire({
            icon: "success",
            title: "Task completed ✅",
            text: `${task.title} has been marked as done!`,
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
          Recommended tasks for today
        </h2>

        {loading && <p>Loading recommendations...</p>}
        {!loading && tasks.length === 0 && <p>No suitable tasks available yet.</p>}

        {!loading &&
          tasks.map((task) => {
            if (task.type === "Assistant") {
              // UI riêng cho Assistant
              return (
                <div
                  key={task.id}
                  style={{
                    background: "linear-gradient(135deg, #FFD194, #D1913C)",
                    color: "#333",
                    padding: "20px",
                    borderRadius: "15px",
                    marginBottom: "15px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ marginBottom: "10px", fontSize: "1.2rem" }}>
                    🧠 {task.title}
                  </h3>
                  <p style={{ fontSize: "1rem", lineHeight: "1.4" }}>
                    {task.description}
                  </p>
                </div>
              );
            } else {
              // Task bình thường
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStart={handleStartTask}
                  onComplete={handleCompleteTask}
                />
              );
            }
          })}
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
