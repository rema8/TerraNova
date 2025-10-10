
const STORAGE_KEY = 'terranova2045-save'

class GameState {
  constructor() {
    this.reset()
  }

  reset() {
    this.inventory = new Set()
    this.flags = {
      veniceGateOpened: false,
      venicePuzzleSolved: false,
    }
    this.timeRemaining = 30 * 60 
  }

  addItem(item) { this.inventory.add(item) }
  hasItem(item) { return this.inventory.has(item) }
  removeItem(item) { this.inventory.delete(item) }

  setFlag(key, val=true) { this.flags[key] = val }
  getFlag(key) { return !!this.flags[key] }

  save() {
    const data = {
      inventory: [...this.inventory],
      flags: this.flags,
      timeRemaining: this.timeRemaining,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  load() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    try {
      const data = JSON.parse(raw)
      this.inventory = new Set(data.inventory || [])
      this.flags = { ...this.flags, ...(data.flags || {}) }
      if (typeof data.timeRemaining === 'number') this.timeRemaining = data.timeRemaining
      return true
    } catch (e) { console.warn('Load failed', e); return false }
  }
}

export const gameState = new GameState()
