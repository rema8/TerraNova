// src/game/systems/progressionManager.js

import { badgeManager } from "./BadgeManager";

// NOUVELLE PROGRESSION : 8 ÉNIGMES PAR SALLE (32 TOTAL)
export const PROGRESSION = {
    // VENISE (8 étapes)
    "venice-quiz-1": { badgeId: "badge-venise-1", nextPuzzle: "venice-letter-2", scene: "VeniceScene" },
    "venice-letter-2": { badgeId: "badge-venise-2", nextPuzzle: "venice-toggle-3", scene: "VeniceScene" },
    "venice-toggle-3": { badgeId: "badge-venise-3", nextPuzzle: "venice-drag-4", scene: "VeniceScene" },
    "venice-drag-4": { badgeId: "badge-venise-4", nextPuzzle: "venice-quiz-5", scene: "VeniceScene" },
    "venice-quiz-5": { badgeId: "badge-venise-5", nextPuzzle: "venice-letter-6", scene: "VeniceScene" },
    "venice-letter-6": { badgeId: "badge-venise-6", nextPuzzle: "venice-toggle-7", scene: "VeniceScene" },
    "venice-toggle-7": { badgeId: "badge-venise-7", nextPuzzle: "venice-drag-8", scene: "VeniceScene" },
    "venice-drag-8": { badgeId: "badge-venise-8", nextPuzzle: null, scene: "VeniceScene" },

    // KENYA (8 étapes)
    "kenya-quiz-1": { badgeId: "badge-kenya-1", nextPuzzle: "kenya-drag-2", scene: "KenyaScene" },
    "kenya-drag-2": { badgeId: "badge-kenya-2", nextPuzzle: "kenya-letter-3", scene: "KenyaScene" },
    "kenya-letter-3": { badgeId: "badge-kenya-3", nextPuzzle: "kenya-toggle-4", scene: "KenyaScene" },
    "kenya-toggle-4": { badgeId: "badge-kenya-4", nextPuzzle: "kenya-quiz-5", scene: "KenyaScene" },
    "kenya-quiz-5": { badgeId: "badge-kenya-5", nextPuzzle: "kenya-drag-6", scene: "KenyaScene" },
    "kenya-drag-6": { badgeId: "badge-kenya-6", nextPuzzle: "kenya-letter-7", scene: "KenyaScene" },
    "kenya-letter-7": { badgeId: "badge-kenya-7", nextPuzzle: "kenya-toggle-8", scene: "KenyaScene" },
    "kenya-toggle-8": { badgeId: "badge-kenya-8", nextPuzzle: null, scene: "KenyaScene" },

    // MAROC (8 étapes)
    "maroc-drag-1": { badgeId: "badge-maroc-1", nextPuzzle: "maroc-quiz-2", scene: "MarocScene" },
    "maroc-quiz-2": { badgeId: "badge-maroc-2", nextPuzzle: "maroc-letter-3", scene: "MarocScene" },
    "maroc-letter-3": { badgeId: "badge-maroc-3", nextPuzzle: "maroc-toggle-4", scene: "MarocScene" },
    "maroc-toggle-4": { badgeId: "badge-maroc-4", nextPuzzle: "maroc-drag-5", scene: "MarocScene" },
    "maroc-drag-5": { badgeId: "badge-maroc-5", nextPuzzle: "maroc-quiz-6", scene: "MarocScene" },
    "maroc-quiz-6": { badgeId: "badge-maroc-6", nextPuzzle: "maroc-letter-7", scene: "MarocScene" },
    "maroc-letter-7": { badgeId: "badge-maroc-7", nextPuzzle: "maroc-toggle-8", scene: "MarocScene" },
    "maroc-toggle-8": { badgeId: "badge-maroc-8", nextPuzzle: null, scene: "MarocScene" },
    
    // AMAZONIE (8 étapes)
    "amazonie-drag-1": { badgeId: "badge-amazonie-1", nextPuzzle: "amazonie-toggle-2", scene: "AmazonieScene" },
    "amazonie-toggle-2": { badgeId: "badge-amazonie-2", nextPuzzle: "amazonie-quiz-3", scene: "AmazonieScene" },
    "amazonie-quiz-3": { badgeId: "badge-amazonie-3", nextPuzzle: "amazonie-letter-4", scene: "AmazonieScene" },
    "amazonie-letter-4": { badgeId: "badge-amazonie-4", nextPuzzle: "amazonie-drag-5", scene: "AmazonieScene" },
    "amazonie-drag-5": { badgeId: "badge-amazonie-5", nextPuzzle: "amazonie-toggle-6", scene: "AmazonieScene" },
    "amazonie-toggle-6": { badgeId: "badge-amazonie-6", nextPuzzle: "amazonie-quiz-7", scene: "AmazonieScene" },
    "amazonie-quiz-7": { badgeId: "badge-amazonie-7", nextPuzzle: "amazonie-letter-8", scene: "AmazonieScene" },
    "amazonie-letter-8": { badgeId: "badge-amazonie-8", nextPuzzle: null, scene: "AmazonieScene" },
};

class ProgressionManager {
    // Méthode de base (peut être simplifiée, mais on la garde pour la structure)
    canOpenPuzzle(puzzleId) {
        return true; 
    }
}

export const progressionManager = new ProgressionManager();