// src/game/scenes/AmazonieScene.js

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
      puzzleManager.openPuzzle("amazonie-forest", {
        id: "amazonie-forest",
        type: "dragdrop", 
        title: "Reboisement Anti-Érosion",
        // NOUVEAU PROMPT : Met l'accent sur la fonction des plantes, et non leur nom
        prompt: "GLISSEZ chaque plant vers la zone qui a le plus besoin de sa capacité de fixation pour lutter contre l'érosion.",
        items: [
            // Le joueur doit déduire : qui fixe le mieux le sol ?
            { id: "planteRizhome", label: "Plante à rhizomes (Racines traçantes)" }, 
            { id: "plantePivot", label: "Plante à racines pivots (Verticales)" }, 
        ],
        targets: [
            // Le sol fragile est plus sensible au glissement (d'où l'importance des racines traçantes)
            { id: "sol1", label: "Sol N°1 (Zone de ravinement)", accept: ["planteRizhome"] }, 
            // Le sol stable a besoin de profondeur pour l'ancrage
            { id: "sol2", label: "Sol N°2 (Zone stable profonde)", accept: ["plantePivot"] }, 
        ],
      });
    });
  }
}