import { genBubbles } from '../transitions/intro_to_spatial.js';

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

export const renderBubbles = (data) => {

  const lineGenerator = d3.line()
  data.forEach(area => {

  if(!!area.data) {

    let newAreaData = []
    area.data.forEach(
      fish => {
        if (JSON.stringify(fish.pounds) !== "null") {
          console.log(fish, "HAPPENING")
          fish["color"] = fishColor(fish.species)
          newAreaData.push(fish)
        }
      }
    )

    const compactName = `${(area.name.split(" ").join("").split("/").join(""))}-g`
    const line = lineGenerator(area.line)

    d3.select("#alaska")
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
      .force('charge', d3.forceManyBody().strength(d => rScale(d.pounds)))
      .force('center', d3.forceCenter(area.line[1][0], area.line[1][1]))
      .force('collision', d3.forceCollide().radius(d => rScale(d.pounds)))
      .on("tick", ticked)

    console.log(newAreaData.length)
    console.log(!document.getElementsByClassName(`${compactName}-line`))
    console.log(newAreaData.length > 0 && !document.getElementsByClassName(`${compactName}-line`))
    if (newAreaData.length > 0) {
      d3.select(".alaska-svg")
        .append("path")
        .attr("class", `${compactName}-line`)
        .attr('d', line)
        .attr('stroke', 'grey')
    }
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
            console.log(fish, "HAPPENING")
            fish["color"] = fishColor(fish.species)
            newAreaData.push(fish)
          }
        }
      )
          
      const compactName = `${(area.name.split(" ").join("").split("/").join(""))}-g`
      const line = lineGenerator(area.line)
  
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

      console.log(newAreaData.length)
      console.log(document.getElementsByClassName(`${compactName}-line`))
      console.log(newAreaData.length > 0 && document.getElementsByClassName(`${compactName}-line`))
      if (newAreaData.length > 0 && !document.getElementsByClassName(`${compactName}-line`)) {
        d3.select(".alaska-svg")
          .append("path")
          .attr("class", `${compactName}-line`)
          .attr('d', line)
          .attr('stroke', 'lightgrey')
      } else if (newAreaData.length === 0 && !!document.getElementsByClassName(`${compactName}-line`)) {
        d3.select(`.${compactName}-line`).remove()
      }
    }

  })
} 


