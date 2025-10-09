// src/game/scenes/VeniceScene.js
import Phaser from "phaser";
import { puzzleManager } from "../systems/puzzleManager";
import { badgeManager } from "../systems/BadgeManager"; 
import { PROGRESSION } from "../systems/ProgressionManager"; 

export default class VeniceScene extends Phaser.Scene {
    constructor() {
        super("VeniceScene");
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;
        this.cameras.main.setBackgroundColor(0x004f47);
        
        // --- LOGIQUE DE PROGRESSION ---
        const PUZZLE_1 = PROGRESSION["venice-quiz-1"];
        const PUZZLE_2 = PROGRESSION["venice-toggle-2"];

        let currentPuzzleData = null;
        let buttonText = "Salle Complète";
        let buttonColor = 0x6a6a6a; // Gris

        if (!badgeManager.unlockedBadges.has(PUZZLE_1.badgeId)) {
            // Énigme 1 non résolue : Quiz
            currentPuzzleData = {
                ...PUZZLE_1, // Utilise les métadonnées de PROGRESSION
                type: "quiz", 
                title: "Gestion des Eaux : Phase 1",
                prompt: "Quel vent de Méditerranée, soufflant du Sud-Est, est le principal facteur de l'Acqua Alta ?",
                choices: ["Scirocco", "Tramontane", "Bora"],
                answerIndex: 0,
                scene: this.sys.settings.key, // Enregistre le nom de la scène pour le rechargement
            };
            buttonText = "Console Inondation (Niveau 1)";
            buttonColor = 0x1e6f5c;
        } else if (!badgeManager.unlockedBadges.has(PUZZLE_2.badgeId)) {
            // Énigme 1 résolue, Énigme 2 non résolue : Toggle
            currentPuzzleData = {
                ...PUZZLE_2,
                type: "toggle", 
                title: "Gestion des Eaux : Phase 2 (Barrières MOSE)",
                prompt: "Activez les vannes pour bloquer la montée des eaux. (Bas = Actif / Haut = Inactif)",
                targets: [true, false, true, false], 
                scene: this.sys.settings.key,
            };
            buttonText = "Console Inondation (Niveau 2)";
            buttonColor = 0x2980b9; // Bleu
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
                // Si l'énigme est résolue, redémarre la scène pour mettre à jour le bouton
                if (badgeManager.unlockedBadges.has(currentPuzzleData.badgeId)) {
                     this.scene.restart();
                }
            } else {
                 console.log("Salle Complète !");
            }
        });
    }
}