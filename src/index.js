import createObservers from './scripts/scroller.js';
import initializeData from './scripts/data_parser.js';
// import {drawWave} from "./scripts/draw_wave.js"

const catchData = initializeData();

window.addEventListener("load", (e) => {
  createObservers();
}, false);

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = canvas.width = context.width = window.innerWidth
const height = canvas.height = context.height = window.innerHeight
const radius = width / 4

const changeX = 2 * radius * (Math.sin(((Math.PI * 90)/180)/2))
const changeY = Math.sqrt((radius ** 2) - ((changeX / 2) ** 2)) * 2

context.clearRect(0, 0, width, height)
context.beginPath()
context.arc(width / 2, height / 2, radius, (Math.PI * 45) / 180, (Math.PI * 135) / 180, false)
context.lineTo(width / 2 - changeX / 2, height)
context.lineTo(width, height)
context.lineTo(width, (height / 2) + changeY/2)
context.moveTo(width - changeX, (height / 2) + (changeY / 2))
context.arc((width / 2) + changeX, (height / 2) + changeY, radius, Math.PI * 225 / 180, Math.PI * 315 / 180, false)
context.fillStyle = 'blue'
context.fill()

const WTF = document.getElementById('huntr-react-container-2')
console.log(WTF)

export default catchData;