import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { gameConfig } from '../game/config/gameConfig.js'
// ... Vos imports de scènes ...
import BootScene from '../game/scenes/BootScene.js'
import PreloadScene from '../game/scenes/PreloadScene.js'
import HubScene from '../game/scenes/HubScene.js'
import VeniceScene from '../game/scenes/VeniceScene.js'
import MarocScene from '../game/scenes/MarocScene.js' 
import KenyaScene from '../game/scenes/KenyaScene.js'
import AmazonieScene from '../game/scenes/AmazonieScene.js' 
import UIOverlayScene from '../game/scenes/UIOverlayScene.js'

// ⬅️ Accepter 'socket' et 'username' en props
export default function PhaserGame({ socket, username }) {
  const containerRef = useRef(null)
  const gameRef = useRef(null)

  // Utilisez le socket ici
  useEffect(() => {
    // Si le jeu existe déjà, ne le recrée pas.
    if (gameRef.current) return;

    const config = {
      ...gameConfig,
      parent: containerRef.current,
      // ⬅️ Ajouter des données globales pour les scènes
      callbacks: {
        postBoot: function (game) {
          game.socket = socket;        // Rendre le socket accessible via game.socket
          game.username = username;    // Rendre le pseudo accessible via game.username
        },
      },
      scene: [
        BootScene, 
        PreloadScene, 
        HubScene, 
        VeniceScene, 
        UIOverlayScene, 
        MarocScene,
        KenyaScene,
        AmazonieScene
      ],
    }

    gameRef.current = new Phaser.Game(config)

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
    // ⬅️ Le jeu ne doit se lancer qu'une seule fois après la connexion (quand socket est non-null)
  }, [socket, username]) 

  return (
    <div 
      style={{
        /* ... Vos styles ... */
        width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(180deg, #001a14 0%, #003d30 100%)"
      }}
    >
      <div 
        ref={containerRef} 
        style={{ 
          /* ... Vos styles ... */
          width: gameConfig.width, height: gameConfig.height, border: "2px solid #1e6f5c", borderRadius: "12px", boxShadow: "0 0 20px #00ffcc55", overflow: "hidden"
        }} 
      />
    </div>
  )
}