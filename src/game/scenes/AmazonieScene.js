// src/game/scenes/AmazonieScene.js
import Phaser from "phaser";
import { puzzleManager } from "../systems/puzzleManager.js";
import { badgeManager } from "../systems/BadgeManager"; 
import { PROGRESSION } from "../systems/ProgressionManager";

export default class AmazonieScene extends Phaser.Scene {
    constructor() {
        super("AmazonieScene");
        this.handleBadgeUpdate = this.handleBadgeUpdate.bind(this);
    }
    
    handleBadgeUpdate(badgeData) {
        const { id: badgeId } = badgeData;
        if (badgeId.startsWith("badge-amazonie-")) {
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
        this.cameras.main.setBackgroundColor("#084c28"); 
        
        let currentPuzzleData = null;
        let buttonText = "Salle Complète ! (8/8)";
        let buttonColor = 0x6a6a6a; 
        let currentLevel = 1;

        const puzzleKeys = Object.keys(PROGRESSION).filter(key => key.startsWith("amazonie-"));
        
        for (let i = 0; i < puzzleKeys.length; i++) {
            const key = puzzleKeys[i];
            const info = PROGRESSION[key];
            if (!badgeManager.unlockedBadges.has(info.badgeId)) {
                currentLevel = i + 1;
                
                switch (key) {
                    case "amazonie-drag-1":
                        currentPuzzleData = { ...info, type: "dragdrop", title: "Reboisement Anti-Érosion : Niveau 1",
                            prompt: "GLISSEZ chaque plant vers la zone qui a le plus besoin de sa capacité de fixation pour lutter contre l'érosion.",
                            items: [{ id: "rizhome", label: "Plante à rhizomes" }, { id: "pivot", label: "Plante à racines pivots" }],
                            targets: [{ id: "ravinement", label: "Zone de Ravinement (Horizontal)", accept: ["rizhome"] }, { id: "profondeur", label: "Zone Stable Profonde (Vertical)", accept: ["pivot"] }],
                        };
                        break;
                    case "amazonie-toggle-2":
                        currentPuzzleData = { ...info, type: "toggle", title: "Contrôle d'Humidité : Niveau 2", 
                            prompt: "Activez les zones où l'humidité est critique (Vrai = Critique).",
                            targets: [false, true, true, false, true], 
                        };
                        break;
                    case "amazonie-quiz-3":
                        currentPuzzleData = { ...info, type: "quiz", title: "Cycle de l'Eau : Niveau 3", 
                            prompt: "Quel processus vital la forêt amazonienne régule-t-elle, créant ses propres précipitations ?",
                            choices: ["La condensation", "La transpiration", "La percolation"], answerIndex: 1,
                            hints: ["L'eau est libérée par les feuilles.", "Elle est souvent comparée à une 'rivière volante'."],
                        };
                        break;
                    case "amazonie-letter-4":
                        currentPuzzleData = { ...info, type: "letterpuzzle", title: "Déforestation Illicite : Niveau 4",
                            prompt: "Quel type d'activité illégale est la principale cause de la déforestation en Amazonie ? (Mot en 6 lettres)",
                            answer: "Minage",
                            hints: ["Elle est souvent liée à l'or.", "Elle pollue les rivières avec du mercure."],
                        };
                        break;
                    case "amazonie-drag-5":
                        currentPuzzleData = { ...info, type: "dragdrop", title: "Classification du Sol : Niveau 5",
                            prompt: "Associez les éléments à la couche de sol la plus appropriée.",
                            items: [{ id: "racine", label: "Racines profondes" }, { id: "humus", label: "Matière organique (Humus)" }],
                            targets: [{ id: "surface", label: "Couche de surface", accept: ["humus"] }, { id: "soussol", label: "Sous-sol profond", accept: ["racine"] }],
                        };
                        break;
                    case "amazonie-toggle-6":
                        currentPuzzleData = { ...info, type: "toggle", title: "Surveillance Incendies : Niveau 6",
                            prompt: "Désactivez les alarmes des zones où la température est normale (Faux = Normal).",
                            targets: [true, false, false, true], 
                        };
                        break;
                    case "amazonie-quiz-7":
                        currentPuzzleData = { ...info, type: "quiz", title: "Biodiversité Clé : Niveau 7", 
                            prompt: "Quel groupe d'animaux est le plus impacté par la fragmentation de l'habitat, car il dépend des canopées continues ?",
                            choices: ["Reptiles", "Oiseaux", "Primates"], answerIndex: 2,
                            hints: ["Ils vivent dans les arbres et ressemblent aux humains.", "Ils ont besoin de lianes et de branches."],
                        };
                        break;
                    case "amazonie-letter-8":
                        currentPuzzleData = { ...info, type: "letterpuzzle", title: "Protocole de Conservation : Niveau 8",
                            prompt: "Quel mot désigne une zone de l'Amazonie protégée où toute exploitation est interdite ? (Mot en 6 lettres)",
                            answer: "Réserve",
                            hints: ["Elle est souvent délimitée par la loi.", "Elle sert à la conservation intégrale."],
                        };
                        break;
                }

                currentPuzzleData.scene = this.sys.settings.key;
                currentPuzzleData.badgeId = info.badgeId;
                currentPuzzleData.id = key;
                buttonText = `Contrôle Forestier (Niv. ${currentLevel}/8)`;
                buttonColor = 0x27ae60; 
                break;
            }
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