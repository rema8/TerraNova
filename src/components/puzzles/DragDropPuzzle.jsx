// src/components/puzzles/DragDropPuzzle.jsx
import React, { useState } from "react";

/**
 * Drag & Drop très simple : on propose items à associer à des cibles.
 * Exemple de data :
 * {
 *  id: "venice-dnd-1",
 *  type: "dragdrop",
 *  title: "...",
 *  prompt: "...",
 *  items: [{ id:"jaguar", label:"Jaguar" }, ...],
 *  targets: [{ id:"sous-bois", accept:["jaguar"] }, ...]
 * }
 *
 * Implémentation non-native drag : click item -> click target
 */
export default function DragDropPuzzle({ data, onSolve }) {
  const [selected, setSelected] = useState(null);
  const [assign, setAssign] = useState({}); // targetId -> itemId
  const [msg, setMsg] = useState("");

  const pickItem = (itemId) => setSelected(itemId);

  const dropTo = (targetId) => {
    if (!selected) return;
    const a = { ...assign, [targetId]: selected };
    setAssign(a);
    setSelected(null);
  };

  const check = () => {
    const ok = data.targets.every(t => {
      const assigned = assign[t.id];
      return assigned && t.accept.includes(assigned);
    });
    if (ok) {
      setMsg("🎉 Bien joué !");
      setTimeout(() => onSolve({ success: true }), 300);
    } else {
      setMsg("Pas encore correct.");
    }
  };

  return (
    <div>
      <p style={{ color: "#dfffe8" }}>{data.prompt}</p>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: "6px 0", color: "#9fe3c6" }}>Objets</h4>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {data.items.map(it => (
              <button
                key={it.id}
                onClick={() => pickItem(it.id)}
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  background: selected === it.id ? "#cdeedd" : "#0b2d25",
                  color: "#dfffe8",
                  border: "1px solid #1e6f5c",
                  cursor: "pointer"
                }}>
                {it.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h4 style={{ margin: "6px 0", color: "#9fe3c6" }}>Zones</h4>
          <div style={{ display: "grid", gap: 10 }}>
            {data.targets.map(t => (
              <div key={t.id} onClick={() => dropTo(t.id)} style={{
                padding: 12, borderRadius: 8, minHeight: 48, background: "#073c31",
                color: "#dfffe8", border: "1px dashed #1e6f5c", cursor: "pointer"
              }}>
                <div style={{ fontSize: 14 }}>{t.label}</div>
                <div style={{ fontSize: 13, marginTop: 6, color: "#9fe3c6" }}>
                  {assign[t.id]
                    ? data.items.find(x => x.id === assign[t.id]).label
                    : "—"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={check} style={{ padding: "8px 12px", borderRadius: 8 }}>Valider</button>
        <div style={{ marginTop: 8, color: "#ffd" }}>{msg}</div>
      </div>
    </div>
  );
}
