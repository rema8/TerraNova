
import Phaser from 'phaser'
import { SCENES } from '../constants/scenes.js'
import { gameState } from '../systems/gameState.js'
import { addToInventory } from '../systems/inventory.js'

export default class VeniceScene extends Phaser.Scene {
  constructor() { super(SCENES.VENICE) }

  create() {
    const { width, height } = this.scale

    // Background stylisé (sans assets) : gradient simulé + silhouettes
    this.cameras.main.setBackgroundColor('#0a1e1a')
    const water = this.add.rectangle(width/2, height*0.65, width, height*0.7, 0x0b3b30).setAlpha(0.8)
    const sky = this.add.rectangle(width/2, height*0.25, width, height*0.5, 0x0f2822).setAlpha(0.9)

    // Silhouettes de bâtiments (rectangles/triangles simples)
    for (let i=0; i<6; i++) {
      const x = 80 + i*140
      const w = 100
      const h = 120 + (i%2)*30
      this.add.rectangle(x, height*0.45, w, h, 0x13493e).setOrigin(0.5,1).setAlpha(0.9)
      this.add.triangle(x, height*0.45 - h, w*0.6, 0, w*1.1, 0, w*0.85, 40, 0x15594b).setAlpha(0.9)
    }

    this.add.text(20, 16, 'Venise 2045 — Centre de contrôle des inondations', { fontSize: '18px', color: '#c7ffd9' })

    // Zone interactive: "Console d'inondation"
    const consoleRect = this.add.rectangle(width*0.78, height*0.7, 220, 120, 0x1e6f5c).setStrokeStyle(2, 0x9fe3c6).setInteractive({ useHandCursor: true })
    const consoleText = this.add.text(consoleRect.x, consoleRect.y, 'Console inondation', { fontSize: '16px', color: '#ffffff' }).setOrigin(0.5)

    consoleRect.on('pointerover', () => consoleRect.setFillStyle(0x248f73))
    consoleRect.on('pointerout', () => consoleRect.setFillStyle(0x1e6f5c))
    consoleRect.on('pointerup', () => this.openFloodPuzzle())

    // Bouton retour au hub
    const backBtn = this.add.text(20, height - 28, '⟵ Retour au hub', { fontSize: '16px', color: '#9fe3c6' })
      .setInteractive({ useHandCursor: true })
      .on('pointerup', () => this.scene.start(SCENES.HUB))

    // Indication d'état
    this.statusText = this.add.text(width - 20, 16, '', { fontSize: '16px', color: '#b6ffe2' }).setOrigin(1,0)
    this.refreshStatus()
  }

  refreshStatus() {
    const opened = gameState.getFlag('veniceGateOpened')
    const solved = gameState.getFlag('venicePuzzleSolved')
    const items = [...gameState.inventory]
    const status = [
      opened ? 'Porte: OUVERTE' : 'Porte: FERMÉE',
      solved ? 'Énigme: RÉSOLUE' : 'Énigme: À FAIRE',
      items.includes('Badge Venise') ? 'Badge: acquis' : 'Badge: manquant'
    ].join('  |  ')
    this.statusText.setText(status)
  }

  openFloodPuzzle() {
    // Petit panneau modal avec 4 LEDs togglables -> target [1,0,1,1]
    const { width, height } = this.scale
    const overlay = this.add.rectangle(0,0,width, height, 0x000000).setOrigin(0,0).setAlpha(0.5).setInteractive()
    const panel = this.add.rectangle(width/2, height/2, 420, 220, 0x073c31).setStrokeStyle(2, 0x9fe3c6)
    this.add.text(panel.x, panel.y - 80, 'Réglage digue anti-submersion', { fontSize: '18px', color: '#c7ffd9' }).setOrigin(0.5)

    const leds = [0,0,0,0]
    const targets = [1,0,1,1]
    const btns = []

    const baseX = panel.x - 150
    const y = panel.y + 10

    for (let i=0; i<4; i++) {
      const bx = baseX + i*100
      const led = this.add.circle(bx, y - 20, 14, 0x2b5047).setStrokeStyle(2, 0x9fe3c6)
      const btn = this.add.rectangle(bx, y + 40, 60, 30, 0x1e6f5c).setInteractive({ useHandCursor: true })
      const txt = this.add.text(bx, y + 40, 'TOGGLE', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5)

      btn.on('pointerup', () => {
        leds[i] = 1 - leds[i]
        led.setFillStyle(leds[i] ? 0x31c48d : 0x2b5047)
        check()
      })
      btns.push(btn)
    }

    const hint = this.add.text(panel.x, panel.y + 80, 'Indice: le motif de la lagune (1-0-1-1).', { fontSize: '14px', color: '#9fe3c6' }).setOrigin(0.5)

    const close = () => {
      overlay.destroy(); panel.destroy(); hint.destroy()
      btns.forEach(b=>b.destroy())
      this.children.list.filter(o => o.type === 'Arc' || (o.type === 'Text' && o.text === 'TOGGLE')).forEach(o => o.destroy())
    }

    const check = () => {
      if (leds.every((v,i)=>v===targets[i])) {
        gameState.setFlag('venicePuzzleSolved', true)
        gameState.setFlag('veniceGateOpened', true)
        if (![...gameState.inventory].includes('Badge Venise')) addToInventory('Badge Venise')
        this.refreshStatus()
        this.add.text(panel.x, panel.y - 40, '✔️ Digue configurée — Venise protégée', { fontSize: '16px', color: '#b6ffe2' }).setOrigin(0.5)
        this.time.delayedCall(800, () => close())
      }
    }

    // Fermer en cliquant en dehors
    overlay.on('pointerup', () => close())
  }
}
