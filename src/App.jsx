// src/App.jsx
import React from "react";
import PhaserGame from "./components/PhaserGame.jsx";
import PuzzleModal from "./components/PuzzleModal.jsx";

export default function App() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 12,
        padding: 12,
        fontFamily: "Inter, system-ui, sans-serif",
        backgroundColor: "#012b27",
        color: "#dfffe8",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>TerraNova 2045 — Escape Game</h1>
        <small>Prototype React + Phaser</small>
      </header>

      <PhaserGame />

      {/*Ajout du modal ici */}
      <PuzzleModal />

      <footer style={{ opacity: 0.7 }}>
        <p style={{ margin: 0 }}>
          Astuce : cliquez sur la console inondation dans la salle Venise pour
          résoudre une énigme.
        </p>
      </footer>
    </div>
  );
}
