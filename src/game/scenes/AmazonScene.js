import Phaser from 'phaser'
import { SCENES } from '../constants/scenes.js'
import { gameState } from '../systems/gameState.js'
import { addToInventory } from '../systems/inventory.js'
import puzzleData from '../data//puzzles/Amazon.json' // Vite supporte l'import JSON par défaut

export default class AmazonScene extends Phaser.Scene {
  constructor() { super(SCENES.AMAZON) }

  create() {
    const { width, height } = this.scale

    // --- Fond ---
    const bg = this.add.image(width/2, height/2, 'amazon-bg')
    bg.setDisplaySize(width, height)

    // Titre + retour
    this.add.text(20, 16, 'Amazonie 2045 — Écosystème & Pollution', { fontSize: '18px', color: '#c7ffd9' })
    this.add.text(20, height - 28, '⟵ Retour au Hub', { fontSize: '16px', color: '#9fe3c6' })
      .setInteractive({ useHandCursor: true })
      .on('pointerup', () => this.scene.start(SCENES.HUB))

    // Panneaux de lisibilité
    this.add.rectangle(width/2, height*0.30, width-40, 180, 0x000000, 0.35) // zone espèces (haut)
    this.add.rectangle(width/2, height*0.78, width-40, 200, 0x000000, 0.35) // zone déchets (bas)

    // Statut
    this.statusText = this.add.text(width-20, 16, '', { fontSize: '16px', color: '#b6ffe2' }).setOrigin(1,0)
    this.speciesSolved = !!gameState.getFlag('amazonSpeciesSolved')
    this.trashSolved = !!gameState.getFlag('amazonTrashSolved')
    this.refreshStatus()

    // --- Puzzle 1 : Espèces -> Habitats ---
    this.setupSpeciesPuzzle()

    // --- Puzzle 2 : Tri des déchets ---
    this.setupTrashPuzzle()
  }

  refreshStatus() {
    const a = this.speciesSolved ? 'Espèces: ✔︎' : 'Espèces: …'
    const b = this.trashSolved ? 'Déchets: ✔︎' : 'Déchets: …'
    this.statusText.setText(`${a}  |  ${b}`)

    if (this.speciesSolved && this.trashSolved && !gameState.getFlag('amazonBadgeGiven')) {
      if (![...gameState.inventory].includes('Badge Amazonie')) addToInventory('Badge Amazonie')
      gameState.setFlag('amazonBadgeGiven', true)
      this.toast('🏅 Badge Amazonie débloqué !')
    }
  }

  // ----------------------------
  // Puzzle Espèces (haut d’écran)
  // ----------------------------
  setupSpeciesPuzzle() {
    const { width, height } = this.scale

    // Habitats (drop zones)
    const habitats = [
      { name: 'Forêt',   x: width*0.25, y: height*0.24 },
      { name: 'Canopée', x: width*0.50, y: height*0.24 },
      { name: 'Rivière', x: width*0.75, y: height*0.24 },
    ]

    habitats.forEach(h => {
      // zone de drop
      const z = this.add.zone(h.x, h.y, 140, 90).setRectangleDropZone(140, 90)
      z.setData('habitat', h.name)
      // visuel
      const box = this.add.rectangle(h.x, h.y, 140, 90, 0x2c3e50, 0.35).setStrokeStyle(2, 0xffffff)
      const label = this.add.text(h.x, h.y - 62, h.name, { fontSize: '14px', color: '#ffffff' }).setOrigin(0.5)
      // petite icône
      this.add.circle(h.x, h.y, 4, 0xffffff, 0.8).setAlpha(0.6)
    })

    // Animaux (draggables), on lit depuis le JSON
    // JSON: { name, sprite, habitat }
    const startY = height*0.40
    const startX = width*0.25
    const gap = 150
    this.speciesPlaced = 0
    this.speciesTotal = puzzleData.speciesPuzzle.length

    puzzleData.speciesPuzzle.forEach((s, i) => {
      const img = this.add.image(startX + i*gap, startY, s.sprite).setScale(0.9)
      img.setInteractive({ useHandCursor: true })
      this.input.setDraggable(img)
      img.setData('targetHabitat', s.habitat)
      img.setData('placed', false)
      img.setDepth(10)

      // drag events
      img.on('drag', (pointer, dragX, dragY) => {
        img.x = dragX
        img.y = dragY
      })

      img.on('dragend', (pointer, dragX, dragY, dropped) => {
        if (!dropped && !img.getData('placed')) {
          // revient à la ligne de départ
          img.x = startX + i*gap
          img.y = startY
        }
      })
    })

    // drop handling
    this.input.on('drop', (pointer, gameObj, dropZone) => {
      // Espèces
      if (gameObj.getData('targetHabitat')) {
        const must = gameObj.getData('targetHabitat')
        const zoneName = dropZone.getData('habitat')
        if (must === zoneName) {
          gameObj.x = dropZone.x
          gameObj.y = dropZone.y
          gameObj.setData('placed', true)
          gameObj.disableInteractive()
          this.tweens.add({ targets: gameObj, scale: 1.05, duration: 120, yoyo: true })
          this.speciesPlaced += 1
          if (this.speciesPlaced === this.speciesTotal) {
            this.speciesSolved = true
            gameState.setFlag('amazonSpeciesSolved', true)
            this.toast('🪶 Espèces replacées dans leurs habitats !')
            this.refreshStatus()
          }
        }
      }
    })
  }

