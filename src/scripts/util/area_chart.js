import fishColor from './fish_color.js';
import { catchData } from '../../index.js';

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
      obj[`${species[0].toUpperCase() + species.slice(1)}Pounds`] = fish[1][type]
      obj[`${species}Year`] = entry[0]
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

  // const width = window.innerHeight
  // const height = window.innerWidth

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
  
  stackedData.forEach((stack, idx1) => {
    stack.forEach((rect, idx2) => {

      areaChart.push({
        x: x - (window.innerWidth / 2 / scale) + 6 * xIncrement + idx2 * xIncrement,
        y: y + ((window.innerHeight / 2) - 60) / scale - (rect[1] / scale),
        height: (rect[1] - rect[0]) / scale,
        width: xIncrement / 1.2,
        species: stack.key,
        pounds: rect['data'][`${stack.key}Pounds`],
        year: rect['data'][`${stack.key}Year`]
      })
    })
  })

  console.log(areaChart)

  d3.select("#alaska-svg")
    .append('g')
    .attr('class', "area-chart-g")
    
  renderChartScale(x, y, scale, maxY, type)
  setTimeout(() => renderColorKey(x, y, scale, maxY, type), 500)

  d3.select(".area-chart-g")
    .selectAll('rect')
    .data(areaChart)
    .join('rect')
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("width", d => d.width)
    .attr("fill", d => fishColor(d.species))
    .attr('fill-opacity', '0')
    .text(d => `${d.species}-${d.year}-${d.pounds}`)
    .attr('class', d => `area-chart-${d.species}-${d.year}`)
    .on('mouseover', d => hoverRect(d.target.innerHTML))
    .on('mouseout', d => unhoverRect(d.target.innerHTML))
    .transition()
    .delay(300)
    .duration(800)
    .attr("height", d => d.height)
    .attr('fill-opacity', '1')

  // d3.select('#area-word')
  //   .transition()
  //   .duration(600)
  //   .attr('font-size', 20 / scale)
  //   .attr('x', x - ((width / 2) * 0.5) / scale)
  //   .attr('y', y - ((height / 2) * 0.72) / scale)

  // d3.select('#area-title')
  //   .text(area.title)
  //   .transition()
  //   .duration(600)
  //   .attr('font-size', 20 / scale)
  //   .attr('x', x - ((width / 2) * 0.5) / scale + 70 / scale)
  //   .attr('y', y - ((height / 2) * 0.72) / scale)

  d3.select(`#${area.title.split(' ').join('-').split('/').join('')}-rect`)
    .attr('fill-opacity', '0.1')
}

const hoverRect = (text) => {
  
  const textArr = text.split('-')
  const species = textArr[0]
  const year = textArr[1]
  const pounds = textArr[2]

  d3.select(`.area-chart-${species}-${year}`)
    .attr('stroke', 'white')

  d3.select(`.${species}-color-rect`)
    .attr('stroke', 'white')

  d3.select('#amount-text')
    .text(pounds)

  d3.select('#year-text')
    .text(year)
}

const unhoverRect = (text) => {
  const textArr = text.split('-')
  const species = textArr[0]
  const year = textArr[1]

  d3.select(`.area-chart-${species}-${year}`)
    .attr('stroke', 'none')

  d3.select(`.${species}-color-rect`)
    .attr('stroke', 'none')

  d3.select('#amount-text')
    .text('Mouseover bar for # of lbs.')

  d3.select('#year-text')
    .text('Mouseover bar for year')
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

const renderColorKey = (x, y, scale, maxY, type) => {

  const width = window.innerWidth
  const height = window.innerHeight

  const colorKeyX = x + ((width / 2) * 0.52) / scale
  const colorKey = [
    { species: "Chinook (King)", y: y - ((height / 2) * 0.81) / scale },
    { species: "Chum (Dog)", y: y - ((height / 2) * 0.81) / scale + 30 / scale },
    { species: "Coho (Silver)", y: y - ((height / 2) * 0.81) / scale + 60 / scale },
    { species: "Pink (Humpy)", y: y - ((height / 2) * 0.81) / scale + 90 / scale },
    { species: "Sockeye (Red)", y: y - ((height / 2) * 0.81) / scale + 120 / scale }
  ]

  d3.select("#alaska-svg")
      .append("g")
      .attr("class", 'colorKey')
      .selectAll("rect")
      .data(colorKey)
      .join('rect')
      .attr('x', colorKeyX)
      .attr('y', d => d.y)
      .attr('height', 18 / scale)
      .attr('width', 30 / scale)
      .attr('fill', d => fishColor(d.species))

    d3.select(".colorKey")
      .selectAll("text")
      .data(colorKey)
      .join('text')
      .attr('x', colorKeyX + 40 / scale)
      .attr('y', d => d.y + 16 / scale)
      .text(d => d.species)
      .attr('fill', 'white')
      .attr('font-size', 20 / scale)


    colorKey.forEach(color => {
      d3.select('.colorKey')
        .append('rect')
        .attr('class', `${color.species.split(' ')[0]}-color-rect`)
        .attr('x', colorKeyX - 5 / scale)
        .attr('y', color.y - 5 / scale)
        .attr('height', 30 / scale)
        .attr('width', 180 / scale)
        .attr('stroke', 'none')
        .attr('fill', 'none')
    })
}

