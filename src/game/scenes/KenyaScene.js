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
      // AJOUT DES DONNÉES DE L'ÉNIGME
      puzzleManager.openPuzzle("kenya-faune", {
        id: "kenya-faune",
        type: "toggle", // Par exemple, utilisez "toggle" ou "dragdrop"
        title: "Pistes de Patrouille",
        prompt: "Allumez les balises qui correspondent aux zones protégées (1 et 3).",
        // Les données ci-dessous sont spécifiques au type "toggle" :
        toggles: [
          { id: "balise1", label: "Zone Nord" },
          { id: "balise2", label: "Zone Ouest" },
          { id: "balise3", label: "Zone Est" },
        ],
        solution: ["balise1", "balise3"],
      });
    });
  }
}