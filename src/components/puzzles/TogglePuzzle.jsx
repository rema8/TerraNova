import React, { useState } from "react";

export default function TogglePuzzle({ data, onSolve }) {
  const [state, setState] = useState([0, 0, 0, 0, 0, 0]);
  const [msg, setMsg] = useState("");

  const toggle = (i) => {
    const copy = [...state];
    copy[i] = copy[i] ? 0 : 1;
    setState(copy);
  };

  const check = () => {
    if (JSON.stringify(state) === JSON.stringify(data.pattern)) {
      setMsg("Système stabilisé !");
      setTimeout(() => onSolve({ success: true }), 500);
    } else {
      setMsg("Mauvaise combinaison !");
    }
  };

  return (
    <div>
      <p>{data.prompt}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        {state.map((v, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            style={{
              width: 40,
              height: 80,
              background: v ? "#4caf50" : "#555",
              cursor: "pointer",
              borderRadius: 6,
              transition: "0.3s",
            }}
          />
        ))}
      </div>
      <button
        onClick={check}
        style={{
          marginTop: 15,
          background: "#1e6f5c",
          color: "#fff",
          padding: "8px 12px",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Valider
      </button>
      <div style={{ marginTop: 8 }}>{msg}</div>
    </div>
  );
}
