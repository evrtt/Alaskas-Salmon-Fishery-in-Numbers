import createObservers from './scripts/scroller.js';
import initializeData from './scripts/data_parser.js';
import {drawWave} from "./scripts/draw_wave.js"

const catchData = initializeData();

window.addEventListener("load", (e) => {
  createObservers();
}, false);


drawWave()

export default catchData;