import React, { useState } from "react";
// Assurez-vous d'avoir installé socket.io-client: npm install socket.io-client
import { io } from "socket.io-client"; 
import PhaserGame from "./components/PhaserGame.jsx";
import PuzzleModal from "./components/PuzzleModal.jsx";
import BadgeDisplay from "./components/BadgeDisplay.jsx";
import Chat from "./components/Chat.jsx"; // ⬅️ On va créer ce composant

// Composant pour l'écran de connexion
function LoginScreen({ onLogin }) {
  const [inputPseudo, setInputPseudo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation simple
    if (inputPseudo.trim().length < 2) {
        alert("Le pseudo doit contenir au moins 2 caractères.");
        return;
    }
    onLogin(inputPseudo.trim());
  };

  return (
    <div 
        style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            background: 'rgba(0, 40, 30, 0.9)', padding: '40px', borderRadius: '10px',
            boxShadow: '0 0 20px #00ffcc55', zIndex: 999, color: '#eafff3'
        }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2>Connexion à TerraNova 2045</h2>
        <input 
          type="text" 
          placeholder="Votre Pseudo (minimum 2 caractères)" 
          value={inputPseudo}
          onChange={(e) => setInputPseudo(e.target.value)}
          required
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '5px', border: 'none', color: '#001a14' }}
        />
        <button 
            type="submit"
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '5px', border: 'none', background: '#66ffcc', color: '#001a14', cursor: 'pointer' }}
        >
            Commencer le Jeu
        </button>
      </form>
    </div>
  );
}


export default function App() {
  const [username, setUsername] = useState(null);
  const [socket, setSocket] = useState(null);

  const handleLogin = (pseudo) => {
    // 1. Initialiser la connexion Socket.IO en passant le pseudo dans la query
    const newSocket = io({
      query: { username: pseudo }
    });

    // 2. Mettre à jour les états
    setSocket(newSocket);
    setUsername(pseudo);
  };
  
  // Si l'utilisateur n'est pas connecté, afficher l'écran de Login
  if (!username) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Si l'utilisateur est connecté, afficher le jeu complet
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
           /* ... Vos styles ... */
           textAlign: "center", padding: "0.5rem 0", background: "rgba(0, 40, 30, 0.7)", borderBottom: "2px solid #1e6f5c", flex: "0 0 auto",
        }}
      >
        <h1
          style={{
            /* ... Vos styles ... */
            fontSize: "clamp(1.2rem, 2vw, 2rem)", color: "#66ffcc", textShadow: "0 0 8px #00ffcc55", margin: 0,
          }}
        >
          🌍 TerraNova 2045 — Escape Game (Joueur: {username})
        </h1>
      </header>

      {/* === Zone de jeu === */}
      <main
        style={{
            /* ... Vos styles ... */
           flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at center, #002b22 0%, #001a14 100%)",
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
          {/* ⬅️ Passer le socket et le pseudo au composant PhaserGame */}
          <PhaserGame socket={socket} username={username} /> 
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
        
        {/* ⬅️ Intégration du Chat */}
        <Chat socket={socket} username={username} /> 
      </main>

      {/* === Pied de page === */}
      <footer
        style={{
            /* ... Vos styles ... */
           textAlign: "center", padding: "0.5rem 0", fontSize: "0.9rem", background: "rgba(0, 40, 30, 0.7)", borderTop: "2px solid #1e6f5c", color: "#aef5d2", flex: "0 0 auto",
        }}
      >
        © 2045 — Projet TerraNova 🌱 Sauvez la planète
      </footer>
    </div>
  );
}