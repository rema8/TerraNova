// src/game/scenes/MarocScene.js
import Phaser from "phaser";
import { puzzleManager } from "../systems/puzzleManager";
import { badgeManager } from "../systems/BadgeManager"; 
import { PROGRESSION } from "../systems/ProgressionManager";

export default class MarocScene extends Phaser.Scene {
    constructor() {
        super("MarocScene");
        this.handleBadgeUpdate = this.handleBadgeUpdate.bind(this);
    }
    
    handleBadgeUpdate(badgeData) {
        const { id: badgeId } = badgeData;
        if (badgeId.startsWith("badge-maroc-")) {
            this.time.delayedCall(300, () => {
                this.children.getAll().forEach(child => {
                    if (child instanceof Phaser.GameObjects.Rectangle || child instanceof Phaser.GameObjects.Text) {
                         child.destroy();
                    }
                });
                this.create();
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
        const { width: w, height: h } = this.scale;
        this.cameras.main.setBackgroundColor("#3d2b1f");

        let currentPuzzleData = null;
        let buttonText = "Salle Complète ! (8/8)";
        let buttonColor = 0x6a6a6a; 
        let currentLevel = 1;

        const puzzleKeys = Object.keys(PROGRESSION).filter(key => key.startsWith("maroc-"));
        
        for (let i = 0; i < puzzleKeys.length; i++) {
            const key = puzzleKeys[i];
            const info = PROGRESSION[key];
            if (!badgeManager.unlockedBadges.has(info.badgeId)) {
                currentLevel = i + 1;
                
                switch (key) {
                    case "maroc-drag-1":
                        currentPuzzleData = { ...info, type: "dragdrop", title: "Optimisation Solaire : Niveau 1",
                            prompt: "GLISSEZ chaque panneau de direction vers la zone horaire où il est le plus efficace (SUD est le plus efficace).",
                            items: [{ id: "nord", label: "Nord (faible)" }, { id: "sud", label: "Sud (fort)" }],
                            targets: [{ id: "faible", label: "Zone faible", accept: ["nord"] }, { id: "forte", label: "Zone forte", accept: ["sud"] }],
                        };
                        break;
                    case "maroc-quiz-2":
                        currentPuzzleData = { ...info, type: "quiz", title: "Gestion des Ressources : Niveau 2",
                            prompt: "Quel défi majeur la centrale Noor Ouarzazate doit-elle relever dans le désert ?",
                            choices: ["Le stockage thermique nocturne", "L'approvisionnement en eau", "La corrosion due au sel"],
                            answerIndex: 1, hints: ["Le désert est très sec.", "Le nettoyage des miroirs est vital."],
                        };
                        break;
                    case "maroc-letter-3":
                        currentPuzzleData = { ...info, type: "letterpuzzle", title: "Technologie CST : Niveau 3",
                            prompt: "Quel type de centrale utilise des miroirs pour concentrer la lumière du soleil sur un point central afin de chauffer un fluide ? (Mot en 5 lettres)",
                            answer: "Tour",
                            hints: ["Structure verticale.", "Sert à la concentration."],
                        };
                        break;
                    case "maroc-toggle-4":
                        currentPuzzleData = { ...info, type: "toggle", title: "Contrôle des Batteries : Niveau 4",
                            prompt: "Activez les systèmes de refroidissement des batteries de stockage (Vrai = Actif).",
                            targets: [true, true, false, true],
                        };
                        break;
                    case "maroc-drag-5":
                        currentPuzzleData = { ...info, type: "dragdrop", title: "Nettoyage des Miroirs : Niveau 5",
                            prompt: "Associez les techniques de nettoyage à leur impact sur les ressources.",
                            items: [{ id: "robot", label: "Robots à brosses sèches" }, { id: "eau", label: "Nettoyage à l'eau" }],
                            targets: [{ id: "economie", label: "Économie d'eau", accept: ["robot"] }, { id: "performance", label: "Haute performance", accept: ["eau"] }],
                        };
                        break;
                    case "maroc-quiz-6":
                        currentPuzzleData = { ...info, type: "quiz", title: "Réseau Électrique : Niveau 6",
                            prompt: "Pour quel pays la centrale Noor Ouarzazate est-elle devenue un modèle en matière d'exportation d'énergie verte ?",
                            choices: ["Espagne", "France", "Mauritanie"], answerIndex: 0,
                            hints: ["C'est un voisin européen.", "Elle est reliée à l'Europe par câble."],
                        };
                        break;
                    case "maroc-letter-7":
                        currentPuzzleData = { ...info, type: "letterpuzzle", title: "Pollution Atmosphérique : Niveau 7",
                            prompt: "Quel phénomène naturel désertique entrave le plus l'efficacité des miroirs solaires ? (Mot en 6 lettres)",
                            answer: "Sable",
                            hints: ["C'est fin et ça vient du désert.", "Cela oblige à nettoyer les panneaux."],
                        };
                        break;
                    case "maroc-toggle-8":
                        currentPuzzleData = { ...info, type: "toggle", title: "Stockage Thermique : Niveau 8",
                            prompt: "Activez les réservoirs de stockage du sel fondu (Faux = Température non critique).",
                            targets: [true, false, true, true],
                        };
                        break;
                }

                currentPuzzleData.scene = this.sys.settings.key;
                currentPuzzleData.badgeId = info.badgeId;
                currentPuzzleData.id = key;
                buttonText = `Contrôle Solaire (Niv. ${currentLevel}/8)`;
                buttonColor = 0xf39c12; 
                break;
            }
        }

        // --- RENDU PHASER ---
        this.add.text(w / 2, 60, "Maroc – Centrale solaire Noor", { fontSize: "22px", color: "#fff7e6"}).setOrigin(0.5);

        const btn = this.add.rectangle(w / 2, h / 2, 250, 70, buttonColor).setInteractive({ useHandCursor: true });
        this.add.text(w / 2, h / 2, buttonText, { fontSize: "18px", color: "#fff"}).setOrigin(0.5);

        btn.on("pointerdown", () => {
            if (currentPuzzleData) {
                puzzleManager.openPuzzle(currentPuzzleData.id, currentPuzzleData);
            } else {
                 console.log("Salle Complète !");
            }
        });
    }
}