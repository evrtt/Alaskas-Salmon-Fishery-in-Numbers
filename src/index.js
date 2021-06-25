import createObservers from './scripts/scroller.js';
import initializeData from './scripts/util/data_parser.js';
import { drawTransitionWave } from './scripts/util/wave.js';
import { 
  toSplash, 
  toIntro, 
  toSalmonSpecies 
} from './scripts/transitions/transitions.js'

const catchData = initializeData();

drawTransitionWave()

window.addEventListener("DOMContentLoaded", (e) => {
  window.scrollTo(0, 0)
  // createObservers();
  // const scroll0 = document.querySelector('.scroll-0-container')
  // const scroll1 = document.querySelector('.scroll-1-container')
  // const scroll2 = document.querySelector('.scroll-2-container')
  // const scroll3 = document.querySelector('.scroll-3-container')
  // const scroll4 = document.querySelector('.scroll-4-container')
  // drawStaticWave('#389bec', scroll0)
  // drawStaticWave('#188ae7', scroll1)
  // drawStaticWave('#0372cd', scroll2)
  // drawStaticWave('#0060ae', scroll3)
  // drawStaticWave('#00467f', scroll4)
  
  const current = document.querySelector('.current')
  
  document.querySelector('.current-button').addEventListener('click',() => toIntro(current))
}, false);


window.onbeforeunload = () => {
  window.scrollTo(0, 0)
}

export default catchData;