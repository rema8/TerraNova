
import Phaser from 'phaser'
import { SCENES } from '../constants/scenes.js'
import { gameState } from '../systems/gameState.js'
import { startGlobalTimer } from '../systems/timer.js'

export default class UIOverlayScene extends Phaser.Scene {
  constructor() { super(SCENES.UI) }

  create() {
    const { width } = this.scale

    // Barre supérieure
    const bar = this.add.rectangle(0, 0, width, 40, 0x052c24).setOrigin(0,0).setAlpha(0.9)
    this.timerText = this.add.text(12, 10, 'Temps: 15:00', { fontSize: '16px', color: '#b6ffe2' })
    this.invText = this.add.text(width - 12, 10, 'Inventaire: (vide)', { fontSize: '16px', color: '#b6ffe2' }).setOrigin(1,0)

    // Timer global
    startGlobalTimer((remaining) => {
      const m = String(Math.floor(remaining / 60)).padStart(2,'0')
      const s = String(remaining % 60).padStart(2,'0')
      this.timerText.setText(`Temps: ${m}:${s}`)
    })

    // Sync inventaire via event DOM
    const updateInv = () => {
      const items = [...gameState.inventory]
      this.invText.setText(items.length ? `Inventaire: ${items.join(', ')}` : 'Inventaire: (vide)')
    }
    updateInv()
    window.addEventListener('inventory:changed', updateInv)
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => window.removeEventListener('inventory:changed', updateInv))
  }
}
