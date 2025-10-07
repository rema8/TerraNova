import React from 'react'
import PhaserGame from './components/PhaserGame.jsx'

export default function App() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, padding: 12, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>TerraNova 2045 — Escape Game</h1>
        <small>Prototype React + Phaser</small>
      </header>

      <PhaserGame />

      <footer style={{ opacity: 0.7 }}>
        <p style={{ margin: 0 }}>Astuce : cliquez sur la console inondation dans la salle Venise pour résoudre une mini-énigme.</p>
      </footer>
    </div>
  )
}
