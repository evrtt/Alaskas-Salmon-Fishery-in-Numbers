import areaData from './data_parser.js';

export default (next, last) => {
  switch (`${last}${next}`) {
    case '01':
      return areaData;
    case '10':
      return console.log('intro_to_splash');
    case '12':
      return console.log('intro_to_spatial');
    case '21':
      return console.log('spatial_to_intro');
    case '23':
      return console.log('spatial_to_temporal');
    case '32':
      return console.log('temporal_to_spatial');
    case '34':
      return console.log('temporal_to_statewide');
    case '43':
      return console.log('statewide_to_temporal')
    default:
      return null;
  }


}