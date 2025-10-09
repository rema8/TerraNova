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
        title: "Optimisation Solaire",
        prompt: "GLISSEZ chaque panneau de direction vers la zone horaire où il est le plus efficace (le Nord ne reçoit pas de lumière directe).",
        items: [
          { id: "nord", label: "Panneau NORD" },
          { id: "sud", label: "Panneau SUD" },
          { id: "est", label: "Panneau EST" },
          { id: "ouest", label: "Panneau OUEST" },
        ],
        targets: [
          // Le joueur doit déduire : Ouest -> Après-midi/Coucher du soleil
          { id: "position1", label: "Zone Après-midi / Coucher du soleil", accept: ["ouest"] }, 
          // Le joueur doit déduire : Est -> Matin/Lever du soleil
          { id: "position2", label: "Zone Matin / Lever du soleil", accept: ["est"] }, 
          // Le joueur doit déduire : Sud -> Midi
          { id: "position3", label: "Zone Zénith (Midi)", accept: ["sud"] }, 
        ],
      });
    });
  }
}