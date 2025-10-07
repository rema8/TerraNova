
import { gameState } from './gameState.js'

export function addToInventory(item) {
  gameState.addItem(item)
  window.dispatchEvent(new CustomEvent('inventory:changed', { detail: [...gameState.inventory] }))
}
