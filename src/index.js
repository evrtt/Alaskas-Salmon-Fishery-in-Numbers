import createObservers from './scripts/scroller.js';
import parseCatchData from './scripts/data_parser.js';

let catchData = parseCatchData();
console.log(catchData)

window.addEventListener("load", (e) => {
  createObservers();
}, false);

