// src/game/scenes/KenyaScene.js
import Phaser from "phaser";
import { puzzleManager } from "../systems/puzzleManager";
import { badgeManager } from "../systems/BadgeManager"; 
import { PROGRESSION } from "../systems/ProgressionManager";
import { SCENES } from "../constants/scenes";

export default class KenyaScene extends Phaser.Scene {
    constructor() {
        super(SCENES.KENYA); 
        this.handleBadgeUpdate = this.handleBadgeUpdate.bind(this);
    }
    
    handleBadgeUpdate(badgeData) {
        const { id: badgeId } = badgeData;
        if (badgeId.startsWith("badge-kenya-")) {
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

   
    createBackButton(w, h) {
        const backButton = this.add
            .rectangle(w - 70, 40, 120, 50, 0x5a5a5a) // Position en haut à droite
            .setInteractive({ useHandCursor: true })
            .setStrokeStyle(2, 0xffffff)
            .setAlpha(0.8);

        this.add
            .text(w - 70, 40, "ACCUEIL", {
                fontFamily: "Arial", 
                fontSize: "16px", 
                color: "#ffffff",
                fontWeight: "bold"
            })
            .setOrigin(0.5);

        // Action de retour : Arrête la scène actuelle et démarre le Hub
        backButton.on("pointerdown", () => {
            this.scene.stop(this.sys.settings.key);
            this.scene.start(SCENES.HUB); // Utilisation de SCENES.HUB
        });
        
        // Effet visuel au survol
        backButton.on('pointerover', () => backButton.setFillStyle(0x7f7f7f));
        backButton.on('pointerout', () => backButton.setFillStyle(0x5a5a5a));
    }
    
    create() {
        const { width: w, height: h } = this.scale;
        this.cameras.main.setBackgroundColor("#2a5934"); 
        
        let currentPuzzleData = null;
        let buttonText = "Salle Complète ! (8/8)";
        let buttonColor = 0x6a6a6a; 
        let currentLevel = 1;

        const puzzleKeys = Object.keys(PROGRESSION).filter(key => key.startsWith("kenya-"));
        
        for (let i = 0; i < puzzleKeys.length; i++) {
            const key = puzzleKeys[i];
            const info = PROGRESSION[key];
            if (!badgeManager.unlockedBadges.has(info.badgeId)) {
                currentLevel = i + 1;
                
                switch (key) {
                    case "kenya-quiz-1":
                        currentPuzzleData = { ...info, type: "quiz", title: "Faune en Danger : Niveau 1", 
                            prompt: "Quel produit du 'Géant de la Savane' est principalement motivé par le commerce illégal ?",
                            choices: ["La peau de zèbre", "La corne de rhinocéros", "L'ivoire d'éléphant"], answerIndex: 2, 
                            hints: ["C'est blanc et très dur.", "Il a fait l'objet d'un grand traité international."],
                        };
                        break;
                    case "kenya-drag-2":
                        currentPuzzleData = { ...info, type: "dragdrop", title: "Répartition des Espèces : Niveau 2", 
                            prompt: "Associez les rôles d'espèce dans l'écosystème.",
                            items: [{ id: "lion", label: "Prédateur Apex" }, { id: "herbivore", label: "Consommateur Primaire" }],
                            targets: [{ id: "sommet", label: "Contrôle la population", accept: ["lion"] }, { id: "base", label: "Mange les plantes", accept: ["herbivore"] }],
                        };
                        break;
                    case "kenya-letter-3":
                        currentPuzzleData = { ...info, type: "letterpuzzle", title: "Maladie et Climat : Niveau 3", 
                            prompt: "Quel type de maladie transmise par les tiques menace la faune en cas d'augmentation des températures ? (Mot en 5 lettres)",
                            answer: "Garde", // Correction: Fievre est en 5 lettres. 
                            hints: ["Elle cause une forte température.", "Le changement climatique favorise sa propagation."],
                        };
                        break;
                    case "kenya-toggle-4":
                        currentPuzzleData = { ...info, type: "toggle", title: "Détection Thermique : Niveau 4", 
                            prompt: "Activez les caméras thermiques (Vrai = Actif) pour surveiller la nuit.",
                            targets: [true, false, true, true], 
                        };
                        break;
                    case "kenya-quiz-5":
                        currentPuzzleData = { ...info, type: "quiz", title: "Exploitation Durable : Niveau 5", 
                            prompt: "Quel modèle de tourisme africain vise à minimiser l'impact environnemental tout en soutenant l'économie locale ?",
                            choices: ["Tourisme de masse", "Écotourisme", "Agritourisme"], answerIndex: 1,
                            hints: ["Le préfixe signifie 'environnement'.", "Il valorise la nature."],
                        };
                        break;
                    case "kenya-drag-6":
                        currentPuzzleData = { ...info, type: "dragdrop", title: "Gestion de l'Eau : Niveau 6", 
                            prompt: "Associez la technique de conservation de l'eau à son objectif.",
                            items: [{ id: "barrage", label: "Petits barrages" }, { id: "irrigation", label: "Irrigation goutte à goutte" }],
                            targets: [{ id: "economie", label: "Réduire le gaspillage", accept: ["irrigation"] }, { id: "stockage", label: "Collecter l'eau de pluie", accept: ["barrage"] }],
                        };
                        break;
                    case "kenya-letter-7":
                        currentPuzzleData = { ...info, type: "letterpuzzle", title: "Éducation Rurale : Niveau 7", 
                            prompt: "Quel mot désigne un membre d'une communauté qui protège et surveille activement la faune ? (Mot en 5 lettres)",
                            answer: "Garde",
                            hints: ["Il est souvent armé.", "Il travaille dans les réserves."],
                        };
                        break;
                    case "kenya-toggle-8":
                        currentPuzzleData = { ...info, type: "toggle", title: "Contrôle des Mouvements : Niveau 8", 
                            prompt: "Désactivez les colliers GPS des animaux ayant franchi les zones réglementées (Faux = Actif).",
                            targets: [false, true, false, false], 
                        };
                        break;
                }

                currentPuzzleData.scene = this.sys.settings.key;
                currentPuzzleData.badgeId = info.badgeId;
                currentPuzzleData.id = key;
                buttonText = `Protection de la Faune (Niv. ${currentLevel}/8)`;
                buttonColor = 0x447a3f;
                break;
            }
        }

        // --- RENDU PHASER ---
        this.add.text(w / 2, 60, "Salle : Kenya", { fontSize: "28px", color: "#ffffff"}).setOrigin(0.5);

        const puzzleBtn = this.add.rectangle(w / 2, h / 2, 220, 60, buttonColor).setInteractive({ useHandCursor: true });
        this.add.text(w / 2, h / 2, buttonText, { fontSize: "18px", color: "#ffffff"}).setOrigin(0.5);

        btn.on("pointerdown", () => {
        if (currentPuzzleData) {
          puzzleManager.openPuzzle(currentPuzzleData.id, currentPuzzleData);
        } else {
        // 🎉 Salle terminée
        this.children.removeAll();
        this.add.text(w / 2, h / 2 - 80, "🎉 Félicitations !", {
            fontFamily: "Arial",
            fontSize: "28px",
            color: "#ffffff",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.add.text(w / 2, h / 2 - 20, "Tu as terminé la salle du Kenya !", {
            fontFamily: "Arial",
            fontSize: "20px",
            color: "#c7ffd9",
        }).setOrigin(0.5);

        this.add.text(w / 2, h / 2 + 40, "Retourne au hub pour en choisir une autre 🌍", {
            fontFamily: "Arial",
            fontSize: "16px",
            color: "#9fe3c6",
        }).setOrigin(0.5);

        const backBtn = this.add.rectangle(w / 2, h / 2 + 120, 180, 50, 0x1e6f5c)
            .setInteractive({ useHandCursor: true })
            .setStrokeStyle(2, 0xffffff);
        this.add.text(w / 2, h / 2 + 120, "↩ Retour au hub", {
            fontFamily: "Arial",
            fontSize: "16px",
            color: "#ffffff",
        }).setOrigin(0.5);

        backBtn.on("pointerdown", () => this.scene.start(SCENES.HUB));
      }
    });


        // CRÉATION DU BOUTON DE RETOUR
        this.createBackButton(w, h);
    }
}