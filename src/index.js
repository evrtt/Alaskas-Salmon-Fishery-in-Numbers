import createObservers from './scripts/scroller.js';
import initializeData from './scripts/data_parser.js';

const catchData = initializeData();
console.log(catchData)

window.addEventListener("load", (e) => {
  createObservers();
}, false);


export default catchData;