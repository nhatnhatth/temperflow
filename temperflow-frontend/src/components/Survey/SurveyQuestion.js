import React, { useState } from "react";

const SurveyQuestion = ({ question, value, onChange }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const angerLevels =
    question.question_text === "Mức độ tức giận hiện tại của bạn (1–10)"
      ? [
          "1 - Hoàn toàn bình tĩnh, không tức giận",
          "2 - Hơi khó chịu, bực nhẹ",
          "3 - Khó chịu rõ ràng nhưng vẫn kiểm soát tốt",
          "4 - Bực bội, bắt đầu mất kiên nhẫn",
          "5 - Tức giận vừa phải, có thể nổi cáu nhưng vẫn kiềm được",
          "6 - Giận khá nhiều, cảm thấy muốn phản ứng mạnh",
          "7 - Rất giận, khó kiềm chế cảm xúc",
          "8 - Tức giận dữ dội, dễ mất kiểm soát",
          "9 - Tức giận cực độ, gần như bùng nổ",
          "10 - Giận điên người, mất kiểm soát hoàn toàn",
        ]
      : [];

  return (
    <div style={{ marginBottom: "20px", position: "relative", textAlign: "left" }}>
      <label
        style={{
          display: "block",
          fontWeight: "600",
          marginBottom: "8px",
          color: "#31326F",
          cursor: angerLevels.length ? "pointer" : "default",
        }}
        onMouseEnter={() => angerLevels.length && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {question.question_text}
      </label>

      {showTooltip && (
        <div
          style={{
            position: "absolute",
            top: "28px",
            left: 0,
            background: "rgba(255,255,255,0.95)",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            width: "300px",
            fontSize: "14px",
            lineHeight: "1.4",
            zIndex: 10,
          }}
        >
          {angerLevels.map((level, index) => (
            <div key={index}>{level}</div>
          ))}
        </div>
      )}

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
