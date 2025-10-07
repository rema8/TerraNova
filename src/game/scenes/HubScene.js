
import Phaser from 'phaser'
import { SCENES } from '../constants/scenes.js'
import { gameState } from '../systems/gameState.js'

export default class HubScene extends Phaser.Scene {
  constructor() { super(SCENES.HUB) }

  create() {
    const { width, height } = this.scale

    // Fond
    this.cameras.main.setBackgroundColor('#081210')
    const title = this.add.text(width/2, 60, 'TerraNova 2045 — Hub', { 
      fontSize: '28px', color: '#c7ffd9', fontFamily: 'monospace'
    }).setOrigin(0.5)

    // Portes / destinations
    const veniceBtn = this.add.rectangle(width/2, height/2, 220, 60, 0x1e6f5c).setInteractive({ useHandCursor: true })
    const veniceTxt = this.add.text(width/2, height/2, 'Salle : Venise', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5)

    veniceBtn.on('pointerover', () => veniceBtn.setFillStyle(0x248f73))
    veniceBtn.on('pointerout', () => veniceBtn.setFillStyle(0x1e6f5c))
    veniceBtn.on('pointerup', () => {
      this.scene.start(SCENES.VENICE)
    })

    // Tip
    this.add.text(width/2, height - 40, 'Astuce : résolvez les salles pour collecter les badges écologiques.', {
      fontSize: '14px', color: '#9fe3c6'
    }).setOrigin(0.5)
  }
}
