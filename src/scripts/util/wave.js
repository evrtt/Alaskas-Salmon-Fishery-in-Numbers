import {renderAK , clearAK} from '../util/alaska.js'

export const addWaveCanvas = () => {

}

export const removeWave = () => {
  document.querySelector('.wave-top');
  canvas.id = "hidden-wave"
}


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

// export const drawStaticWave = (color, element) => {

//   let selector = color[0] === '#' ? color.slice(1) : color

//   let iterator = 120
//   let canvas = document.querySelector(`.static-wave-${selector}`)
//   if (canvas) {
//     null
//   } else {
//     canvas = document.createElement('canvas');
//     canvas.classList.add(`static-wave-${selector}`);
//     element.appendChild(canvas)
//   }

//   const context = canvas.getContext('2d');
//   const radius = 1000

//   window.requestAnimationFrame(() => drawFrame(iterator))

//   const drawFrame = (iterator) => {
    

//     const width = (Math.floor(window.innerWidth / 1000) + 2) * 1000
//     canvas.width = context.width = window.innerWidth
//     const height = canvas.height = context.height = 420
//     const numLoops = (width) / 1000 + 2
//     let changeSmallX;
//     let moveCenter;

    

//     const mod60 = iterator % 60
//     const mod30 = iterator % 30
//     if (iterator === 0) {
//       changeSmallX = radius
//       moveCenter = 0
//     } else if (iterator > 0 && iterator < 30) {
//       changeSmallX = 2 * radius * (Math.sin(((Math.PI * (60 - (mod30 * 2))) / 180) / 2))
//       moveCenter = ((radius / 2) - (changeSmallX / 2))
      
//     } else if (iterator === 30) {
//       changeSmallX = 0
//       moveCenter = radius / 2
      
//     } else if (iterator > 30 && iterator < 60) {
//       changeSmallX = 2 * radius * (Math.sin(((Math.PI * mod30 * 2) / 180) / 2))
//       moveCenter = radius - ((radius / 2) - (changeSmallX / 2))
      
//     } else if (iterator === 60) {
//       changeSmallX = radius
//       moveCenter = radius
      
//     } else if (iterator > 60 && iterator < 90) {
//       changeSmallX = 2 * radius * (Math.sin(((Math.PI * (60 - (mod30 * 2))) / 180) / 2))
//       moveCenter = ((radius / 2) - (changeSmallX / 2)) + radius
      
//     } else if (iterator === 90) {
//       changeSmallX = 0
//       moveCenter = radius * 1.5
      
//     } else if (iterator > 90 && iterator < 120) {
//       changeSmallX = 2 * radius * (Math.sin(((Math.PI * mod30 * 2) / 180) / 2))
//       moveCenter = radius * 2 - ((radius / 2) - (changeSmallX / 2))
//     }

//     const changeY = Math.sqrt((radius ** 2) - ((radius / 2) ** 2)) * 2

//     context.clearRect(0, 0, width, height)
//     for (let i = 0; i < numLoops; i++) {

//       if (i === 0) {

//         if (iterator > 59) {

//           context.beginPath()
//           context.arc((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
//           context.lineTo(radius * 2 - (moveCenter - 1), (changeY / 2) - 580)
//           context.lineTo(radius * 2 - (moveCenter - 1), height + 1)
//           context.lineTo(0, height + 1)
//           context.fillStyle = color
//           context.fill()

//         } else {

//           context.beginPath()
//           context.arc((radius / 2) - moveCenter, -580, radius, (Math.PI * 60) / 180, (Math.PI * (120 - mod60)) / 180, false)
//           context.lineTo(0, height + 1)
//           context.lineTo(radius * 2 - (moveCenter - 1), height + 1)
//           context.lineTo(radius * 2 - (moveCenter - 1), (changeY / 2) - 580)
//           context.moveTo((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, (changeY / 2) - 580)
//           context.arc((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
//           context.fillStyle = color
//           context.fill()
//         }

//       } else if (i === numLoops - 1) {

