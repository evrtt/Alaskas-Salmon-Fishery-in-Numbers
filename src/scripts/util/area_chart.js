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
    .range([0, (window.innerHeight) / 2])
  
  const result = Object.entries(area).map(entry => { 
    let obj = {}
    
    Object.entries(entry[1]).forEach(fish => {
      let species = fish[0]
      let amt = lScale(fish[1][type])
      obj[`${species}`] = amt
    })
    return obj
  })

  return { result, maxY }
}

const altTitles = [
  "Yukon River",
  "Southeast Alaska",
  "Alaskan Peninsula/Aleutian Islands"
]

export const renderAreaChart = (area, type, x, y, scale) => {

  const identifier = altTitles.includes(area.title) ? area.identifier : area.title
  const areaData = catchData["byArea"][identifier]
  let scaled = scaleData(areaData, type)
  let data = scaled.result
  let maxY = scaled.maxY
  const stack = d3.stack()
    .keys(['Chinook', 'Chum', 'Coho', 'Pink', 'Sockeye']);
  const stackedData = stack(data);
  const xIncrement = (window.innerWidth / 49) / scale
  const areaChart = []
  
  stackedData.forEach((stack) => {
    stack.forEach((rect, idx) => {
      areaChart.push({
        x: x - (window.innerWidth / 2 / scale) + 6 * xIncrement + idx * xIncrement,
        y: y + ((window.innerHeight / 2) - 60) / scale - (rect[1] / scale),
        height: (rect[1] - rect[0]) / scale,
        width: xIncrement / 1.2,
        species: stack.key
      })
    })
  })
  d3.select("#alaska-svg")
    .append('g')
    .attr('class', "area-chart-g")
    
  renderChartScale(x, y, scale, maxY, type)

  d3.select(".area-chart-g")
    .selectAll('rect')
    .data(areaChart)
    .join('rect')
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("width", d => d.width)
    .attr("fill", d => fishColor(d.species))
    .attr('fill-opacity', '0')
    .transition()
    .delay(300)
    .duration(800)
    .attr("height", d => d.height)
    .attr('fill-opacity', '1')

}

const renderChartScale = (x, y, scale, maxY, type) => {


  const lScale = d3.scaleLinear()
    .domain([0, maxY])
    .range([0, (window.innerHeight) / 2])
  
  const width = window.innerWidth
  const height = window.innerHeight
  const xIncrement = (width / 49) / scale
  let yIncrement;
  let maxAdjust;
  let incrementCount;
  if (type === 'pounds'){
    incrementCount = Math.floor(maxY / 1000000)
    maxAdjust = lScale(incrementCount * 1000000)
    // maxDif = lScale(maxY) - maxAdjust
    yIncrement = (maxAdjust / 5) / scale
  } else if (type === 'value') {
    // maxAdjust = Math.floor(maxY / 1000000)
    // maxDif = maxY - maxAdjust
    // yIncrement = (((height / 2 - maxDif) * 2) / 10) / scale
  } else if (type === 'numFish') {
    // maxAdjust = Math.floor(maxY / 1000000)
    // maxDif = maxY - maxAdjust
    // yIncrement = (((height / 2 - maxDif) * 2) / 10) / scale
  }

  const lineGenerator = d3.line();
  const axes = [];
  const vals = [];
  const years = [];
  axes.push(
    lineGenerator([
      [x - ((width / 2 / scale) - 5 * xIncrement), y + ((window.innerHeight / 2) - 59) / scale],
      [x - (width / 2 / scale) + 48 * xIncrement, y + ((window.innerHeight / 2) - 59) / scale]
    ])
  )
  
  for(let i = 0; i < 42; i++) {

    let tickX = x - (width / 2 / scale) + 6 * xIncrement + i * xIncrement + (xIncrement / 1.2) / 2
    years.push({
      text: `${i + 1979}`,
      x: tickX - 5 / scale,
      y: y + ((height / 2) - 42) / scale,
      dx: 14 / scale
    })

    let tick = lineGenerator([
      [tickX, y + ((window.innerHeight / 2) - 59) / scale],
      [tickX, y + ((window.innerHeight / 2) - 50) / scale]
    ])
    axes.push(tick)
  }
  
  for(let i = 0; i < 7; i++) {
    
    let tickY = y + ((window.innerHeight / 2) - 59) / scale - (i * yIncrement)
    vals.push({
      text: `${i * incrementCount / 5} M lbs.`,
      x: x - ((width / 2 / scale) - 5 * xIncrement) - 50 / scale,
      y: tickY - 40 / scale,
      dx: 14 / scale
    })

    let tick = lineGenerator([
      [x - ((width / 2 / scale) - 5 * xIncrement), tickY],
      [x - (width / 2 / scale) + 48 * xIncrement, tickY]
    ])
    axes.push(tick)
  }

  axes.forEach(line => {

    d3.select(".area-chart-g")
      .append('path')
      .attr('d', line)
      .transition()
      .delay(700)
      .attr("stroke", "white")

  })

  years.forEach(year => {

    d3.select('.area-chart-g')
      .append('text')
      .text('')
      .attr('x', year.x)
      .attr('y', year.y)
      .attr('transform', `rotate(65, ${year.x} , ${year.y})`)
      .attr('font-size', year.dx)
      .attr('font-weight', '600')
      .attr('fill', 'white')
      .transition()
      .delay(700)
      .text(year.text)

  })

  vals.forEach(val => {

    d3.select('.area-chart-g')
      .append('text')
      .text('')
      .attr('x', val.x)
      .attr('y', val.y)
      .attr('transform', `rotate(45, ${val.x} , ${val.y})`)
      .attr('font-size', val.dx)
      .attr('font-weight', '600')
      .attr('fill', 'white')
      .transition()
      .delay(700)
      .text(val.text)

  })
    
}

