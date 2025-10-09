// src/game/scenes/AmazonieScene.js
import Phaser from "phaser";
import { puzzleManager } from "../systems/puzzleManager";
import { badgeManager } from "../systems/BadgeManager"; 
import { PROGRESSION } from "../systems/ProgressionManager";

export default class AmazonieScene extends Phaser.Scene {
    constructor() {
        super("AmazonieScene");
    }

    //CORRECTION DU BUG DE DOUBLE-JEU
    init() {
        this.handleProgression = (data) => {
            if (data.scene === this.sys.settings.key) {
                this.scene.restart();
            }
        };
        badgeManager.on('progressed', this.handleProgression);
    }
    
    shutdown() {
        badgeManager.off('progressed', this.handleProgression);
    }
    
    create() {
        const { width: w, height: h } = this.scale;
        this.cameras.main.setBackgroundColor("#084c28"); 
        
        // --- LOGIQUE DE PROGRESSION ---
        const PUZZLE_1 = PROGRESSION["amazonie-forest-1"];
        const PUZZLE_2 = PROGRESSION["amazonie-toggle-2"];

        let currentPuzzleData = null;
        let buttonText = "Salle Complète !";
        let buttonColor = 0x6a6a6a; 

        if (!badgeManager.unlockedBadges.has(PUZZLE_1.badgeId)) {
            // Énigme 1 : Drag & Drop
            currentPuzzleData = {
                ...PUZZLE_1,
                type: "dragdrop", 
                title: "Reboisement Anti-Érosion (Niv. 1)",
                prompt: "GLISSEZ chaque plant vers la zone qui a le plus besoin de sa capacité de fixation pour lutter contre l'érosion.",
                items: [{ id: "planteRizhome", label: "Plante à rhizomes" }, { id: "plantePivot", label: "Plante à racines pivots" }],
                targets: [{ id: "sol1", label: "Zone de Ravinement", accept: ["planteRizhome"] }, { id: "sol2", label: "Zone Stable Profonde", accept: ["plantePivot"] }],
                scene: this.sys.settings.key,
            };
            buttonText = "Déforestation (Niv. 1)";
            buttonColor = 0x126b40;
        } else if (!badgeManager.unlockedBadges.has(PUZZLE_2.badgeId)) {
            // Énigme 2 : Toggle
            currentPuzzleData = {
                ...PUZZLE_2,
                type: "toggle", 
                title: "Analyse des Données (Niv. 2)",
                prompt: "Activez les capteurs indiquant une qualité d'air Supérieure à la moyenne.",
                targets: [false, true, true, false, true], 
                scene: this.sys.settings.key,
            };
            buttonText = "Contrôle des Capteurs (Niv. 2)";
            buttonColor = 0x27ae60; 
        }

        // --- RENDU PHASER ---
        this.add.text(w / 2, 60, "Salle : Amazonie", { fontSize: "28px", color: "#ffffff"}).setOrigin(0.5);

        const puzzleBtn = this.add.rectangle(w / 2, h / 2, 220, 60, buttonColor).setInteractive({ useHandCursor: true });
        this.add.text(w / 2, h / 2, buttonText, { fontSize: "18px", color: "#ffffff"}).setOrigin(0.5);

        puzzleBtn.on("pointerup", () => {
            if (currentPuzzleData) {
                puzzleManager.openPuzzle(currentPuzzleData.id, currentPuzzleData);
            } else {
                 console.log("Salle Complète !");
            }
        });
    }
}