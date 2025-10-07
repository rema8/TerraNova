
import Phaser from 'phaser'
import { SCENES } from '../constants/scenes.js'

export default class BootScene extends Phaser.Scene {
  constructor() { super(SCENES.BOOT) }
  create() {
    this.scene.start(SCENES.PRELOAD)
  }
}
