import catchData from '../../index.js';
import {renderCharts, renderBubbles } from '../util/donut_chart.js'
import { renderAK } from '../util/alaska.js'

// const svg = d3.select('.data')
//   .append('svg')
//     .attr("width", '10vw')
//     .attr("height", '10vh')

const introToSpatial = (yr) => {

  renderAK();

  const genDonuts = (year) => {
    
    const salmonAreas = [
      "Kotzebue",
      "Kuskokwim",
      "Norton Sound",
      "Yukon",
      "Bristol Bay",
      "Cook Inlet",
      "Prince William Sound",
      "Southeast",
      "AK Pen/AI",
      "Chignik",
      "Kodiak"
    ]


  
    const currentYear = catchData['byYear'][year]
    salmonAreas.forEach(area => {
      let data = { area, data: currentYear[area]};
      renderCharts(data)
      // renderBubbles(data)
    })

  //   renderBubbles({ area: "Kodiak", data: currentYear["Kodiak"]})
  }
  genDonuts(yr)

  
}


export default introToSpatial;