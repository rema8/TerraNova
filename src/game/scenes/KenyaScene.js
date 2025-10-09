// src/game/scenes/KenyaScene.js
import Phaser from "phaser";
import { puzzleManager } from "../systems/puzzleManager";
import { badgeManager } from "../systems/BadgeManager"; 
import { PROGRESSION } from "../systems/ProgressionManager";

export default class KenyaScene extends Phaser.Scene {
    constructor() {
        super("KenyaScene");
    }
    
    // 🚨 CORRECTION DU BUG DE DOUBLE-JEU
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
        this.cameras.main.setBackgroundColor("#2a5934"); 
        
        // --- LOGIQUE DE PROGRESSION ---
        const PUZZLE_1 = PROGRESSION["kenya-faune-quiz-1"];
        const PUZZLE_2 = PROGRESSION["kenya-dragdrop-2"];

        let currentPuzzleData = null;
        let buttonText = "Salle Complète !";
        let buttonColor = 0x6a6a6a; 

        if (!badgeManager.unlockedBadges.has(PUZZLE_1.badgeId)) {
            // Énigme 1 : Quiz
            currentPuzzleData = {
                ...PUZZLE_1,
                type: "quiz", 
                title: "Lutte Anti-Braconnage (Niv. 1)",
                prompt: "Le braconnage de quel 'Géant de la Savane' est principalement motivé par le commerce illégal de l'ivoire ?",
                choices: ["Le grand mammifère à corne", "Le plus rapide des félins", "Le géant à la trompe"],
                answerIndex: 2, 
                scene: this.sys.settings.key,
            };
            buttonText = "Protection de la Faune (Niv. 1)";
            buttonColor = 0x447a3f;
        } else if (!badgeManager.unlockedBadges.has(PUZZLE_2.badgeId)) {
            // Énigme 2 : DragDrop
            currentPuzzleData = {
                ...PUZZLE_2,
                type: "dragdrop", 
                title: "Répartition des Espèces (Niv. 2)",
                prompt: "Associez chaque espèce à sa zone d'habitat idéale.",
                items: [{ id: "rhino", label: "Rhinocéros (Herbivore)" }, { id: "guépard", label: "Guépard (Chasseur)" }],
                targets: [{ id: "savane", label: "Savane ouverte", accept: ["guépard"] }, { id: "bush", label: "Bush dense", accept: ["rhino"] }],
                scene: this.sys.settings.key,
            };
            buttonText = "Protection de la Faune (Niv. 2)";
            buttonColor = 0x8e44ad; 
        }

        // --- RENDU PHASER ---
        this.add.text(w / 2, 60, "Salle : Kenya", { fontSize: "28px", color: "#ffffff"}).setOrigin(0.5);

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