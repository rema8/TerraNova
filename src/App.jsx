// src/App.jsx
import React from "react";
import PhaserGame from "./components/PhaserGame.jsx";
import PuzzleModal from "./components/PuzzleModal.jsx";
import BadgeDisplay from "./components/BadgeDisplay.jsx";

export default function App() {
  return (
    // Conteneur principal de l'application
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 12,
        padding: 12,
        fontFamily: "Inter, system-ui, sans-serif",
        backgroundColor: "#012b27", // Fond sombre de l'UI
        color: "#dfffe8", // Texte clair
        minHeight: "100vh",
        position: "relative", // Pour que BadgeDisplay se positionne correctement en absolute
      }}
    >
      {/* 1. Header (Titre) */}
      <header
        style={{
          display: "flex",
          justifyContent: "center", // Centre le titre
          alignItems: "center",
          paddingBottom: "10px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.5em", color: "#66ffcc" }}>
          🌍 TerraNova 2045 — Escape Game
        </h1>
      </header>
      
      {/* 2. Suivi des Badges (Flotte en haut à droite) */}
      {/* Le BadgeDisplay a un style 'position: absolute' interne pour se placer sur le coin */}
      <BadgeDisplay /> 

      {/* 3. Zone de jeu Phaser (Le Canvas) */}
      <div 
        style={{
            border: "4px solid #1e6f5c", // Bordure pour encadrer le jeu
            borderRadius: "8px",
            overflow: "hidden", // Assure que le jeu reste dans les limites
            // Le Canvas de Phaser prendra la taille restante
        }}
      >
        <PhaserGame />
      </div>

      {/* 4. Modale (S'affiche par-dessus tout quand nécessaire) */}
      <PuzzleModal />

      {/* 5. Footer (Pied de page optionnel) */}
      <footer style={{ opacity: 0.5, fontSize: "0.8em", textAlign: "center", marginTop: "10px" }}>
        {/* Enlevez l'ancienne phrase d'astuce ici s'il y en avait une. */}
        © 2045 Projet TerraNova - Centre de Commandement 
      </footer>
    </div>
  );
}