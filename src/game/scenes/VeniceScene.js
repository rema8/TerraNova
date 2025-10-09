// src/game/scenes/VeniceScene.js
import Phaser from "phaser";
import { puzzleManager } from "../systems/puzzleManager";

export default class VeniceScene extends Phaser.Scene {
  constructor() {
    super("VeniceScene");
  }

  preload() {
    // Charge une image de fond (si elle existe)
    this.load.image("venice_bg", "assets/bg/venice.jpg");
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    // --- FOND ---
    if (this.textures.exists("venice_bg")) {
      this.add.image(w / 2, h / 2, "venice_bg").setDisplaySize(w, h);
    } else {
      this.add.rectangle(0, 0, w * 2, h * 2, 0x004f47).setOrigin(0); // fallback vert
    }

    // --- TITRE ---
    this.add
      .text(w / 2, 40, "Venise 2045 — Centre de contrôle", {
        fontFamily: "Arial",
        fontSize: "22px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // --- BOUTON CONSOLE INONDATION ---
    const btn = this.add
      .rectangle(w / 2, h / 2 + 50, 260, 80, 0x1e6f5c)
      .setInteractive({ useHandCursor: true })
      .setStrokeStyle(3, 0xffffff)
      .setOrigin(0.5);

    const txt = this.add
      .text(w / 2, h / 2 + 50, "Console inondation", {
        fontFamily: "Arial",
        fontSize: "18px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // --- ANIMATION VISUELLE ---
    this.tweens.add({
      targets: [btn, txt],
      scale: { from: 1, to: 1.05 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    // --- CLIQUE ---
    btn.on("pointerdown", () => {
      puzzleManager.openPuzzle("venice-toggle-1", {
        id: "venice-toggle-1",
        type: "toggle",
        title: "Console d’inondation",
        prompt:
          "Active les bons leviers pour stabiliser le niveau d’eau de la lagune.",
        pattern: [1, 0, 1, 1, 0, 1],
      });
    });
  }
}
