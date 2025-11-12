import React from "react";

const SurveyQuestion = ({ question, value, onChange }) => {
  return (
    <div style={{ marginBottom: "20px", textAlign: "left" }}>
      <label
        style={{
          display: "block",
          fontWeight: "600",
          marginBottom: "8px",
          color: "#31326F",
        }}
      >
        {question.question_text}
      </label>

      {question.type === "number" && (
        <input
          type="number"
          value={value || ""}
          onChange={(e) => onChange(question.id, e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "15px",
          }}
        />
      )}

      {question.type === "text" && (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(question.id, e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "15px",
          }}
        />
      )}

      {question.type === "choice" && (
        <textarea
          rows="3"
          placeholder="Nhập cảm xúc của bạn..."
          value={value || ""}
          onChange={(e) => onChange(question.id, e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "15px",
            resize: "none",
          }}
        />
      )}
    </div>
  );
};

export default SurveyQuestion;
