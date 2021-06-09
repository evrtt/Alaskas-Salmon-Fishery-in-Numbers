import { genBubbles } from '../transitions/intro_to_spatial.js';

export const clearCharts = () => {
  d3.select("#alaska")
    .remove()

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

const rScale = d3.scaleLinear()
  .domain([0, 350000000])
  .range([0, 50])

export const renderBubbles = (data) => {

  data.forEach(area => {

    let newAreaData = []
    area.data.forEach(
      fish => {
        if (JSON.stringify(fish.pounds) !== "NaN") {
          fish["color"] = fishColor(fish.species)
          newAreaData.concat(fish)
        }
      }
    )
    area[data] = newAreaData

    const compactName = `${(area.name.split(" ").join("").split("/").join(""))}-g`

    d3.select("#alaska")
      .append("g")
      .attr("class", compactName)
      .text(area.name)
      .selectAll("circle")
      .data(area.data, d => `${compactName}${d.species}`)
      .join("circle")
      .attr("fill", d => d.color)
      .attr("class", "species")
      .attr("text", d => d.species)
      .attr("r", d => rScale(d.pounds))

    const ticked = () => {
      d3.select(`.${compactName}`)
        .selectAll("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
    } 
  
    d3.forceSimulation(area.data)
      .force('charge', d3.forceManyBody().strength(0.2))
      .force('center', d3.forceCenter(area.x, area.y))
      .force('collision', d3.forceCollide().radius(d => rScale(d.pounds)))
      .on("tick", ticked)

  })
}

export const changeBubblesYear = (data) => {

  const rScale = d3.scaleLinear()
    .domain([50, 500000000])
    .range([1, 50])
  
  data.forEach(area => {
  
    let newAreaData = []
  
    area.data.forEach(
      (fish, idx) => {
        if (JSON.stringify(fish.pounds) !== "NaN") {
          fish["color"] = fishColor(fish.species)
          newAreaData.concat(fish)
        }
      }
    )
  
    area[data] = newAreaData
    
    const compactName = `${(area.name.split(" ").join("").split("/").join(""))}-g`
  
    console.log(area.x, area.y)
    
    const nodes = d3.select(`.${compactName}`)
      .selectAll("circle")
      .data(area.data, d => `${compactName}${d.species}`)
      .join("circle")
      .attr("class", "species")
      .attr("text", d => d.species)
      .attr("fill", d => d.color)
      .transition()
      .duration(250)
      .attr("r", d => rScale(d.pounds))

    console.log(nodes)

    const ticked = () => d3.select(`.${compactName}`)
      .selectAll("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      
    const simulation = d3.forceSimulation(area.data)
      .force('center', d3.forceCenter(area.x, area.y))
      .force('charge', d3.forceManyBody().strength(d => rScale(d.pounds)))
      .force('y', d3.forceY(0.1).y(area.y))
      .force('x', d3.forceX(0.1).x(area.x))
      .force('collision', d3.forceCollide().radius(d => rScale(d.pounds)))
      .on("tick", ticked)


  })
} 


