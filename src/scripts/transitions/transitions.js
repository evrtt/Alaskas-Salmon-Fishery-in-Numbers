import { raiseWave } from '../util/wave.js'


export const toSplash = fromView => {
  const toView = document.getElementById('splash')
  raiseWaive(15, 'up', toView, fromView)
}
export const toIntro = fromView => {

  const toView = document.getElementById('intro')
  console.log(fromView, 'fromView', toView, 'toView')
  raiseWave(15, 'up', toView, fromView)
}
export const toSalmonSpecies = fromView => {
  const toView = document.getElementById('salmon-species')
  raiseWave(15, 'up', toView, fromView)
}
export const toData = fromView => {
  raiseWave(15, 'up', 'data')
}
