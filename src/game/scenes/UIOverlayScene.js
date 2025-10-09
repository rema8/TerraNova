import Phaser from 'phaser'
import { SCENES } from '../constants/scenes.js'
import { gameState } from '../systems/gameState.js'
import { startGlobalTimer } from '../systems/timer.js'

export default class UIOverlayScene extends Phaser.Scene {
  constructor() { super(SCENES.UI) }

  create() {
    const { width } = this.scale

    // --- Barre supérieure ---
    this.add.rectangle(0, 0, width, 40, 0x052c24).setOrigin(0,0).setAlpha(0.9)

    // Timer à gauche
    this.timerText = this.add.text(12, 10, 'Temps: 15:00', { 
      fontSize: '16px', 
      color: '#b6ffe2' 
    })

   

    // --- Timer global ---
    startGlobalTimer((remaining) => {
      const m = String(Math.floor(remaining / 60)).padStart(2,'0')
      const s = String(remaining % 60).padStart(2,'0')
      this.timerText.setText(`Temps: ${m}:${s}`)
    })
  }
}
