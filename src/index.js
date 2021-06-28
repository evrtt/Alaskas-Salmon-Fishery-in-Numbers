import initializeData from './scripts/util/data_parser.js';
import { drawTransitionWave } from './scripts/util/wave.js';
import { 
  toSplash, 
  toIntro, 
  toSalmonSpecies,
  toData 
} from './scripts/transitions/transitions.js'
import AK from '../alaska_500k.js'

export const alaskaGeoJson = {
  "type": "FeatureCollection",
  "features": [AK]
}

export const catchData = initializeData();

const width = () => window.innerWidth;
const height = () => window.innerHeight;
export const projection = d3.geoMercator()
  .fitExtent(
    [
      [10, 60],
      [width() - 10, height() - 60],
    ],
    alaskaGeoJson
  )

drawTransitionWave()

window.addEventListener("DOMContentLoaded", (e) => {
  window.scrollTo(0, 0)
  
  const navSplash = document.getElementById('nav-splash-span')
  navSplash.addEventListener('click', () => toSplash())
  
  const navIntro = document.getElementById('nav-intro-span')
  navIntro.addEventListener('click', () => toIntro())
  
  const navSalmon = document.getElementById('nav-salmon-species-span')
  navSalmon.addEventListener('click', () => toSalmonSpecies())
  
  const navData = document.getElementById('nav-data-span')
  navData.addEventListener('click', () => toData())
  
}, false);