//         context.beginPath()
//         context.arc((radius / 2) + (radius * i * 2) - moveCenter, -580, radius, (Math.PI * 60) / 180, (Math.PI * 120) / 180, false)
//         context.lineTo(radius * 2 * i - moveCenter, height + 1)
//         context.lineTo(radius * (2 + (i * 2)) - moveCenter, height + 1)
//         context.lineTo(radius * (2 + (i * 2)) - moveCenter, (changeY / 2) - 580)
//         context.moveTo((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, (changeY / 2) - 580)
//         context.arc((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
//         context.fillStyle = color
//         context.fill()
//       } else {

//         context.beginPath()
//         context.arc((radius / 2) + (radius * i * 2) - moveCenter, -580, radius, (Math.PI * 60) / 180, (Math.PI * 120) / 180, false)
//         context.lineTo(0 + radius * 2 * i - moveCenter, height + 1)
//         context.lineTo(radius * (2 + (i * 2)) - moveCenter, height + 1)
//         context.lineTo(radius * (2 + (i * 2)) - moveCenter, (changeY / 2) - 580)
//         context.moveTo((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, (changeY / 2) - 580)
//         context.arc((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
//         context.fillStyle = color
//         context.fill()
//       }
//     }

//     iterator = iterator === 0 ? 119.5 : iterator - 0.5
//     window.requestAnimationFrame(() => drawFrame(iterator))
//   }
// }

export const raiseWave = (amt, direction, toView, fromView) => {
  
  console.log(toView, "toView", fromView, 'fromView')

  const waveTop = document.getElementsByClassName('wave-top')[0]
  const waveBottom = document.getElementsByClassName('wave-bottom')[0]
  
  const toggleView = view => {
    view.classList.toggle('display-none')
    view.classList.toggle('current')
  }

  if (amt >= window.innerHeight - 1) { 

    const buttons = {
      splash: 'intro-button',
      intro: 'salmon-species-button',
      salmonspecies: 'data-button'
    }
    let prevButton;
    let nextButton;
    if (direction === 'down') {
      // toggleView(fromView)
      // toggleView(toView)
      // document.querySelector('.scroll-down').addEventListener('click', () => toIntro(current))
    } else if (direction === 'up') {
      nextButton = document.getElementById(buttons[toView.id.split('-').join()])
      prevButton = document.getElementById(buttons[fromView.id.split('-').join()])
      console.log(prevButton, 'prevButton', nextButton, 'nextButton')
      toggleView(fromView)
      toggleView(toView)
      // document.querySelector('.scroll-down').addEventListener('click', () => toIntro(current))
    }
    window.requestAnimationFrame(() => lowerWave(amt, direction, prevButton, nextButton) )
  } else {
    amt += Math.sqrt(window.innerHeight - amt)
    waveTop.style.bottom = `${amt}px`
    waveBottom.style.height = `${amt + 1}px`
    window.requestAnimationFrame(() => raiseWave(amt, direction, toView, fromView))
  }
}

export const lowerWave = (amt, direction, current, next) => {
  
  const waveTop = document.querySelector('.wave-top')
  const waveBottom = document.querySelector('.wave-bottom')
  


  if (amt - window.innerHeight >= 0) {

    // if (direction === 'up') {
    //   const currentscrollDown = document.querySelector('.current-button')
    //   if (toView.id === 'intro') {
    //     currentscrollDown.innerHTML = "View Salmon Species -->"
    //   } else if (toView.id === 'splash') {
    //     currentscrollDown.innerHTML = "To Introduction --> "
    //   } else if (toView.id === 'salmon-species') {
    //     currentscrollDown.innerHTML = 'View Data -->'
    //   }
    // }
    if (direction === 'down') {
      // const scrollDown = document.querySelector('.scroll-down')
      // scrollDown.style.bottom = `${-(window.innerHeight - amt)}px`
      // const splashContainer = document.querySelector('.splashContainer')
      // splashContainer.style.position = 'fixed'
    } 
    amt -= Math.sqrt(((1.01 * amt) - window.innerHeight)/4)
    waveTop.style.bottom = `${amt}px`
    waveBottom.style.height = `${amt}px`
    window.requestAnimationFrame(() => lowerWave(amt, direction, current, next))
  } else if (amt - window.innerHeight < 0) {
    amt -= Math.sqrt((window.innerHeight - (window.innerHeight - amt))/4)
    waveTop.style.bottom = `${amt}px`
    waveBottom.style.height = `${amt}px`
    window.requestAnimationFrame(() => lowerWave(amt, direction, current, next))
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