  // ----------------------------
  // Puzzle Déchets (bas d’écran)
  // ----------------------------
  setupTrashPuzzle() {
    const { width, height } = this.scale

    // Bacs (drop zones)
    const bins = [
      { cat: 'plastique', x: width*0.30, y: height*0.82, color: 0x27ae60 },
      { cat: 'métal',     x: width*0.50, y: height*0.82, color: 0x1e6f5c },
      { cat: 'organique', x: width*0.70, y: height*0.82, color: 0x2ecc71 },
    ]

    const binStacks = {} // pour décaler les items posés dans un même bac

    bins.forEach(b => {
      const z = this.add.zone(b.x, b.y, 160, 110).setRectangleDropZone(160, 110)
      z.setData('category', b.cat)

      // visuel du bac
      const box = this.add.rectangle(b.x, b.y, 160, 110, b.color, 0.35).setStrokeStyle(2, 0xffffff)
      const label = this.add.text(b.x, b.y - 72, b.cat.toUpperCase(), { fontSize: '14px', color: '#ffffff' }).setOrigin(0.5)
      binStacks[b.cat] = 0
    })

    // Déchets draggables (JSON: { item, sprite, category })
    const startY = height*0.92
    const startX = width*0.18
    const gap = 80
    this.trashPlaced = 0
    this.trashTotal = puzzleData.trashSorting.length

    puzzleData.trashSorting.forEach((t, i) => {
      const img = this.add.image(startX + i*gap, startY, t.sprite).setScale(0.9)
      img.setInteractive({ useHandCursor: true })
      this.input.setDraggable(img)
      img.setData('targetCat', t.category)
      img.setData('home', { x: startX + i*gap, y: startY })
      img.setDepth(10)

      img.on('drag', (pointer, dragX, dragY) => {
        img.x = dragX
        img.y = dragY
      })

      img.on('dragend', (pointer, dragX, dragY, dropped) => {
        if (!dropped) {
          const { x, y } = img.getData('home')
          img.x = x
          img.y = y
        }
      })
    })

    // drop handling (déchets)
    this.input.on('drop', (pointer, gameObj, dropZone) => {
      if (gameObj.getData('targetCat')) {
        const must = gameObj.getData('targetCat')
        const zoneCat = dropZone.getData('category')
        if (must === zoneCat) {
          const cat = zoneCat
          // petit décalage pour éviter la superposition exacte
          const offset = (binStacks[cat] % 3) * 18 - 18
          const row = Math.floor(binStacks[cat] / 3)
          gameObj.x = dropZone.x + offset
          gameObj.y = dropZone.y + 12 + row * 18
          gameObj.disableInteractive()
          binStacks[cat] += 1

          this.trashPlaced += 1
          this.tweens.add({ targets: gameObj, scale: 1.08, duration: 120, yoyo: true })

          if (this.trashPlaced === this.trashTotal) {
            this.trashSolved = true
            gameState.setFlag('amazonTrashSolved', true)
            this.toast('♻️ Tri des déchets réussi !')
            this.refreshStatus()
          }
        }
      }
    })
  }

  // ----------------------------
  // Petit toast centré
  // ----------------------------
  toast(message) {
    const { width } = this.scale
    const txt = this.add.text(width/2, 90, message, {
      fontSize: '16px', color: '#ffffff', backgroundColor: '#073c31', padding: { left: 12, right: 12, top: 6, bottom: 6 }
    }).setOrigin(0.5).setDepth(1000)
    this.tweens.add({
      targets: txt, alpha: { from: 0, to: 1 }, duration: 150,
      yoyo: false, onComplete: () => {
        this.time.delayedCall(1100, () => this.tweens.add({
          targets: txt, alpha: 0, duration: 200, onComplete: () => txt.destroy()
        }))
      }
    })
  }
}
