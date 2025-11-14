import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

const TaskCard = ({ task, onStart, onComplete }) => {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(task.duration * 60); 
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef(null);

  const handleStart = () => {
    Swal.fire({
      title: "Bắt đầu nhiệm vụ?",
      text: `Bạn sắp bắt đầu: "${task.title}" (${task.duration} phút)`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Bắt đầu ngay 💪",
      cancelButtonText: "Để sau",
    }).then((result) => {
      if (result.isConfirmed) {
        setStarted(true);
        onStart(task);

        Swal.fire({
          title: "Đang thực hiện...",
          text: "Chúc bạn hoàn thành thật tốt nhé!",
          icon: "info",
          timer: 1500,
          showConfirmButton: false,
        });

        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              setCompleted(true);
              onComplete && onComplete(task.id);
              Swal.fire({
                icon: "success",
                title: "Hoàn thành nhiệm vụ ✅",
                text: `"${task.title}" đã hoàn tất!`,
                timer: 2000,
                showConfirmButton: false,
              });
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    });
  };

  const handleEndEarly = () => {
    Swal.fire({
      title: "Kết thúc sớm?",
      text: "Bạn có chắc muốn dừng nhiệm vụ này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có, kết thúc luôn 😅",
      cancelButtonText: "Tiếp tục làm",
    }).then((result) => {
      if (result.isConfirmed) {
        clearInterval(timerRef.current);
        onComplete && onComplete(task.id);
        setCompleted(true);
        setTimeLeft(0);
        Swal.fire({
          icon: "info",
          title: "Đã kết thúc sớm",
          text: `"${task.title}" đã được đánh dấu hoàn thành.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

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
        <strong>Thời gian:</strong> {task.duration} phút |{" "}
        <strong>Loại:</strong> {task.type}
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
        <button
          style={styles.completeButton}
          onClick={() =>
            Swal.fire({
              icon: "success",
              title: "Task hoàn thành 🎉",
              text: `"${task.title}" đã được đánh dấu hoàn thành!`,
              confirmButtonText: "OK",
            })
          }
        >
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
