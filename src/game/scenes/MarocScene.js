// src/game/scenes/MarocScene.js
import Phaser from "phaser";
import { puzzleManager } from "../systems/puzzleManager";
import { badgeManager } from "../systems/BadgeManager"; 
import { PROGRESSION } from "../systems/ProgressionManager";

export default class MarocScene extends Phaser.Scene {
    constructor() {
        super("MarocScene");
    }

    create() {
        const { width: w, height: h } = this.scale;
        this.cameras.main.setBackgroundColor("#3d2b1f");

        // --- LOGIQUE DE PROGRESSION ---
        const PUZZLE_1 = PROGRESSION["maroc-dragdrop-1"];
        const PUZZLE_2 = PROGRESSION["maroc-quiz-2"];

        let currentPuzzleData = null;
        let buttonText = "Salle Complète";
        let buttonColor = 0x6a6a6a; 

        if (!badgeManager.unlockedBadges.has(PUZZLE_1.badgeId)) {
            // Énigme 1 non résolue : Drag & Drop (Points Cardinaux)
            currentPuzzleData = {
                ...PUZZLE_1,
                type: "dragdrop", 
                title: "Optimisation Solaire (Niv. 1)",
                prompt: "GLISSEZ chaque panneau de direction vers la zone horaire où il est le plus efficace.",
                items: [{ id: "nord", label: "Panneau NORD" }, { id: "sud", label: "Panneau SUD" }, { id: "est", label: "Panneau EST" }, { id: "ouest", label: "Panneau OUEST" }],
                targets: [{ id: "position1", label: "Zone Après-midi", accept: ["ouest"] }, { id: "position2", label: "Zone Matin", accept: ["est"] }, { id: "position3", label: "Zone Zénith", accept: ["sud"] }],
                scene: this.sys.settings.key,
            };
            buttonText = "Régler les miroirs (Niv. 1)";
            buttonColor = 0xe6a157;
        } else if (!badgeManager.unlockedBadges.has(PUZZLE_2.badgeId)) {
            // Énigme 1 résolue, Énigme 2 non résolue : Quiz
            currentPuzzleData = {
                ...PUZZLE_2,
                type: "quiz", 
                title: "Gestion des Ressources (Niv. 2)",
                prompt: "Quel défi majeur la centrale Noor Ouarzazate doit-elle relever dans le désert ?",
                choices: ["Le stockage thermique nocturne", "L'approvisionnement en eau", "La corrosion due au sel"],
                answerIndex: 1, 
                scene: this.sys.settings.key,
            };
            buttonText = "Vérifier la consommation (Niv. 2)";
            buttonColor = 0xf39c12; // Orange
        }

        // --- RENDU PHASER ---
        this.add.text(w / 2, 60, "Maroc – Centrale solaire Noor", { fontSize: "22px", color: "#fff7e6"}).setOrigin(0.5);

        const btn = this.add.rectangle(w / 2, h / 2, 250, 70, buttonColor).setInteractive({ useHandCursor: true });
        this.add.text(w / 2, h / 2, buttonText, { fontSize: "18px", color: "#fff"}).setOrigin(0.5);

        btn.on("pointerdown", () => {
            if (currentPuzzleData) {
                puzzleManager.openPuzzle(currentPuzzleData.id, currentPuzzleData);
                if (badgeManager.unlockedBadges.has(currentPuzzleData.badgeId)) {
                     this.scene.restart();
                }
            } else {
                 console.log("Salle Complète !");
            }
        });
    }
}