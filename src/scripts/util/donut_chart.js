export const renderCharts = (data) => {

  const numbers = data["data"].map(e => Object.values(e)[1])
  const species = data["data"].map(e => Object.values(e)[0])

  console.log(data)
  const width = 80;
  const height = 130;

  const radius = Math.min(width - 3, height - 3) / 2

  const svg = d3.select(".data")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  const color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

  const pie = d3.pie()
  const pieData = pie(numbers)

  svg
    .selectAll('g')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(10)
      .outerRadius(radius)
    )
    .attr('fill', (d, i) => { return (color(i)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
    .text((d, i) => { return species[i] })
    
  svg
    .append("text")
    .text(`${data['area']}`)
    .attr('font-size', '8px')
    .attr("transform", "translate(" + -40 + "," + 60 + ")")
}

export const clearCharts = () => {
  const svg = d3.select(".data")
    .selectAll('svg')
    .remove()

}
