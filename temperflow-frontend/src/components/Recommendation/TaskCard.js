import React, { useState, useEffect, useRef } from "react";

const TaskCard = ({ task, onStart, onComplete }) => {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(task.duration * 60); // phút → giây
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef(null);

  // Bắt đầu task
  const handleStart = () => {
    setStarted(true);
    onStart(task);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCompleted(true);
          onComplete && onComplete(task.id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Kết thúc task sớm
  const handleEndEarly = () => {
    clearInterval(timerRef.current);
    onComplete && onComplete(task.id);
    setCompleted(true);
    setTimeLeft(0);
  };

  // Hiển thị thời gian dạng mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{task.title}</h3>
      <p style={styles.description}>{task.description}</p>
      <p style={styles.meta}>
        <strong>Thời gian:</strong> {task.duration} phút | <strong>Loại:</strong> {task.type}
      </p>

      {!started && !completed && (
        <button style={styles.button} onClick={handleStart}>
          Bắt đầu
        </button>
      )}

      {started && !completed && (
        <div>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            ⏱ {formatTime(timeLeft)}
          </p>
          <button style={styles.endButton} onClick={handleEndEarly}>
            Kết thúc sớm
          </button>
        </div>
      )}

      {completed && (
        <button style={styles.completeButton} onClick={() => alert("Task hoàn thành ✅")}>
          Hoàn thành
        </button>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#E6FFFA",
    border: "1px solid #4FB7B3",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "15px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  title: { fontSize: "20px", color: "#4FB7B3", marginBottom: "10px" },
  description: { marginBottom: "10px" },
  meta: { fontSize: "14px", color: "#555", marginBottom: "10px" },
  button: {
    padding: "8px 16px",
    backgroundColor: "#4FB7B3",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  endButton: {
    padding: "6px 12px",
    backgroundColor: "#FF6B6B",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
  completeButton: {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default TaskCard;
