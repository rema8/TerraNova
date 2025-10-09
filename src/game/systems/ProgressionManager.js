// src/game/systems/progressionManager.js

import { badgeManager } from "./BadgeManager";

// Définition de la chaîne de progression (les prérequis)
export const PROGRESSION = {
    // VENISE (2 étapes)
    "venice-quiz-1": { badgeId: "badge-venise-protection-1", nextPuzzle: "venice-toggle-2", scene: "VeniceScene" },
    "venice-toggle-2": { badgeId: "badge-venise-protection-2", nextPuzzle: null, scene: "VeniceScene" },

    // KENYA (2 étapes)
    "kenya-faune-quiz-1": { badgeId: "badge-kenya-conservation-1", nextPuzzle: "kenya-dragdrop-2", scene: "KenyaScene" },
    "kenya-dragdrop-2": { badgeId: "badge-kenya-conservation-2", nextPuzzle: null, scene: "KenyaScene" },

    // MAROC (2 étapes)
    "maroc-dragdrop-1": { badgeId: "badge-maroc-solaire-1", nextPuzzle: "maroc-quiz-2", scene: "MarocScene" },
    "maroc-quiz-2": { badgeId: "badge-maroc-solaire-2", nextPuzzle: null, scene: "MarocScene" },
    
    // AMAZONIE (2 étapes)
    "amazonie-forest-1": { badgeId: "badge-amazonie-forestier-1", nextPuzzle: "amazonie-toggle-2", scene: "AmazonieScene" },
    "amazonie-toggle-2": { badgeId: "badge-amazonie-forestier-2", nextPuzzle: null, scene: "AmazonieScene" },
};

class ProgressionManager {
    // Cette méthode est utilisée pour vérifier si l'énigme est la première de sa série (sans prérequis)
    // Elle n'est plus critique car la logique est gérée par l'état des badges dans la scène
    canOpenPuzzle(puzzleId) {
        // Logique laissée ici pour la rétrocompatibilité, mais l'état est géré par la scène.
        return true; 
    }
}

export const progressionManager = new ProgressionManager();