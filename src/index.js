import createObservers from './scripts/scroller.js';
import initializeData from './scripts/data_parser.js';

const catchData = initializeData();

window.addEventListener("load", (e) => {
  createObservers();
}, false);


export default catchData;