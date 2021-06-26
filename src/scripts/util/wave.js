import {renderAK , clearAK} from '../util/alaska.js'
import {
  toIntro,
  toSalmonSpecies,
  toData
} from '../transitions/transitions.js'

export const drawTransitionWave = () => {

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

export const raiseWave = (amt, direction, toView, fromView) => {
  
  const waveTop = document.getElementsByClassName('wave-top')[0]
  const waveBottom = document.getElementsByClassName('wave-bottom')[0]
  
  const toggleView = view => {
    view.classList.toggle('display-none')
    view.classList.toggle('current')
  }

  if (amt >= window.innerHeight - 1) { 

    const buttons = {
      splash: ['intro-button', toIntro],
      intro: ['salmon-species-button', toSalmonSpecies],
      salmonspecies: ['data-button', toData]
    }
    let prevButton;
    let nextButton;
    if (direction === 'down') {

      toggleView(fromView)
      toggleView(toView)
      renderAK()
      prevButton = [
        document.getElementById(buttons[fromView.id.split('-').join('')][0]),
        buttons[fromView.id.split('-').join('')][1]
      ]

    } else if (direction === 'up') {
      if(fromView.id === 'data'){
        clearAK()
      } else {
        prevButton = [
          document.getElementById(buttons[fromView.id.split('-').join('')][0]),
          buttons[fromView.id.split('-').join('')][1]
        ]
      }
      nextButton = [
        document.getElementById(buttons[toView.id.split('-').join('')][0]),
        buttons[toView.id.split('-').join('')][1]
       ]
      toggleView(fromView)
      toggleView(toView)
    }
    window.requestAnimationFrame(() => lowerWave(amt, direction, prevButton, nextButton) )
  } else {
    amt += Math.sqrt(window.innerHeight - amt)
    waveTop.style.bottom = `${amt}px`
    waveBottom.style.height = `${amt + 1}px`
    window.requestAnimationFrame(() => raiseWave(amt, direction, toView, fromView))
  }
}

export const lowerWave = (amt, direction, prevButton, nextButton) => {
  
  const waveTop = document.querySelector('.wave-top')
  const waveBottom = document.querySelector('.wave-bottom')
  

  if (direction === 'up' && !!prevButton){
    if (amt - window.innerHeight >= 0) {
      amt -= Math.sqrt(((1.01 * amt) - window.innerHeight)/4)
      waveTop.style.bottom = `${amt}px`
      waveBottom.style.height = `${amt}px`
      window.requestAnimationFrame(() => lowerWave(amt, direction, prevButton, nextButton))
    } else if (amt - window.innerHeight < 0 && amt > 10) {
      amt -= Math.sqrt((window.innerHeight - (window.innerHeight - amt))/4)
      const vertOffset = 85 + (window.innerHeight - amt) / 20
      if (vertOffset >= 105 ) {
        prevButton[0].style.display = "none"
      } else {
        prevButton[0].style.top = (`${vertOffset}%`)
      }
      nextButton[0].style.display = 'block'
      nextButton[0].style.top = '85%'
      nextButton[0].style.left = `${50 + amt / 10}%`
      waveTop.style.bottom = `${amt}px`
      waveBottom.style.height = `${amt}px`
      window.requestAnimationFrame(() => lowerWave(amt, direction, prevButton, nextButton))
    } else if (amt <= 10) {
      waveTop.style.bottom = '0px'
      waveBottom.style.height = '0px'
      prevButton[0].classList.toggle('current-button')
      prevButton[0].classList.toggle('next-button')
      prevButton[0].style.top = '85%'
      nextButton[0].classList.toggle('current-button')
      nextButton[0].classList.toggle('next-button')
      const current = document.querySelector('.current')
      console.log(current)
      nextButton[0].addEventListener('click', () => nextButton[1](current))
    }
  } else if (direction === 'down') {
    if (amt > window.innerHeight) {
      amt -= Math.sqrt(100)
      const vertOffset = 85 + (window.innerHeight - amt) / 20
      if (vertOffset >= 105) {
        prevButton[0].style.display = "none"
      } else {
        prevButton[0].style.top = (`${vertOffset}%`)
      }
      waveTop.style.bottom = `${amt}px`
      waveBottom.style.height = `${amt}px`
      window.requestAnimationFrame(() => lowerWave(amt, direction, prevButton, nextButton))
    } else if (amt > 0) {
      amt -= Math.sqrt(100 + (window.innerHeight - amt))
      const vertOffset = 85 + (window.innerHeight - amt) / 20
      if (vertOffset >= 105) {
      prevButton[0].style.display = "none"
      } else {
      prevButton[0].style.top = (`${vertOffset}%`)
      }
      waveTop.style.bottom = `${amt}px`
      waveBottom.style.height = `${amt}px`
      window.requestAnimationFrame(() => lowerWave(amt, direction, prevButton, nextButton))
    } else if(amt < 0 && amt > -420) {
      amt -= Math.sqrt(100 + (window.innerHeight - amt))
      prevButton[0].classList.toggle('current-button')
      prevButton[0].classList.toggle('next-button')
      prevButton[0].style.top = '85%'
      waveTop.style.bottom = `${amt}px`
      waveBottom.style.height = 0
      window.requestAnimationFrame(() => lowerWave(amt, direction, prevButton, nextButton))
    } else if (amt < -420) {
      waveTop.remove()
      const current = document.querySelector('.current')
      console.log(current)    }
  } else if (direction === 'up' && !prevButton) {
    if (amt - window.innerHeight >= 0) {
      amt -= Math.sqrt(((1.01 * amt) - window.innerHeight) / 4)
      waveTop.style.bottom = `${amt}px`
      waveBottom.style.height = `${amt}px`
      window.requestAnimationFrame(() => lowerWave(amt, direction, prevButton, nextButton))
    } else if (amt - window.innerHeight < 0 && amt > 10) {
      amt -= Math.sqrt((window.innerHeight - (window.innerHeight - amt)) / 4)
      nextButton[0].style.top = '85%'
      nextButton[0].style.display = 'block'
      nextButton[0].style.left = `${50 + amt / 10}%`
      waveTop.style.bottom = `${amt}px`
      waveBottom.style.height = `${amt}px`
      window.requestAnimationFrame(() => lowerWave(amt, direction, prevButton, nextButton))
    } else if (amt <= 10) {
      waveTop.style.bottom = '0px'
      waveBottom.style.height = '0px'
      nextButton[0].classList.toggle('current-button')
      nextButton[0].classList.toggle('next-button')
      const current = document.querySelector('.current')
      console.log(current)
      nextButton[0].addEventListener('click', () => nextButton[1](current))
    }
  }
}
