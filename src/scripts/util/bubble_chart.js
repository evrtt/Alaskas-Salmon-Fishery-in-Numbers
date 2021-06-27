import { genBubbles } from '../transitions/intro_to_spatial.js';
import fishColor from './fish_color.js'
import { alaskaGeoJson } from '../../index.js'

export const clearCharts = () => {
  d3.select(".years-container").selectAll("span").remove()
  d3.select(".years-container").remove()

  d3.select('#alaska-svg')
    .selectAll('g')
    .remove()
}

const genYears = () => {
  let yrs = []

  for (let i = 1979; i < 2021; i++) {
    yrs.push(i)
  }
  return yrs
}

export const renderYears = () => {

  const years = genYears()

  d3.select(".data-container")
    .append("div")
    .attr("class", "years-container")
    .attr('z-index', 0)
    .selectAll("span")
    .data(years)
    .join("span")
    .text(d => d)
    .attr("class", "year-span")
    .on("click", e => genBubbles(e.target.innerText), "change")
}

const rScale = d3.scaleSqrt()
.domain([0, 300000000])
.range([0, 50])

export const renderBubbles = (data, year) => {

  const width = window.innerWidth;
  const height = window.innerHeight;

  const projection = d3.geoMercator()
    .fitExtent(
      [
        [10, 60],
        [width - 10, height - 60],
      ],
      alaskaGeoJson
    )

  const colorKeyCircleX = projection([-177, 69.3])[0]
  const yearTextLocation = projection([-177, 70.8])

  const colorKey = [
    { species: "Chinook (King)", y: projection([-177, 67.3])[1] },
    { species: "Chum (Dog)", y: projection([-177, 67.3])[1] + 50 },
    { species: "Coho (Silver)", y: projection([-177, 67.3])[1] + 100 },
    { species: "Pink (Humpy)", y: projection([-177, 67.3])[1] + 150 },
    { species: "Sockeye (Red)", y: projection([-177, 67.3])[1] + 200 },
  ]

  const sizeKey = [
    {
      r: rScale(100000),
      circlePositionY: projection([-140, 61.3])[1],
      circlePositionX: projection([-140, 61.3])[0] + rScale(100000),
      textPositionY: projection([-140, 61.3])[1] + 15,
      textPositionX: projection([-140, 61.3])[0],
      pounds: '100,000 lbs'
    },
    {
      r: rScale(500000),
      circlePositionY: projection([-140, 61.3])[1] - 30 - 2 * rScale(100000) - rScale(500000),
      circlePositionX: projection([-140, 61.3])[0] + rScale(500000),
      textPositionY: projection([-140, 61.3])[1] - 15 - 2 * rScale(100000),
      textPositionX: projection([-140, 61.3])[0],
      pounds: '500,000 lbs'
    },
    {
      r: rScale(2500000),
      circlePositionY: projection([-140, 61.3])[1] - 60 - 2 * rScale(100000) - 2 * rScale(500000) - rScale(2500000),
      circlePositionX: projection([-140, 61.3])[0] + rScale(2500000),
      textPositionY: projection([-140, 61.3])[1] - 45 - 2 * rScale(100000) - 2 * rScale(500000),
      textPositionX: projection([-140, 61.3])[0],
      pounds: '2,500,000 lbs'
    },
    {
      r: rScale(12500000),
      circlePositionY: projection([-140, 61.3])[1] - 90 - 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(2500000) - rScale(12500000),
      circlePositionX: projection([-140, 61.3])[0] + rScale(12500000),
      textPositionY: projection([-140, 61.3])[1] - 75 - 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(2500000),
      textPositionX: projection([-140, 61.3])[0],
      pounds: '12,500,000 lbs'
    },
    {
      r: rScale(62500000),
      circlePositionY: projection([-140, 61.3])[1] - 120 - 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(2500000) - 2 * rScale(12500000) - rScale(62500000),
      circlePositionX: projection([-140, 61.3])[0] + rScale(62500000),
      textPositionY: projection([-140, 61.3])[1] - 105 - 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(2500000) - 2 * rScale(12500000),
      textPositionX: projection([-140, 61.3])[0],
      pounds: '62,500,000 lbs'
    },
    {
      r: rScale(312500000),
      circlePositionY: projection([-140, 61.3])[1] - 150 - 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(2500000) - 2 * rScale(12500000) - 2 * rScale(62500000) - rScale(312500000),
      circlePositionX: projection([-140, 61.3])[0] + rScale(312500000),
      textPositionY: projection([-140, 61.3])[1] - 135 - 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(2500000) - 2 * rScale(12500000) - 2 * rScale(62500000),
      textPositionX: projection([-140, 61.3])[0],
      pounds: '312,500,000 lbs'
    }
  ]

  d3.select("#alaska-svg")
    .append("g")
    .attr("class", 'colorKey')
    .selectAll("circle")
    .data(colorKey)
    .join('circle')
    .attr('cx', colorKeyCircleX)
    .attr('cy', d => d.y)
    .attr('r', 12)
    .attr('fill', d => fishColor(d.species))

  d3.select(".colorKey")
    .selectAll("text")
    .data(colorKey)
    .join('text')
    .attr('x', colorKeyCircleX - 12)
    .attr('y', d => d.y + 24)
    .text(d => d.species)
    .attr('fill', 'white')

  d3.select("#alaska-svg")
    .append("g")
    .attr("class", 'sizeKey')
    .selectAll("circle")
    .data(sizeKey)
    .join('circle')
    .attr('cx', d => d.circlePositionX)
    .attr('cy', d => d.circlePositionY)
    .attr('r', d => d.r)
    .attr('fill', 'rgb(50, 50, 50)')

  d3.select(".sizeKey")
    .selectAll("text")
    .data(sizeKey)
    .join('text')
    .attr('x', d => d.textPositionX)
    .attr('y', d => d.textPositionY)
    .text(d => d.pounds)

  d3.select("#alaska-svg")
    .append("g")
    .attr("id", "year-word")
    .append('text')
    .text('Year: ')
    .attr('x', yearTextLocation[0])
    .attr('y', yearTextLocation[1] + 35)
    .attr('fill', 'white')
    .attr('font-size', 30)

  const years = genYears()

  d3.select("#alaska-svg")
    .append("g")
    .attr("class", "years-texts")
    .selectAll("text")
    .data(years)
    .join("text")
    .text(d => d)
    .attr('x', yearTextLocation[0] + 80)
    .attr('y', yearTextLocation[1] + 35)
    .attr("class", d => `char-${d}-text`)
    .attr('font-size', 0)
    .attr('fill', 'white')

  d3.select('.char-1979-text')
    .attr('font-size', 30)
    
  const lineGenerator = d3.line()
  data.forEach(area => {

  if(!!area.data) {

    let newAreaData = []
    area.data.forEach(
      fish => {
        if (JSON.stringify(fish.pounds) !== "null") {
          fish["color"] = fishColor(fish.species)
          newAreaData.push(fish)
        }
      }
    )

    const compactName = `${(area.name.split(" ").join("").split("/").join(""))}-g`
    const line = lineGenerator(area.line)

    if (newAreaData.length > 0) {
      d3.select("#alaska-svg")
        .append("g")
        .append("path")
        .attr("id", `${compactName}-line`)
        .attr('d', line)
        .attr('stroke', 'white')
    }

    d3.select("#alaska-svg")
      .append("g")
      .attr("class", compactName)
      .style("width", 100)
      .style("height", 100)
      .style("zIndex", 5)
      .text(area.name)
      .selectAll("circle")
      .data(newAreaData, d => `${compactName}${d.species}`)
      .join("circle")
      .attr("fill", d => d.color)
      .attr("class", "species")
      .text(d => d.species)
      .attr("r", d => rScale(d.pounds))
      .on("mouseenter", () => hoverBubble(area.title))
      .on("mouseout", () => unhoverBubble(area.title))

    const ticked = () => {
      d3.select(`.${compactName}`)
        .selectAll("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
    } 
  
    d3.forceSimulation(newAreaData)
      .force('center', d3.forceCenter(area.line[1][0], area.line[1][1]))
      .force('x', d3.forceX(area.line[1][0]))
      .force('y', d3.forceY(area.line[1][1]))
      .force('charge', d3.forceManyBody().strength(d => rScale(d.pounds)))
      .force('collision', d3.forceCollide().radius(d => rScale(d.pounds) + 0.5))
      .on("tick", ticked)

  }

  })
}

const hoverBubble = (title) => {
  d3.select('#area-title')
    .text(`${title}`)

  document.getElementById(`${title}-rect`)
    .style.fillOpacity = '0.3'
}

const unhoverBubble = (title) => {
  d3.select('#area-title')
    .text('mouseover area for name')

  document.getElementById(`${title}-rect`)
    .style.fillOpacity = '0.2'
}

export const changeBubblesYear = (data, year) => {

  const lineGenerator = d3.line()
  const rScale = d3.scaleSqrt()
    .domain([0, 300000000])
    .range([0, 50])

  d3.select('.years-texts')
    .selectAll('text')
    .attr('font-size', 0)

  d3.select(`.char-${year}-text`)
    .attr('font-size', 30)
  
  data.forEach(area => {
  
    if (area.data) {
      let newAreaData = []  
      area.data.forEach(
        fish => {
          if (JSON.stringify(fish.pounds) !== "null") {
            fish["color"] = fishColor(fish.species)
            newAreaData.push(fish)
          }
        }
      )
          
      const compactName = `${(area.name.split(" ").join("").split("/").join(""))}-g`
      const line = lineGenerator(area.line)
  
      if (newAreaData.length > 0 && !document.getElementById(`${compactName}-line`)) {
        d3.select("#alaska-svg")
          .append('g')
          .append("path")
          .attr("id", `${compactName}-line`)
          .attr('d', line)
          .attr('stroke', 'white')
      } else if (newAreaData.length === 0 && !!document.getElementById(`${compactName}-line`)) {
        d3.select(`#${compactName}-line`).remove()
      }

      const nodes = d3.select(`.${compactName}`)
        .selectAll("circle")
        .data(newAreaData, d => `${compactName}${d.species}`)
        .join("circle")
        .attr("class", "species")
        .attr("text", d => d.species)
        .attr("fill", d => d.color)
        .transition()
        .duration(250)
        .attr("r", d => rScale(d.pounds))
  
      const ticked = () => d3.select(`.${compactName}`)
        .selectAll("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        
      const simulation = d3.forceSimulation(newAreaData)
        .force('center', d3.forceCenter(area.line[1][0], area.line[1][1]))
        .force('x', d3.forceX(area.line[1][0]))
        .force('y', d3.forceY(area.line[1][1]))
        .force('charge', d3.forceManyBody().strength(d => rScale(d.pounds)))
        .force('collision', d3.forceCollide().radius(d => rScale(d.pounds) + 0.5))
        .on("tick", ticked)
      
    }
  })
} 


