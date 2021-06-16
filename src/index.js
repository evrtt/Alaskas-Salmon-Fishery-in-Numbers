import createObservers from './scripts/scroller.js';
import initializeData from './scripts/util/data_parser.js';
import { drawWave } from './scripts/util/wave.js';
// import {drawWave} from "./scripts/draw_wave.js"

const catchData = initializeData();

window.addEventListener("DOMContentLoaded", (e) => {
  window.scrollTo(0, 0)
  createObservers();
}, false);

window.onbeforeunload = () => {
  window.scrollTo(0, 0)
}

drawWave()


export default catchData;