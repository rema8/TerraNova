// src/components/PuzzleModal.jsx
import DragDropPuzzle from "./puzzles/DragDropPuzzle";
import React, { useEffect, useState } from "react";
import { puzzleManager } from "../game/systems/puzzleManager";
import TogglePuzzle from "./puzzles/TogglePuzzle";
// AJOUTER L'IMPORT POUR LE QUIZ
import QuizPuzzle from "./puzzles/QuizPuzzles"; 

export default function PuzzleModal() {
  const [puzzle, setPuzzle] = useState(null);

  useEffect(() => {
    const open = (data) => setPuzzle(data);
    const close = () => setPuzzle(null);
    puzzleManager.on("open", open);
    puzzleManager.on("close", close);

    return () => {
      puzzleManager.off("open", open);
      puzzleManager.off("close", close);
    };
  }, []);

  if (!puzzle) return null;

  const handleSolve = (result) => {
    if (result.success) {
      alert("Énigme réussie !");
      puzzleManager.closePuzzle();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "#0b2d25",
          padding: 30,
          borderRadius: 12,
          width: "420px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h3>{puzzle.data.title}</h3>
        {/* NOUVELLE CONDITION POUR AFFICHER LE QUIZ */}
        {puzzle.data.type === "quiz" && (
          <QuizPuzzle data={puzzle.data} onSolve={handleSolve} />
        )}
        {puzzle.data.type === "dragdrop" && (
          <DragDropPuzzle data={puzzle.data} onSolve={handleSolve} />
        )}
        {puzzle.data.type === "toggle" && (
          <TogglePuzzle data={puzzle.data} onSolve={handleSolve} />
        )}

        <button
          onClick={() => puzzleManager.closePuzzle()}
          style={{
            marginTop: 15,
            padding: "6px 12px",
            background: "#1e6f5c",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}