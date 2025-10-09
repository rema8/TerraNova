import React from "react";
import PhaserGame from "./components/PhaserGame.jsx";
import PuzzleModal from "./components/PuzzleModal.jsx";
import BadgeDisplay from "./components/BadgeDisplay.jsx";

export default function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #001a14 0%, #003d30 100%)",
        overflow: "hidden",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#eafff3",
      }}
    >
      {/* === En-tête === */}
      <header
        style={{
          textAlign: "center",
          padding: "0.5rem 0",
          background: "rgba(0, 40, 30, 0.7)",
          borderBottom: "2px solid #1e6f5c",
          flex: "0 0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.2rem, 2vw, 2rem)",
            color: "#66ffcc",
            textShadow: "0 0 8px #00ffcc55",
            margin: 0,
          }}
        >
          🌍 TerraNova 2045 — Escape Game
        </h1>
      </header>

      {/* === Zone de jeu === */}
      <main
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at center, #002b22 0%, #001a14 100%)",
        }}
      >
        {/* Jeu Phaser plein écran */}
        <div
          id="game-container"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <PhaserGame />
        </div>

        {/* Badges affichés au-dessus */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "20px",
            zIndex: 10,
          }}
        >
          <BadgeDisplay />
        </div>

        {/* Modale des énigmes */}
        <PuzzleModal />
      </main>

      {/* === Pied de page === */}
      <footer
        style={{
          textAlign: "center",
          padding: "0.5rem 0",
          fontSize: "0.9rem",
          background: "rgba(0, 40, 30, 0.7)",
          borderTop: "2px solid #1e6f5c",
          color: "#aef5d2",
          flex: "0 0 auto",
        }}
      >
        © 2045 — Projet TerraNova 🌱 Sauvez la planète
      </footer>
    </div>
  );
}
