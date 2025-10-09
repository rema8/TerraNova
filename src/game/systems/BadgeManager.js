// src/game/systems/badgeManager.js

import Phaser from "phaser"; 
import { PROGRESSION } from "./ProgressionManager";

// Utiliser l'EventEmitter intégré à Phaser
class BadgeManager extends Phaser.Events.EventEmitter { 
  constructor() {
    super();
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
      
      // Événement pour la notification UI
      this.emit("badgeUnlocked", { id: badgeId, puzzle: puzzleId });
      
      //  NOUVEL ÉVÉNEMENT : Informe la scène de redémarrer après une progression réussie
      const sceneKey = PROGRESSION[puzzleId]?.scene;
      if (sceneKey) {
          this.emit("progressed", { puzzleId, scene: sceneKey }); 
      }
      
      console.log(`🎉 Badge débloqué : ${badgeId} !`);
    }
  }

  getBadges() {
    return Array.from(this.unlockedBadges);
  }
}

export const badgeManager = new BadgeManager();