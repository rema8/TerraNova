// src/game/scenes/KenyaScene.js

import Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";
import { puzzleManager } from "../systems/puzzleManager.js";

export default class KenyaScene extends Phaser.Scene {
  constructor() {
    super("KenyaScene");
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor("#2a5934"); // Vert savane 🌿
    this.add.text(width / 2, 60, "Salle : Kenya", {
      fontSize: "28px",
      color: "#ffffff",
      fontFamily: "monospace",
    }).setOrigin(0.5);

    const puzzleBtn = this.add.rectangle(width / 2, height / 2, 220, 60, 0x447a3f).setInteractive({ useHandCursor: true });
    this.add.text(width / 2, height / 2, "Protection de la faune", {
      fontSize: "18px",
      color: "#ffffff",
    }).setOrigin(0.5);

    puzzleBtn.on("pointerup", () => {
      puzzleManager.openPuzzle("kenya-faune-quiz", {
        id: "kenya-faune-quiz",
        type: "quiz", 
        title: "Lutte Anti-Braconnage",
        prompt: "Le braconnage de quel 'Géant de la Savane' est principalement motivé par le commerce illégal de l'ivoire ?",
        choices: [
          "Le grand mammifère à corne", // Rhinocéros
          "Le plus rapide des félins", // Guépard
          "Le géant à la trompe", // Éléphant (réponse correcte : index 2)
        ],
        answerIndex: 2, 
        hints: [
          "Il est le plus grand mammifère terrestre.", 
          "Sa population a chuté de 90% au XXe siècle."
        ],
      });
    });
  }
}