// src/game/scenes/MarocScene.js
import Phaser from "phaser";
import { puzzleManager } from "../systems/puzzleManager";

export default class MarocScene extends Phaser.Scene {
  constructor() {
    super("MarocScene");
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor("#3d2b1f");

    this.add
      .text(width / 2, 60, "Maroc – Centrale solaire Noor", {
        fontSize: "22px",
        color: "#fff7e6",
      })
      .setOrigin(0.5);

    const btn = this.add
      .rectangle(width / 2, height / 2, 250, 70, 0xe6a157)
      .setInteractive({ useHandCursor: true });
    this.add
      .text(width / 2, height / 2, "Régler les miroirs solaires", {
        fontSize: "18px",
        color: "#fff",
      })
      .setOrigin(0.5);

    btn.on("pointerdown", () => {
      puzzleManager.openPuzzle("maroc-dragdrop-1", {
        id: "maroc-dragdrop-1",
        type: "dragdrop",
        title: "Alignement solaire",
        prompt:
          "Associe chaque miroir à la bonne position pour maximiser la lumière reçue.",
        items: [
          { id: "nord", label: "Nord" },
          { id: "sud", label: "Sud" },
          { id: "est", label: "Est" },
          { id: "ouest", label: "Ouest" },
        ],
        targets: [
          { id: "position1", label: "Miroir 1", accept: ["est"] },
          { id: "position2", label: "Miroir 2", accept: ["ouest"] },
          { id: "position3", label: "Miroir 3", accept: ["sud"] },
        ],
      });
    });
  }
}
