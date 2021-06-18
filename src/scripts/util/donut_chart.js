import { genBubbles } from '../transitions/intro_to_spatial.js';
import { projection } from './alaska.js';

export const clearCharts = () => {
  d3.select(".years-container").selectAll("span").remove()
  d3.select(".years-container").remove()
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

const fishColor = (species) => {
  switch (species) {
    case "Chinook":
      return "#BF9AC4";
    case "Chum":
      return "#9AC4A8";
    case "Coho":
      return "#A0A0A0";
    case "Pink":
      return "#ECCECE";
    case "Sockeye":
      return "#E28989";
    default:
      return null
  }
}

const rScale = d3.scaleSqrt()
.domain([0, 300000000])
.range([0, 50])

const keyInit = [
  {
    r: rScale(100000), 
    circlePositionY: projection([-139.95846010445326, 61.565309246028966])[1],
    circlePositionX: projection([-139.95846010445326, 61.565309246028966])[0] + rScale(100000),
    textPositionY: projection([-139.95846010445326, 61.565309246028966])[1] + 2 * rScale(100000) + 20,
    textPositionX: projection([-139.95846010445326, 61.565309246028966])[0],
    pounds: '100,000 lbs'
  },
  {
    r: rScale(500000), 
    circlePositionY: projection([-139.95846010445326, 61.565309246028966])[1] - 30 - 2 * rScale(100000) - rScale(500000),
    circlePositionX: projection([-139.95846010445326, 61.565309246028966])[0] + rScale(500000),
    textPositionY: projection([-139.95846010445326, 61.565309246028966])[1] - 10 - 2 * rScale(100000),
    textPositionX: projection([-139.95846010445326, 61.565309246028966])[0],
    pounds: '500,000 lbs'
  },
  {
    r: rScale(1000000), 
    circlePositionY: projection([-139.95846010445326, 61.565309246028966])[1] - 60 - 2 * rScale(100000) - 2 * rScale(500000) - rScale(1000000),
    circlePositionX: projection([-139.95846010445326, 61.565309246028966])[0] + rScale(1000000),
    textPositionY: projection([-139.95846010445326, 61.565309246028966])[1] - 40 - 2 * rScale(100000) - 2 * rScale(500000),
    textPositionX: projection([-139.95846010445326, 61.565309246028966])[0],
    pounds: '1,000,000 lbs'
  },
  {
    r: rScale(5000000), 
    circlePositionY: projection([-139.95846010445326, 61.565309246028966])[1] - 90 - 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(1000000) - rScale(5000000),
    circlePositionX: projection([-139.95846010445326, 61.565309246028966])[0] + rScale(5000000),
    textPositionY: projection([-139.95846010445326, 61.565309246028966])[1] - 70 - 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(1000000),
    textPositionX: projection([-139.95846010445326, 61.565309246028966])[0],
    pounds: '5,000,000 lbs'
  },
  {
    r: rScale(10000000), 
    circlePositionY: projection([-139.95846010445326, 61.565309246028966])[1] - 120 - 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(1000000) - 2 * rScale(5000000) - rScale(10000000),
    circlePositionX: projection([-139.95846010445326, 61.565309246028966])[0] + rScale(10000000),
    textPositionY: projection([-139.95846010445326, 61.565309246028966])[1] - 100 - 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(1000000) - 2 * rScale(5000000),
    textPositionX: projection([-139.95846010445326, 61.565309246028966])[0],
    pounds: '10,000,000 lbs'
  },
  {
    r: rScale(50000000), 
    circlePositionY: projection([-139.95846010445326, 61.565309246028966])[1] - 150 - 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(1000000) - 2 * rScale(5000000) - 2 * rScale(10000000)  - rScale(50000000),
    circlePositionX: projection([-139.95846010445326, 61.565309246028966])[0] + rScale(50000000),
    textPositionY: projection([-139.95846010445326, 61.565309246028966])[1] - 130 - 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(1000000) - 2 * rScale(5000000) - 2 * rScale(10000000),
    textPositionX: projection([-139.95846010445326, 61.565309246028966])[0],
    pounds: '50,000,000 lbs'
  },
  {
    r: rScale(100000000), 
    circlePositionY: projection([-139.95846010445326, 61.565309246028966])[1] - 180 - 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(1000000) - 2 * rScale(5000000) - 2 * rScale(10000000) - 2 * rScale(50000000) - rScale(100000000),
    circlePositionX: projection([-139.95846010445326, 61.565309246028966])[0] + rScale(100000000),
    textPositionY: projection([-139.95846010445326, 61.565309246028966])[1] - 160- 2 * rScale(100000) - 2 * rScale(500000) - 2 * rScale(1000000) - 2 * rScale(5000000) - 2 * rScale(10000000) - 2 * rScale(50000000),
    textPositionX: projection([-139.95846010445326, 61.565309246028966])[0],
    pounds: '100,000,000 lbs'
  }
]

console.log(keyInit)

export const renderBubbles = (data) => {

  d3.select("#alaska-svg")
    .append("g")
    .attr("class", 'key')
    .selectAll("circle")
    .data(keyInit)
    .join('circle')
    .attr('cx', d => d.circlePositionX)
    .attr('cy', d => d.circlePositionY)
    .attr('r', d => d.r)

  d3.select(".key")
    .selectAll("text")
    .data(keyInit)
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
        .append("path")
        .attr("id", `${compactName}-line`)
        .attr('d', line)
        .attr('stroke', 'grey')
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
          .attr('stroke', 'grey')
          .attr('z-index', '10')
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


