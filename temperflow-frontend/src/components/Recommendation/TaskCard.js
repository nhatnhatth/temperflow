import React, { useState, useRef } from "react";
import Swal from "sweetalert2";

const TaskCard = ({ task, onStart, onComplete }) => {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(task.duration * 60); 
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef(null);

  const handleStart = () => {
    Swal.fire({
      title: "Start this task?",
      text: `You are about to start: "${task.title}" (${task.duration} minutes)`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Start now 💪",
      cancelButtonText: "Maybe later",
    }).then((result) => {
      if (result.isConfirmed) {
        setStarted(true);
        onStart(task);

        Swal.fire({
          title: "In progress...",
          text: "Good luck completing the task!",
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
                title: "Task completed ✅",
                text: `"${task.title}" is done!`,
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
      title: "End early?",
      text: "Are you sure you want to stop this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, end it 😅",
      cancelButtonText: "Keep going",
    }).then((result) => {
      if (result.isConfirmed) {
        clearInterval(timerRef.current);
        onComplete && onComplete(task.id);
        setCompleted(true);
        setTimeLeft(0);
        Swal.fire({
          icon: "info",
          title: "Ended early",
          text: `"${task.title}" has been marked as completed.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{task.title}</h3>
      <p style={styles.description}>{task.description}</p>
      <p style={styles.meta}>
        <strong>Duration:</strong> {task.duration} min |{" "}
        <strong>Type:</strong> {task.type}
      </p>

      {!started && !completed && (
        <button style={styles.button} onClick={handleStart}>
          Start
        </button>
      )}

      {started && !completed && (
        <div>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            ⏱ {formatTime(timeLeft)}
          </p>
          <button style={styles.endButton} onClick={handleEndEarly}>
            End Early
          </button>
        </div>
      )}

      {completed && (
        <button
          style={styles.completeButton}
          onClick={() =>
            Swal.fire({
              icon: "success",
              title: "Task Completed 🎉",
              text: `"${task.title}" has been marked as completed!`,
              confirmButtonText: "OK",
            })
          }
        >
          Completed
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
