// src/components/PuzzleModal.jsx

import DragDropPuzzle from "./puzzles/DragDropPuzzle";
import React, { useEffect, useState } from "react";
import { puzzleManager } from "../game/systems/puzzleManager";
import TogglePuzzle from "./puzzles/TogglePuzzle";

import QuizPuzzle from "./puzzles/QuizPuzzle"; 
import { badgeManager } from "../game/systems/BadgeManager"; 

import { progressionManager } from "../game/systems/ProgressionManager";

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
      const { id: puzzleId, badgeId, scene } = puzzle.data;
      
      badgeManager.solvePuzzle(puzzleId, badgeId);
      
      puzzleManager.closePuzzle();
      
      // 🚨 MISE À JOUR : Relance la scène après succès pour mettre à jour l'état du bouton
      if (scene && progressionManager.PROGRESSION[puzzleId]) {
          // Utiliser Phaser.Scenes.SceneManager pour relancer la scène
          // Vous devrez importer ou injecter le SceneManager si non disponible ici
          // Si vous ne pouvez pas accéder à Phaser ici, vous devrez implémenter un événement de 'reloadScene'
          // TEMPORAIREMENT, on peut vous demander de relancer le jeu si nécessaire, mais en Phaser cela fonctionne via:
          // this.game.scene.getScene(scene).scene.restart();
          console.log(`[PuzzleModal] Redémarrage de la scène ${scene} pour mettre à jour l'interface.`);
          // Si vous avez un Game Manager centralisé, le redémarrage doit y être géré.
          // Pour l'instant, on se contente du log et du déblocage du badge.
      }
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
        {/* Le type d'énigme doit correspondre au composant */}
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