import { renderAK , clearAK} from '../util/alaska.js'
import { removeSplash, renderSplash } from './splash.js'

export const addWaveCanvas = () => {

}

export const removeWave = () => {
  document.querySelector('.wave-top');
  canvas.id = "hidden-wave"
}

export const drawWave = () => {

  let iterator = 120
  let canvas = document.querySelector('.wave-top')
  if (canvas) {
    null
  } else {
    const div = document.querySelector(".data-container");
    canvas = document.createElement('canvas');
    canvas.classList.add('wave-top');
    div.appendChild(canvas)
  }

  const context = canvas.getContext('2d');
  const radius = 1000

  window.requestAnimationFrame(() => drawFrame(iterator))

  const drawFrame = (iterator) => {
    

    const width = (Math.floor(window.innerWidth / 1000) + 1) * 1000
    canvas.width = context.width = width
    const height = canvas.height = context.height = 420
    const numLoops = (width) / 1000 + 2
    let changeSmallX;
    let moveCenter;

    const mod60 = iterator % 60
    const mod30 = iterator % 30
    if (iterator === 0) {
      changeSmallX = radius
      moveCenter = 0
    } else if (iterator > 0 && iterator < 30) {
      changeSmallX = 2 * radius * (Math.sin(((Math.PI * (60 - (mod30 * 2))) / 180) / 2))
      moveCenter = ((radius / 2) - (changeSmallX / 2))
      
    } else if (iterator === 30) {
      changeSmallX = 0
      moveCenter = radius / 2
      
    } else if (iterator > 30 && iterator < 60) {
      changeSmallX = 2 * radius * (Math.sin(((Math.PI * mod30 * 2) / 180) / 2))
      moveCenter = radius - ((radius / 2) - (changeSmallX / 2))
      
    } else if (iterator === 60) {
      changeSmallX = radius
      moveCenter = radius
      
    } else if (iterator > 60 && iterator < 90) {
      changeSmallX = 2 * radius * (Math.sin(((Math.PI * (60 - (mod30 * 2))) / 180) / 2))
      moveCenter = ((radius / 2) - (changeSmallX / 2)) + radius
      
    } else if (iterator === 90) {
      changeSmallX = 0
      moveCenter = radius * 1.5
      
    } else if (iterator > 90 && iterator < 120) {
      changeSmallX = 2 * radius * (Math.sin(((Math.PI * mod30 * 2) / 180) / 2))
      moveCenter = radius * 2 - ((radius / 2) - (changeSmallX / 2))
    }

    const changeY = Math.sqrt((radius ** 2) - ((radius / 2) ** 2)) * 2

    context.clearRect(0, 0, width, height)
    for (let i = 0; i < numLoops; i++) {

      if (i === 0) {

        if (iterator > 59) {

          context.beginPath()
          context.arc((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
          context.lineTo(radius * 2 - (moveCenter - 1), (changeY / 2) - 580)
          context.lineTo(radius * 2 - (moveCenter - 1), height)
          context.lineTo(0, height)
          context.fillStyle = 'blue'
          context.fill()

        } else {

          context.beginPath()
          context.arc((radius / 2) - moveCenter, -580, radius, (Math.PI * 60) / 180, (Math.PI * (120 - mod60)) / 180, false)
          context.lineTo(0, height)
          context.lineTo(radius * 2 - (moveCenter - 1), height)
          context.lineTo(radius * 2 - (moveCenter - 1), (changeY / 2) - 580)
          context.moveTo((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, (changeY / 2) - 580)
          context.arc((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
          context.fillStyle = 'blue'
          context.fill()
        }

      } else if (i === numLoops - 1) {

        context.beginPath()
        context.arc((radius / 2) + (radius * i * 2) - moveCenter, -580, radius, (Math.PI * 60) / 180, (Math.PI * 120) / 180, false)
        context.lineTo(radius * 2 * i - moveCenter, height)
        context.lineTo(radius * (2 + (i * 2)) - moveCenter, height)
        context.lineTo(radius * (2 + (i * 2)) - moveCenter, (changeY / 2) - 580)
        context.moveTo((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, (changeY / 2) - 580)
        context.arc((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
        context.fillStyle = 'blue'
        context.fill()
      } else {

        context.beginPath()
        context.arc((radius / 2) + (radius * i * 2) - moveCenter, -580, radius, (Math.PI * 60) / 180, (Math.PI * 120) / 180, false)
        context.lineTo(0 + radius * 2 * i - moveCenter, height)
        context.lineTo(radius * (2 + (i * 2)) - moveCenter, height)
        context.lineTo(radius * (2 + (i * 2)) - moveCenter, (changeY / 2) - 580)
        context.moveTo((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, (changeY / 2) - 580)
        context.arc((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
        context.fillStyle = 'blue'
        context.fill()
      }
    }

    iterator = iterator === 0 ? 119.5 : iterator - 0.5
    window.requestAnimationFrame(() => drawFrame(iterator))
  }
}

export const raiseWave = (amt, direction) => {
  
  const waveTop = document.getElementsByClassName('wave-top')[0]
  const waveBottom = document.getElementsByClassName('wave-bottom')[0]
  

  if (amt >= window.innerHeight - 1) { 
    if (direction === 'down') {
      removeSplash();
      renderAK();
    } else if (direction === 'up') {
      clearAK();
      renderSplash();
    }
    window.requestAnimationFrame(() => lowerWave(amt, direction) )
  } else {
    if(direction === 'up') {
      const scrollDown = document.querySelector('.scroll-down')
      scrollDown.style.bottom = `${amt - window.innerHeight}px`
    }
    amt += Math.sqrt(window.innerHeight - amt)
    waveTop.style.bottom = `${amt}px`
    waveBottom.style.height = `${amt + 1}px`
    window.requestAnimationFrame(() => raiseWave(amt, direction))
  }
}

export const lowerWave = (amt, direction) => {
  
  const waveTop = document.querySelector('.wave-top')
  const waveBottom = document.querySelector('.wave-bottom')
  


  if (amt > 0) {

    if (direction === 'down') {
      const scrollDown = document.querySelector('.scroll-down')
      scrollDown.style.bottom = `${-(window.innerHeight - amt)}px`
      // const splashContainer = document.querySelector('.splashContainer')
      // splashContainer.style.position = 'fixed'
    }
    
    amt -= Math.sqrt(window.innerHeight - amt)
    waveTop.style.bottom = `${amt}px`
    waveBottom.style.height = `${amt}px`
    window.requestAnimationFrame(() => lowerWave(amt, direction))
  } else if (amt < 800 && amt > -300) {
    if (direction === 'down') {
      amt -= Math.sqrt(600)
      waveTop.style.bottom = `${amt}px`
      waveBottom.style.height = `${0}px`
      window.requestAnimationFrame(() => lowerWave(amt, direction))
    } else {
      slowDown(amt)
    }
  } else {
    if (direction === 'down')
      waveTop.remove()
  }
}

const slowDown = (height) => {

  const waveTop = document.querySelector('.wave-top')
  const waveBottom = document.querySelector('.wave-bottom')

  if (height > 0) {
    height /= 3
    waveBottom.style.height = `${height}px`
    waveTop.style.bottom = `${height}px`
    window.requestAnimationFrame(() => slowDown(height))
  } else {
    waveBottom.style.height = '0px'
    waveTop.style.bottom = `${0}px`
  }
}
