import fishColor from './fish_color.js';
import catchData from '../../index.js';

const scaleData = (area, type) => {

  let maxY = 0
  Object.values(area).forEach(entry => {
    let sum = 0
    Object.values(entry).forEach((fish) => {
      return sum += parseFloat(fish[type])
    })
    if(maxY < sum) { 
      maxY = sum
    }
  })

  const lScale = d3.scaleLinear()
    .domain([0, maxY])
    .range([0, 500])
  
  const result = Object.entries(area).map(entry => { 
    let obj = {}
    
    Object.entries(entry[1]).forEach(fish => {
      let species = fish[0]
      let amt = lScale(fish[1][type])
      obj[`${species}`] = amt
    })
    return obj
  })

  return result
}

const altTitles = [
  "Yukon River",
  "Southeast Alaska",
  "Alaskan Peninsula/Aleutian Islands"
]

export const renderAreaChart = (area, type, x, y, scale) => {

  const identifier = altTitles.includes(area.title) ? area.identifier : area.title
  const areaData = catchData["byArea"][identifier]
  let data = scaleData(areaData, type)
  const stack = d3.stack()
    .keys(['Chinook', 'Chum', 'Coho', 'Pink', 'Sockeye']);
  const stackedData = stack(data);
  const xIncrement = (window.innerWidth / 45) / scale
  // const areaGenerator = (area) {
  //   return {
  //     x: ,
  //     y: ,
  //     height: ,
  //     width: 
  //   }
  // }
  //   .x0((d, idx) => x - ((window.innerWidth / 2 / scale) - xIncrement) + xIncrement + idx * xIncrement - 10 / scale)
  //   .y0(d => y + (4 * window.innerHeight / 10) / scale - (d[0] / scale) )
  //   .y1(d => y + (4 * window.innerHeight / 10) / scale - (d[1] / scale))
  // const areaGenerator = d3.area()
  //   .x0((d, idx) => x - ((window.innerWidth / 2 / scale) - xIncrement) + xIncrement + idx * xIncrement - 10 / scale)
  //   .y0(d => y + (4 * window.innerHeight / 10) / scale - (d[0] / scale) )
  //   .y1(d => y + (4 * window.innerHeight / 10) / scale - (d[1] / scale))

  // const areaChart = stackedData.map(stack => ({
  //   path: areaGenerator(stack),
  //   species: stack.key
  // }))
  const areaChart = []
  
  stackedData.forEach((stack) => {
    stack.forEach((rect, idx) => {
      areaChart.push({
        x: x - ((window.innerWidth / 2 / scale) - xIncrement) + xIncrement + idx * xIncrement,
        y: y + ((window.innerHeight / 2) - 20) / scale - (rect[1] / scale),
        height: (rect[1] - rect[0]) / scale,
        width: xIncrement / 1.5,
        species: stack.key
      })
    })
  })

  d3.select("#alaska-svg")
    .append('g')
    .attr('class', "area-chart-g")
    .selectAll('rect')
    .data(areaChart)
    .join('rect')
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("width", d => d.width)
    .attr("height", d => d.height)
    .attr("fill", "none")
    .transition()
    .delay(500)
    .attr("fill", d => fishColor(d.species))

  renderChartScale(x, y, scale)

}

const renderChartScale = (x, y, scale) => {

  const width = window.innerWidth
  const height = window.innerHeight
  const xIncrement = (width / 45) / scale
  const yIncrement = (height / 12) / scale
  const lineGenerator = d3.line()
  const axes = []
  axes.push(
    lineGenerator([
      [x - ((width / 2 / scale) - xIncrement), y + ((height / 2) - 19) / scale], 
      [x - (width / 2 / scale) + 44 * xIncrement, y + ((height / 2) - 19) / scale]
    ])
  )
  axes.push(
      lineGenerator([
        [x - ((width / 2 / scale) - xIncrement), y + ((height / 2) - 20) / scale], 
        [x - ((width / 2 / scale) - xIncrement), y - ((height / 2) + 20) / scale]
      ])
    )
  
  for(let i = 0; i < 42; i++) {
    
    let tickX = x - (width / 2 / scale) + 2 * xIncrement + i * xIncrement + (xIncrement / 1.5) / 2

    let tick = lineGenerator([
      [tickX , y + ((height / 2) - 20) / scale],
      [tickX, y + ((height / 2) - 10) / scale]
    ])
    axes.push(tick)
  }
  
  for(let i = 0; i < 9; i++) {
    
    let tickY = y - (width / 2 / scale) + 2 * yIncrement + i * yIncrement

    let tick = lineGenerator([
      [x - ((width / 2 / scale) - xIncrement) , tickY],
      [x - ((width / 2 / scale) - xIncrement), tickY]
    ])
    axes.push(tick)
  }

  console.log(axes)

  axes.forEach(line => {

    console.log(line)

    d3.select(".area-chart-g")
      .append('path')
      .attr('d', line)
      .attr("stroke", "black")
  })

}

