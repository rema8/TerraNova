import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { gameConfig } from '../game/config/gameConfig.js'
import BootScene from '../game/scenes/BootScene.js'
import PreloadScene from '../game/scenes/PreloadScene.js'
import HubScene from '../game/scenes/HubScene.js'
import VeniceScene from '../game/scenes/VeniceScene.js'
import MarocScene from '../game/scenes/MarocScene.js' 
import KenyaScene from '../game/scenes/KenyaScene.js'
import AmazonieScene from '../game/scenes/AmazonieScene.js' 
import UIOverlayScene from '../game/scenes/UIOverlayScene.js'

export default function PhaserGame() {
  const containerRef = useRef(null)
  const gameRef = useRef(null)

  useEffect(() => {
    const config = {
      ...gameConfig,
      parent: containerRef.current,
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
  }, [])

  return (
    <div 
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(180deg, #001a14 0%, #003d30 100%)"
      }}
    >
      <div 
        ref={containerRef} 
        style={{ 
          width: gameConfig.width, 
          height: gameConfig.height, 
          border: "2px solid #1e6f5c", 
          borderRadius: "12px", 
          boxShadow: "0 0 20px #00ffcc55",
          overflow: "hidden"
        }} 
      />
    </div>
  )
}
