import createObservers from './scripts/scroller.js';
import initializeData from './scripts/util/data_parser.js';
import { drawWave } from './scripts/util/wave.js';
// import {drawWave} from "./scripts/draw_wave.js"

const catchData = initializeData();

window.addEventListener("load", (e) => {
  createObservers();
}, false);

// const canvas = document.getElementById('canvas');
// const context = canvas.getContext('2d');
// const radius = 800
// const changeBigX = 2 * radius * (Math.sin(((Math.PI * 40 * 2) / 180) / 2))

// let iterator = 10
// const width = (Math.floor(window.innerWidth / 1000 ) + 1) * 1000
// canvas.width = context.width = width
// const height = canvas.height = context.height = 220
// const numLoops = (width) / 1000 + 2
// let changeSmallX; 
// let moveCenter;

// const mod40 = iterator % 40
// const mod20 = iterator % 20
// if (iterator > 0 && iterator < 30) {
//   changeSmallX = 2 * radius * (Math.sin(((Math.PI * (60 - (mod20 * 2)))/180)/2))
//   moveCenter = ((changeBigX / 2) - (changeSmallX / 2))
// } else if (iterator === 30) {
//   changeSmallX = 0
//   moveCenter = changeBigX / 2
// } else if (iterator > 30 && iterator < 60) {
//   changeSmallX = 2 * radius * (Math.sin(((Math.PI * mod20 * 2) / 180) / 2))
//   moveCenter = changeBigX - ((changeBigX/ 2) - (changeSmallX / 2))
// } else if (iterator === 60) {
//   changeSmallX = changeBigX
//   moveCenter = changeBigX
// } else if (iterator > 60 && iterator < 90) {
//   changeSmallX = 2 * radius * (Math.sin(((Math.PI * (60 - (mod20 * 2))) / 180) / 2))
//   moveCenter = ((changeBigX / 2) - (changeSmallX / 2)) + radius
// } else if (iterator === 90) {
//   changeSmallX = 0
//   moveCenter = changeBigX * 1.5
// } else if (iterator > 90 && iterator < 120) {
//   changeSmallX = 2 * radius * (Math.sin(((Math.PI * mod20 * 2) / 180) / 2))
//   moveCenter = changeBigX * 2 - ((changeBigX/ 2) - (changeSmallX / 2))
// } 

// const changeY = Math.sqrt((radius ** 2) - ((changeBigX / 2) ** 2)) * 2

// context.clearRect(0, 0, width, height)
// for(let i = 0; i < numLoops; i++) {

//   if(i === 0) {

//     if(iterator > 59) {

//       context.beginPath()
//       context.arc((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
//       context.lineTo(radius * 2 - moveCenter, (changeY / 2) - 580)
//       context.lineTo(radius * 2 - moveCenter, height)
//       context.lineTo(0, height)
//       context.fillStyle = 'blue'
//       context.fill()

//     } else {
      
//       context.beginPath()
//       context.arc((radius / 2) - moveCenter, -580, radius, (Math.PI * 60) / 180, (Math.PI * (120 - mod40)) / 180, false)
//       context.lineTo(0 , height)
//       context.lineTo(radius * 2 - moveCenter, height)
//       context.lineTo(radius * 2 - moveCenter, changeY/2 - 580)
//       context.moveTo((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY / 2 - 580)
//       context.arc((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
//       context.fillStyle = 'blue'
//       context.fill()

//     }

//   } else if(i === numLoops - 1) {

//     context.beginPath()
//     context.arc((radius / 2) + (radius * i * 2) - moveCenter, -580, radius, (Math.PI * 60) / 180, (Math.PI * 120) / 180, false)
//     context.lineTo(radius * 2 * i - moveCenter, height)
//     context.lineTo(radius * (2 + (i * 2)) - moveCenter, height)
//     context.lineTo(radius * (2 + (i * 2)) - moveCenter, changeY/2 - 580)
//     context.moveTo((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, (changeY / 2) - 580)
//     context.arc((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
//     context.fillStyle = 'blue'
//     context.fill()

//   } else {

//     context.beginPath()
//     context.arc((changeBigX / 2) + (changeBigX * i * 2) - moveCenter, - 580, radius, (Math.PI * 60) / 180, (Math.PI * 120) / 180, false)
//     context.lineTo(changeBigX * 2 * i - moveCenter, height)
//     context.lineTo(changeBigX * (2 + (i * 2)) - moveCenter, height)
//     context.lineTo(changeBigX * (2 + (i * 2)) - moveCenter, changeY/2 - 580)
//     context.moveTo((changeBigX * ((2 * i) + 1)) + (changeBigX / 2) - moveCenter, (changeY / 2) - 580)
//     context.arc((changeBigX * ((2 * i) + 1)) + (changeBigX / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
//     context.fillStyle = 'blue'
//     context.fill()

//   }
// }
drawWave()
// }
// context.beginPath()
// context.arc((radius * 2) + (radius / 2), 0, radius, (Math.PI * 60) / 180, (Math.PI * 120) / 180, false)
// context.lineTo((radius * 2), height)
// context.lineTo((radius * 4), height)
// context.lineTo((radius * 4), changeY/2)
// // context.moveTo(width - radius, (0) + (changeY / 2))
// // context.arc((radius / 2) + (2 * radius), 0, radius, (Math.PI * 60) / 180, (Math.PI * 120) / 180, false)
// context.moveTo((radius * 3) + (radius / 2), (changeY / 2))
// context.arc((radius * 3) + radius / 2, changeY, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
// context.fillStyle = 'blue'
// context.fill()

export default catchData;