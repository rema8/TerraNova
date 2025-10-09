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
      puzzleManager.openPuzzle("venice-quiz-1", { 
        id: "venice-quiz-1",
        type: "quiz", 
        title: "Gestion des Eaux",
        // Prompt générique
        prompt: "Quel vent de Méditerranée, soufflant du Sud-Est, est le principal facteur de l'Acqua Alta ?",
        choices: [
          "Scirocco", // Réponse correcte : index 0
          "Tramontane",
          "Bora",
        ],
        answerIndex: 0,
        hints: [
          "C'est un vent chaud et humide.",
          "Son nom dérive de l'arabe et signifie «oriental»."
        ],
      });
    });
  }
}