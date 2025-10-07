
import Phaser from 'phaser'
import { SCENES } from '../constants/scenes.js'

export default class PreloadScene extends Phaser.Scene {
  constructor() { super(SCENES.PRELOAD) }

  preload() {
    // Exemple d'asset (facultatif) : placez un fichier dans public/assets/
    // this.load.image('venice-bg', '/assets/venice.jpg')
  }

  create() {
    this.scene.start(SCENES.HUB)
    this.scene.launch(SCENES.UI)
  }
}
