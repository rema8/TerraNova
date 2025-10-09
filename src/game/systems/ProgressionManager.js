// src/game/systems/progressionManager.js

import { badgeManager } from "./BadgeManager";

// Définition de la chaîne de progression (les prérequis)
export const PROGRESSION = {
    // Premier badge de Venise
    "venice-quiz-1": { badgeId: "badge-venise-protection-1", nextPuzzle: "venice-toggle-2", scene: "VeniceScene" },
    // Deuxième énigme de Venise (débloquée après 'venice-quiz-1')
    "venice-toggle-2": { badgeId: "badge-venise-protection-2", nextPuzzle: null, scene: "VeniceScene" },

    // Première énigme du Kenya (sans prérequis si on commence là)
    "kenya-faune-quiz-1": { badgeId: "badge-kenya-conservation-1", nextPuzzle: "kenya-dragdrop-2", scene: "KenyaScene" },
    // Deuxième énigme du Kenya
    "kenya-dragdrop-2": { badgeId: "badge-kenya-conservation-2", nextPuzzle: null, scene: "KenyaScene" },

    // ... Ajoutez vos autres énigmes ici (Maroc, Amazonie)
    "maroc-dragdrop-1": { badgeId: "badge-maroc-solaire", nextPuzzle: null, scene: "MarocScene" },
    "amazonie-forest": { badgeId: "badge-amazonie-forestier", nextPuzzle: null, scene: "AmazonieScene" },
};

class ProgressionManager {
    // Vérifie si un joueur a le badge requis pour une énigme
    canOpenPuzzle(puzzleId) {
        // Si l'énigme n'a pas de pré-requis (c'est la première de la chaîne)
        if (!puzzleId) return true;

        const info = PROGRESSION[puzzleId];
        if (!info) return true; // Si l'ID n'existe pas, on laisse ouvrir par défaut

        // Vérifie si l'énigme précédente dans la chaîne a été résolue
        // (Pour l'instant, nous utiliserons la présence du badge précédent comme indicateur)
        
        let previousPuzzleId = null;
        for (const id in PROGRESSION) {
            if (PROGRESSION[id].nextPuzzle === puzzleId) {
                previousPuzzleId = id;
                break;
            }
        }

        if (!previousPuzzleId) {
            // C'est la première énigme de la série, elle est toujours ouverte
            return true;
        }

        const requiredBadgeId = PROGRESSION[previousPuzzleId].badgeId;
        
        // La nouvelle énigme ne peut être ouverte que si le badge précédent a été débloqué.
        const isPreviousSolved = badgeManager.unlockedBadges.has(requiredBadgeId);
        
        if (!isPreviousSolved) {
            console.warn(`[Progression] Le badge ${requiredBadgeId} est requis pour ouvrir ${puzzleId}.`);
        }
        return isPreviousSolved;
    }
    
    // Récupère l'ID de la prochaine énigme de cette scène
    getNextPuzzleId(currentPuzzleId) {
        return PROGRESSION[currentPuzzleId] ? PROGRESSION[currentPuzzleId].nextPuzzle : null;
    }
}

export const progressionManager = new ProgressionManager();