import React, { useState } from "react";

const SurveyQuestion = ({ question, value, onChange }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const angerLevels =
    question.type === "level"
      ? [
          "1 - Completely calm, no anger at all",
          "2 - Slightly annoyed, mild irritation",
          "3 - Clearly annoyed but still in control",
          "4 - Irritated, starting to lose patience",
          "5 - Moderately angry, may snap but still holding back",
          "6 - Quite angry, feeling the urge to react strongly",
          "7 - Very angry, emotions are hard to control",
          "8 - Extremely angry, easily losing control",
          "9 - Furious, on the verge of exploding",
          "10 - Enraged, completely out of control",
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

      {question.type === "level" && (
        <input
          type="number"
          min={1}
          max={10}
          value={value || ""}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if ((val >= 1 && val <= 10) || e.target.value === "") {
              onChange(question.id, e.target.value === "" ? "" : val);
            }
          }}
          placeholder="Enter a number from 1 to 10"
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

      {question.type === "time" && (
        <input
          type="number"
          min={1}
          value={value || ""}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if ((val >= 1) || e.target.value === "") {
              onChange(question.id, e.target.value === "" ? "" : val);
            }
          }}
          placeholder="Enter time in minutes"
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

      {question.type === "where" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <select
            value={
              ["school", "company", "home", "outside"].includes(value) ? value : "other"
            }
            onChange={(e) => {
              const selected = e.target.value;
              if (selected === "other") {
                onChange(question.id, "");
              } else {
                onChange(question.id, selected);
              }
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "15px",
            }}
          >
            <option value="">Select location</option>
            <option value="school">School</option>
            <option value="company">Company</option>
            <option value="home">Home</option>
            <option value="outside">Outside</option>
            <option value="other">Other</option>
          </select>

          {}
          {(
            ["school", "company", "home", "outside"].includes(value) === false
          ) && (
            <input
              type="text"
              placeholder="Enter your location"
              value={value}
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
        </div>
      )}

      {question.type === "choice" && (
        <textarea
          rows="3"
          placeholder="Enter your emotions..."
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
