import { raiseWave } from '../util/wave.js'


export const toSplash = () => {
  const current = document.querySelector('.current')
  const toView = document.getElementById('splash')
  raiseWaive(15, 'up', toView, current)
}
export const toIntro = () => {
  const current = document.querySelector('.current')
  const toView = document.getElementById('intro')
  raiseWave(15, 'up', toView, current)
}
export const toSalmonSpecies = () => {
  const current = document.querySelector('.current')
  const toView = document.getElementById('salmon-species')
  raiseWave(15, 'up', toView, current)
}
export const toData = () => {
  const current = document.querySelector('.current')
  raiseWave(15, 'down', null, current)
}
