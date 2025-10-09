// src/components/PuzzleModal.jsx

import DragDropPuzzle from "./puzzles/DragDropPuzzle";
import React, { useEffect, useState } from "react";
import { puzzleManager } from "../game/systems/puzzleManager";
import TogglePuzzle from "./puzzles/TogglePuzzle";
import QuizPuzzle from "./puzzles/QuizPuzzle"; 
// 🚨 NOUVEL IMPORT
import LetterPuzzle from "./puzzles/LetterPuzzle";
import { badgeManager } from "../game/systems/BadgeManager"; 

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

  // 🚨 NOTA BENE: onSolve est géré dans chaque puzzle, 
  // on appelle onSolve({ success: true }) pour débloquer le badge et fermer la modale.
  const handleSolve = (result) => {
    if (result.success) {
      const { id: puzzleId, badgeId } = puzzle.data;
      
      // La résolution du puzzle est gérée par le composant de puzzle lui-même (ex: QuizPuzzle)
      // On s'assure que le badge est débloqué ici avant de fermer.
      badgeManager.solvePuzzle(puzzleId, badgeId);
      
      puzzleManager.closePuzzle();
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
      }}
    >
      <div
        style={{
          background: "#0b2d25", padding: 30, borderRadius: 12,
          width: "420px", color: "#fff", textAlign: "center",
        }}
      >
        <h3>{puzzle.data.title}</h3>
        
        {puzzle.data.type === "quiz" && (
          <QuizPuzzle data={puzzle.data} onSolve={handleSolve} />
        )}
        {puzzle.data.type === "dragdrop" && (
          <DragDropPuzzle data={puzzle.data} onSolve={handleSolve} />
        )}
        {puzzle.data.type === "toggle" && (
          <TogglePuzzle data={puzzle.data} onSolve={handleSolve} />
        )}
        {/* 🚨 NOUVEAU TYPE DE PUZZLE */}
        {puzzle.data.type === "letterpuzzle" && (
          <LetterPuzzle data={puzzle.data} onSolve={handleSolve} />
        )}

        {/* Le bouton Fermer est gardé en dehors du composant spécifique pour l'uniformité */}
        <button
          onClick={() => puzzleManager.closePuzzle()}
          style={{
            marginTop: 15, padding: "6px 12px", background: "#1e6f5c",
            color: "#fff", border: "none", borderRadius: 8, cursor: "pointer",
          }}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}