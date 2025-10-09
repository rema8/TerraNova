// src/game/scenes/VeniceScene.js
import Phaser from "phaser";
import { puzzleManager } from "../systems/puzzleManager";
import { badgeManager } from "../systems/BadgeManager"; 
import { PROGRESSION } from "../systems/ProgressionManager"; 

export default class VeniceScene extends Phaser.Scene {
    constructor() {
        super("VeniceScene");
    }
    
    // 🚨 CORRECTION DU BUG DE DOUBLE-JEU : On écoute ici la progression
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
    
    preload() {
        this.load.image("venice_bg", "assets/bg/venice.jpg");
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;
        this.cameras.main.setBackgroundColor(0x004f47);
        
        // --- LOGIQUE DE PROGRESSION ---
        const PUZZLE_1 = PROGRESSION["venice-quiz-1"];
        const PUZZLE_2 = PROGRESSION["venice-toggle-2"];

        let currentPuzzleData = null;
        let buttonText = "Salle Complète !";
        let buttonColor = 0x6a6a6a; 

        if (!badgeManager.unlockedBadges.has(PUZZLE_1.badgeId)) {
            // Énigme 1 : Quiz
            currentPuzzleData = {
                ...PUZZLE_1, 
                type: "quiz", 
                title: "Gestion des Eaux : Phase 1",
                prompt: "Quel vent de Méditerranée, soufflant du Sud-Est, est le principal facteur de l'Acqua Alta ?",
                choices: ["Scirocco", "Tramontane", "Bora"],
                answerIndex: 0,
                scene: this.sys.settings.key, 
            };
            buttonText = "Console Inondation (Niveau 1)";
            buttonColor = 0x1e6f5c;
        } else if (!badgeManager.unlockedBadges.has(PUZZLE_2.badgeId)) {
            // Énigme 2 : Toggle
            currentPuzzleData = {
                ...PUZZLE_2,
                type: "toggle", 
                title: "Gestion des Eaux : Phase 2 (Barrières MOSE)",
                prompt: "Activez les vannes pour bloquer la montée des eaux. (Bas = Actif / Haut = Inactif)",
                targets: [true, false, true, false], 
                scene: this.sys.settings.key,
            };
            buttonText = "Console Inondation (Niveau 2)";
            buttonColor = 0x2980b9; 
        }

        // --- RENDU PHASER ---
        this.add.text(w / 2, 40, "Venise 2045 — Centre de contrôle", {
             fontFamily: "Arial", fontSize: "22px", color: "#ffffff",
        }).setOrigin(0.5);
        
        const btn = this.add
            .rectangle(w / 2, h / 2 + 50, 260, 80, buttonColor)
            .setInteractive({ useHandCursor: true })
            .setStrokeStyle(3, 0xffffff)
            .setOrigin(0.5);

        const txt = this.add
            .text(w / 2, h / 2 + 50, buttonText, {
                fontFamily: "Arial", fontSize: "18px", color: "#ffffff",
            }).setOrigin(0.5);

        this.tweens.add({ targets: [btn, txt], scale: { from: 1, to: 1.05 }, duration: 1000, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });

        btn.on("pointerdown", () => {
            if (currentPuzzleData) {
                puzzleManager.openPuzzle(currentPuzzleData.id, currentPuzzleData);
            } else {
                 console.log("Salle Complète !");
            }
        });
        
        // Supprimez toute astuce affichée en bas de l'écran ici si elle est codée dans cette scène.
    }
}