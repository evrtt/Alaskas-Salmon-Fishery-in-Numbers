import { raiseWave, drawTransitionWave } from '../util/wave.js'


export const toSplash = (current) => {
  const toView = document.getElementById('splash')
  current ||= document.querySelector('.current')
  if(current.id !== 'splash') {
    if(current.id === 'data') {
      drawTransitionWave()
    }
    const spanSelected = document.querySelector('.span-selected')
    const spanTo = document.getElementById('nav-splash-span')
    spanSelected.classList.remove('span-selected')
    spanTo.classList.add('span-selected')
    raiseWave(15, 'up', toView, current)
  }
  
  
}
export const toIntro = (current) => {
  const toView = document.getElementById('intro')
  current ||= document.querySelector('.current')
  if(current.id !== 'intro') {
    if (current.id === 'data') {
      drawTransitionWave()
    }
    const spanSelected = document.querySelector('.span-selected')
    const spanTo = document.getElementById('nav-intro-span')
    spanSelected.classList.remove('span-selected')
    spanTo.classList.add('span-selected')
    raiseWave(15, 'up', toView, current)
    
  }
}

export const toSalmonSpecies = (current) => {
  const toView = document.getElementById('salmon-species')
  current ||= document.querySelector('.current')
  if(current.id !== 'salmon-species') {
    if (current.id === 'data') {
      drawTransitionWave()
    }
    const spanSelected = document.querySelector('.span-selected')
    const spanTo = document.getElementById('nav-salmon-species-span')
    spanSelected.classList.remove('span-selected')
    spanTo.classList.add('span-selected')

    raiseWave(15, 'up', toView, current)
  }

}
export const toData = (current) => {
  const toView = document.getElementById('data')
  current ||= document.querySelector('.current')
  if(current.id !== 'data'){

    const spanSelected = document.querySelector('.span-selected')
    const spanTo = document.getElementById('nav-data-span')
    spanSelected.classList.remove('span-selected')
    spanTo.classList.add('span-selected')
    raiseWave(15, 'down', toView, current)
  }
}
