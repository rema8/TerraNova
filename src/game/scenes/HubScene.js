// src/game/scenes/HubScene.js
import Phaser from 'phaser'
import { SCENES } from '../constants/scenes'
import { gameState } from '../systems/gameState' 

export default class HubScene extends Phaser.Scene {
  constructor() { 
        super(SCENES.HUB) 
    }

  create() {
    const { width, height } = this.scale
    this.socket = this.game.socket; // Accès au socket
    this.username = this.game.username; // Accès au pseudo
    
    if (this.socket) {
        this.socket.emit('player_join', { name: this.username });
    }

    // Fond
    this.cameras.main.setBackgroundColor('#081210')
    const title = this.add.text(width / 2, 60, 'TerraNova 2045 — Hub', { 
      fontSize: '28px', 
      color: '#c7ffd9', 
      fontFamily: 'monospace' 
    }).setOrigin(0.5)

    // --- Salle Venise ---
    const veniceBtn = this.add.rectangle(width/2, height/2 - 90, 220, 60, 0x1e6f5c).setInteractive({ useHandCursor: true })
    this.add.text(width/2, height/2 - 90, 'Salle : Venise', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5)
    veniceBtn.on('pointerover', () => veniceBtn.setFillStyle(0x248f73))
    veniceBtn.on('pointerout', () => veniceBtn.setFillStyle(0x1e6f5c))
    veniceBtn.on('pointerup', () => this.scene.start(SCENES.VENICE))

    // --- Salle Maroc ---
    const marocBtn = this.add.rectangle(width/2, height/2, 220, 60, 0xa66f2f).setInteractive({ useHandCursor: true })
    this.add.text(width/2, height/2, 'Salle : Maroc', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5)
    marocBtn.on('pointerover', () => marocBtn.setFillStyle(0xc57d35))
    marocBtn.on('pointerout', () => marocBtn.setFillStyle(0xa66f2f))
    marocBtn.on('pointerup', () => this.scene.start(SCENES.MAROC))

    // --- Salle Kenya ---
    const kenyaBtn = this.add.rectangle(width/2, height/2 + 90, 220, 60, 0x2f6b35).setInteractive({ useHandCursor: true })
    this.add.text(width/2, height/2 + 90, 'Salle : Kenya', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5)
    kenyaBtn.on('pointerover', () => kenyaBtn.setFillStyle(0x3c8a43))
    kenyaBtn.on('pointerout', () => kenyaBtn.setFillStyle(0x2f6b35))
    kenyaBtn.on('pointerup', () => this.scene.start(SCENES.KENYA))

    // --- Salle Amazonie ---
    const amazonBtn = this.add.rectangle(width/2, height/2 + 180, 220, 60, 0x1a4d30).setInteractive({ useHandCursor: true })
    this.add.text(width/2, height/2 + 180, 'Salle : Amazonie', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5)
    amazonBtn.on('pointerover', () => amazonBtn.setFillStyle(0x237746))
    amazonBtn.on('pointerout', () => amazonBtn.setFillStyle(0x1a4d30))
    amazonBtn.on('pointerup', () => this.scene.start(SCENES.AMAZONIE))

    // Tip
    this.add.text(width / 2, height - 40, 'Astuce : résolvez les salles pour collecter les badges écologiques.', {
      fontSize: '14px', 
      color: '#9fe3c6'
    }).setOrigin(0.5)
  }
}