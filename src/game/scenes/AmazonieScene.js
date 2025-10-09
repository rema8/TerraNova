import Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";
import { puzzleManager } from "../systems/puzzleManager.js";

export default class AmazonieScene extends Phaser.Scene {
  constructor() {
    super("AmazonieScene");
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor("#084c28"); // Vert jungle
    this.add.text(width / 2, 60, "Salle : Amazonie", {
      fontSize: "28px",
      color: "#ffffff",
      fontFamily: "monospace",
    }).setOrigin(0.5);

    const puzzleBtn = this.add.rectangle(width / 2, height / 2, 220, 60, 0x126b40).setInteractive({ useHandCursor: true });
    this.add.text(width / 2, height / 2, "Déforestation", {
      fontSize: "18px",
      color: "#ffffff",
    }).setOrigin(0.5);

    puzzleBtn.on("pointerup", () => {
      // AJOUT DES DONNÉES DE L'ÉNIGME
      puzzleManager.openPuzzle("amazonie-forest", {
        id: "amazonie-forest",
        type: "dragdrop", // Par exemple, utilisez "dragdrop"
        title: "Reboisement",
        prompt: "Associez les arbres natifs (A, B) à leurs sols (1, 2).",
        // Les données ci-dessous sont spécifiques au type "dragdrop" :
        items: [
            { id: "arbreA", label: "Arbre A" },
            { id: "arbreB", label: "Arbre B" },
        ],
        targets: [
            { id: "sol1", label: "Sol 1", accept: ["arbreB"] },
            { id: "sol2", label: "Sol 2", accept: ["arbreA"] },
        ],
      });
    });
  }
}