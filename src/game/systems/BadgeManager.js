// src/game/systems/badgeManager.js

// 🚨 REMPLACER : import { EventEmitter } from "events";
// PAR :
import Phaser from "phaser"; 

// Utiliser l'EventEmitter intégré à Phaser
class BadgeManager extends Phaser.Events.EventEmitter { 
  constructor() {
    super();
    // Clé: ID de l'énigme | Valeur: ID du badge débloqué
    this.solvedPuzzles = new Set();
    this.unlockedBadges = new Set();
  }

  // Enregistre qu'une énigme a été résolue et vérifie si un badge est à débloquer
  solvePuzzle(puzzleId, badgeId) {
    if (this.solvedPuzzles.has(puzzleId)) {
      console.log(`[Badges] Énigme ${puzzleId} déjà résolue.`);
      return;
    }

    this.solvedPuzzles.add(puzzleId);

    if (badgeId && !this.unlockedBadges.has(badgeId)) {
      this.unlockedBadges.add(badgeId);
      // Le manager émet l'événement de la même manière que l'ancien code
      this.emit("badgeUnlocked", { id: badgeId, puzzle: puzzleId });
      console.log(`🎉 Badge débloqué : ${badgeId} !`);
    }
  }

  getBadges() {
    return Array.from(this.unlockedBadges);
  }
}

export const badgeManager = new BadgeManager();