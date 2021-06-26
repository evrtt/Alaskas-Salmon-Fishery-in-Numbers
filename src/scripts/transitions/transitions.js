import { raiseWave, drawTransitionWave } from '../util/wave.js'


export const toSplash = (current) => {
  const toView = document.getElementById('splash')
  current ||= document.querySelector('.current')
  console.log(current, 'current', toView, 'toView')  
  console.log(current.id)
  if(current.id !== 'splash') {
    if(current.id === 'data') {
      drawTransitionWave()
    }
    raiseWave(15, 'up', toView, current)
  }

}
export const toIntro = (current) => {
  const toView = document.getElementById('intro')
  current ||= document.querySelector('.current')
  console.log(current, 'current', toView, 'toView')
  console.log(current.id)
  if(current.id !== 'intro') {
    if (current.id === 'data') {
      drawTransitionWave()
    }
    raiseWave(15, 'up', toView, current)
  }
}

export const toSalmonSpecies = (current) => {
  const toView = document.getElementById('salmon-species')
  current ||= document.querySelector('.current')
  console.log(current, 'current', toView, 'toView')
  console.log(current.id)
  if(current.id !== 'salmon-species') {
    if (current.id === 'data') {
      drawTransitionWave()
    }
    raiseWave(15, 'up', toView, current)
  }

}
export const toData = (current) => {
  const toView = document.getElementById('data')
  current ||= document.querySelector('.current')
  console.log(current, 'current', toView, 'toView')
  if(current.id !== 'data'){
    raiseWave(15, 'down', toView, current)
  }
}
