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
    .on("click", e => genBubbles(e.target.innerText, "change"))
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

export const renderBubbles = (data) => {
  
  const rScale = d3.scaleLinear()
    .domain([100, 350000000])
    .range([2, 50])

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

    d3.select("#alaska")
      .append("g")
      .attr("class", compactName)
      .text(area.name)
      .selectAll("circle")
      .data(area.data)
      .join("circle")
      .attr("fill", d => d.color)

    const ticked = () => {
      d3.select(`.${compactName}`)
        .selectAll("circle")
        .attr("class", "species")
        .attr("text", d => d.species)
        .attr("r", d => rScale(d.pounds))
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
    } 
  
    return d3.forceSimulation(area.data)
      .force('charge', d3.forceManyBody().strength(1.5))
      .force('center', d3.forceCenter(area.x, area.y))
      .force('collision', d3.forceCollide().radius(d => rScale(d.pounds)))
      .on('tick', ticked)

  })
}

export const changeBubblesYear = (data) => {

  const rScale = d3.scaleLinear()
    .domain([100, 350000000])
    .range([2, 50])
  
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

  
    const circles = d3.select(`.${compactName}`)
      .selectAll("circle")
      .data(area.data)
      .join("circle")
      .transition()
      .duration(1000)
      .attr("r", d => rScale(d.pounds))
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("x", d => d.x)
      .attr("y", d => d.y)

    d3.forceSimulation(area.data)
      .force('charge', d3.forceManyBody().strength(2))
      .force('center', d3.forceCenter(area.x, area.y))
      .force('collision', d3.forceCollide().radius(d => rScale(d.pounds)))

  })
} 


