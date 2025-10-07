
import { gameState } from './gameState.js'

let interval = null

export function startGlobalTimer(onTick) {
  stopGlobalTimer()
  interval = setInterval(() => {
    gameState.timeRemaining = Math.max(0, gameState.timeRemaining - 1)
    if (typeof onTick === 'function') onTick(gameState.timeRemaining)
    if (gameState.timeRemaining === 0) stopGlobalTimer()
  }, 1000)
}

export function stopGlobalTimer() {
  if (interval) { clearInterval(interval); interval = null }
}
