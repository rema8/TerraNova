
class SimpleEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
  }

  emit(event, data) {
    if (!this.listeners[event]) return;
    for (const cb of this.listeners[event]) {
      try {
        cb(data);
      } catch (err) {
        console.error(`Erreur dans le listener pour l’événement "${event}":`, err);
      }
    }
  }
}

class PuzzleManager extends SimpleEventEmitter {
  constructor() {
    super();
    this.current = null;
  }

  openPuzzle(id, data) {
    this.current = { id, data };
    console.log("[PuzzleManager] Ouverture de l'énigme :", id);
    this.emit("open", this.current);
  }

  closePuzzle() {
    console.log("[PuzzleManager] Fermeture de l'énigme");
    this.current = null;
    this.emit("close");
  }
}

export const puzzleManager = new PuzzleManager();
