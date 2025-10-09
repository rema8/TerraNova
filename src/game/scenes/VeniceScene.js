// src/game/scenes/VeniceScene.js
import Phaser from "phaser";
import { puzzleManager } from "../systems/puzzleManager";
import { badgeManager } from "../systems/BadgeManager"; 
import { PROGRESSION } from "../systems/ProgressionManager"; 

export default class VeniceScene extends Phaser.Scene {
    constructor() {
        super("VeniceScene");
        this.handleBadgeUpdate = this.handleBadgeUpdate.bind(this);
    }
    
    handleBadgeUpdate(badgeData) {
        const { id: badgeId } = badgeData;
        // Vérifie si le badge appartient à cette salle (badge-venise-1 à badge-venise-8)
        if (badgeId.startsWith("badge-venise-")) {
            this.time.delayedCall(300, () => {
                this.children.getAll().forEach(child => {
                    if (child instanceof Phaser.GameObjects.Rectangle || child instanceof Phaser.GameObjects.Text) {
                         child.destroy();
                    }
                });
                this.create(); // Recrée la scène avec le nouvel état
            }, [], this); 
        }
    }

    init() {
        badgeManager.off('badgeUnlocked', this.handleBadgeUpdate, this);
        badgeManager.on('badgeUnlocked', this.handleBadgeUpdate, this);
    }

    shutdown() {
        badgeManager.off('badgeUnlocked', this.handleBadgeUpdate, this);
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;
        this.cameras.main.setBackgroundColor(0x004f47);
        
        let currentPuzzleData = null;
        let buttonText = "Salle Complète ! (8/8)";
        let buttonColor = 0x6a6a6a; 
        let currentLevel = 1;
        
        const puzzleKeys = Object.keys(PROGRESSION).filter(key => key.startsWith("venice-"));
        
        for (let i = 0; i < puzzleKeys.length; i++) {
            const key = puzzleKeys[i];
            const info = PROGRESSION[key];
            if (!badgeManager.unlockedBadges.has(info.badgeId)) {
                currentLevel = i + 1;
                
                // Logique de chargement des données spécifiques au niveau
                switch (key) {
                    case "venice-quiz-1":
                        currentPuzzleData = { ...info, type: "quiz", title: "Gestion des Eaux : Phase 1", 
                            prompt: "Quel vent de Méditerranée, soufflant du Sud-Est, est le principal facteur de l'Acqua Alta ?",
                            choices: ["Scirocco", "Tramontane", "Bora"], answerIndex: 0,
                            hints: ["C'est un vent chaud et humide.", "Son nom dérive de l'arabe et signifie «oriental»."],
                        };
                        break;
                    case "venice-letter-2":
                        // 🚨 Nouvelle énigme pour remplacer le toggle peu pertinent
                        currentPuzzleData = { ...info, type: "letterpuzzle", title: "Histoire Urbaine : Phase 2", 
                            prompt: "Quel célèbre pont vénitien relie le Sestiere de San Marco et San Polo, et fut le seul à traverser le Grand Canal avant le XIXe siècle ? (Mot en 6 lettres)",
                            answer: "Rialto",
                            hints: ["Il est célèbre pour ses boutiques.", "Il est souvent encombré de touristes."],
                        };
                        break;
                    case "venice-toggle-3":
                        currentPuzzleData = { ...info, type: "toggle", title: "Régulation MOSE : Phase 3", 
                            prompt: "Activez les vannes pour bloquer la montée des eaux. (Bas = Actif / Haut = Inactif)",
                            targets: [true, false, true, false], 
                        };
                        break;
                    case "venice-drag-4":
                        currentPuzzleData = { ...info, type: "dragdrop", title: "Identification des Polluants : Phase 4", 
                            prompt: "Associez les polluants à leur source principale dans la lagune.",
                            items: [{ id: "microplastique", label: "Microplastiques" }, { id: "nitrate", label: "Nitrates (engrais)" }],
                            targets: [{ id: "tourisme", label: "Tourisme/Navigation", accept: ["microplastique"] }, { id: "agriculture", label: "Agriculture locale", accept: ["nitrate"] }],
                        };
                        break;
                    case "venice-quiz-5":
                        currentPuzzleData = { ...info, type: "quiz", title: "Submersion et Sédiments : Phase 5", 
                            prompt: "Quel phénomène naturel est causé par l'extraction des eaux souterraines et l'activité humaine, contribuant à l'enfoncement de Venise ?",
                            choices: ["Érosion", "Subsidence", "Tsunami"], answerIndex: 1,
                            hints: ["Le sol s'affaisse lentement.", "C'est un terme géologique."],
                        };
                        break;
                    case "venice-letter-6":
                        currentPuzzleData = { ...info, type: "letterpuzzle", title: "Développement Durable : Phase 6", 
                            prompt: "Quel terme désigne le ralentissement des mouvements de la mer par la végétation marine (plantes, algues) ? (Mot en 10 lettres)",
                            answer: "Amortisseur",
                            hints: ["Pensez à ce qui absorbe l'énergie.", "La nature sert de protection."],
                        };
                        break;
                    case "venice-toggle-7":
                        currentPuzzleData = { ...info, type: "toggle", title: "Réseau de Surveillance : Phase 7", 
                            prompt: "Activez les capteurs de profondeur fonctionnels (Vrai = Actif).",
                            targets: [true, true, false, true], 
                        };
                        break;
                    case "venice-drag-8":
                        currentPuzzleData = { ...info, type: "dragdrop", title: "Protection du Patrimoine : Phase 8", 
                            prompt: "Associez les zones à leur type de protection.",
                            items: [{ id: "piazza", label: "Place St. Marc" }, { id: "lagune", label: "Lagune extérieure" }],
                            targets: [{ id: "heritage", label: "Patrimoine UNESCO", accept: ["piazza"] }, { id: "reserve", label: "Réserve écologique", accept: ["lagune"] }],
                        };
                        break;
                }

                currentPuzzleData.scene = this.sys.settings.key; // Ajoute toujours la clé de scène
                currentPuzzleData.badgeId = info.badgeId;
                currentPuzzleData.id = key;
                buttonText = `Console Inondation (Niv. ${currentLevel}/8)`;
                buttonColor = 0x2980b9;
                break;
            }
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
    }
}