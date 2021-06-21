import { genBubbles } from '../transitions/intro_to_spatial.js';
import { projection } from './alaska.js';
import fishColor from './fish_color.js'

export const clearCharts = () => {
  d3.select(".years-container").selectAll("span").remove()
  d3.select(".years-container").remove()

  d3.select('#alaska-svg')
    .selectAll('g')
    .remove()
}

export const renderYears = () => {
  
  let yrs = []

  for (let i = 1979; i < 2021; i++) {
    yrs.push(i)
  }

  d3.select("#scroller")
    .append("div")
    .attr("class", "years-container")
    .selectAll("span")
    .data(yrs)
    .join("span")
    .text(d => d)
    .attr("class", "year-span")
    .on("click", e => genBubbles(e.target.innerText), "change")
}

const rScale = d3.scaleSqrt()
.domain([0, 300000000])
.range([0, 50])

const colorKeyCircleX = projection([-177, 69.3])[0]
const colorKey = [
  { species: "Chinook / King", y: projection([-177, 69.3])[1] },
  { species: "Chum / Dog", y: projection([-177, 69.3])[1] + 80 },
  { species: "Coho / Silver", y: projection([-177, 69.3])[1] + 160 },
  { species: "Pink / Humpy", y: projection([-177, 69.3])[1] + 240 },
  { species: "Sockeye / Red", y: projection([-177, 69.3])[1] + 320 },
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
    circlePositionY: projection([-140, 61.3])[1] - 150 - 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(2500000) - 2 * rScale(12500000) - 2 * rScale(62500000)  - rScale(312500000),
    circlePositionX: projection([-140, 61.3])[0] + rScale(312500000),
    textPositionY: projection([-140, 61.3])[1] - 135 - 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(2500000) - 2 * rScale(12500000) - 2 * rScale(62500000),
    textPositionX: projection([-140, 61.3])[0],
    pounds: '312,500,000 lbs'
  }
]

export const renderBubbles = (data) => {

  d3.select("#alaska-svg")
    .append('text')
    .text('Alaska')
    .attr('fill', 'white')
    .attr('font-size', '30px')
    .attr('x', projection([-154, 67])[0])
    .attr('y', projection([-154, 67])[1])

  d3.select("#alaska-svg")
    .append("g")
    .attr("class", 'colorKey')
    .selectAll("circle")
    .data(colorKey)
    .join('circle')
    .attr('cx', colorKeyCircleX)
    .attr('cy', d => d.y)
    .attr('r', 20)
    .attr('fill', d => fishColor(d.species))

  d3.select(".colorKey")
    .selectAll("text")
    .data(colorKey)
    .join('text')
    .attr('x', colorKeyCircleX - 20)
    .attr('y', d => d.y + 35)
    .text(d => d.species)

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
      .on("mouseenter", () => hoverBubble(area.name))
      .on("mouseout", () => unhoverBubble(area.name))



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
    .text(`${title},`)

  d3.select('#area-title')
    .transition()
    .duration(400)
    .attr('font-size', '20px')

  document.getElementById(`${title}-rect`)
    .style.fillOpacity = '0.3'
}

const unhoverBubble = (title) => {
  d3.select('#area-title')
    .transition()
    .duration(400)
    .attr('font-size', '0px')

  document.getElementById(`${title}-rect`)
    .style.fillOpacity = '0.2'
}

export const changeBubblesYear = (data) => {

  const lineGenerator = d3.line()
  const rScale = d3.scaleSqrt()
    .domain([0, 300000000])
    .range([0, 50])
  
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


