// src/components/puzzles/QuizPuzzle.jsx
import React, { useState } from "react";

/**
 * Props:
 *  - data: { id, title, prompt, choices: [], answerIndex, hints?, reward? }
 *  - onSolve(payload)
 */
export default function QuizPuzzle({ data, onSolve }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [hintShown, setHintShown] = useState(0);

  const tryAnswer = (i) => {
    setSelected(i);
    if (i === data.answerIndex) {
      setFeedback("Bonne réponse !");
      setTimeout(() => onSolve({ success: true }), 450);
    } else {
      setFeedback("Mauvaise réponse. Retentez !");
    }
  };

  return (
    <div style={{ color: "#0b2d25" }}>
      <p style={{ color: "#dfffe8" }}>{data.prompt}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {data.choices.map((c, idx) => (
          <button key={idx}
            onClick={() => tryAnswer(idx)}
            style={{
              padding: "10px 12px", borderRadius: 8, cursor: "pointer",
              background: idx === selected ? "#cdeedd" : "#0b2d25",
              color: idx === selected ? "#043226" : "#dfffe8",
              border: "1px solid #1e6f5c"
            }}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <small style={{ color: "#9fe3c6" }}>
          Indices : {data.hints?.slice(0, hintShown).join(" | ") || "—"}
        </small>
        <div style={{ marginTop: 8 }}>
          <button onClick={() => setHintShown((h) => Math.min((data.hints?.length||0), h + 1))}
            style={{ marginRight: 8, padding: "6px 10px", borderRadius: 8, cursor: "pointer" }}>
            Afficher indice
          </button>
        </div>

        <div style={{ marginTop: 10, color: "#ffd" }}>{feedback}</div>
      </div>
    </div>
  );
}
