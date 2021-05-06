export const renderCharts = (data) => {

  const numbers = data["data"].map(e => Object.values(e)[1])
  const species = data["data"].map(e => Object.values(e)[0])

  const width = window.innerWidth / 14;
  const height = window.innerHeight / 6;

  const radius = Math.min(width - 3, height - 3) / 2

  const dataContainer = d3.select(".data")
    .select("svg")
    // .attr("width", width)
    // .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  const color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

  const pie = d3.pie()
  const pieData = pie(numbers)

  dataContainer.selectAll('g')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(radius/2)
      .outerRadius(radius)
    )
    .attr('fill', (d, i) => { return (color(i)) })
    .style("stroke-width", "none")
    .style("opacity", 0.3)
    .text((d, i) => { return species[i] });
    
  dataContainer
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

export const renderBubbles = (data) => {
  // const numbers = data["data"].map(e => Object.values(e)[1])
  // const species = data["data"].map(e => Object.values(e)[0])  // return null;
  data = data["data"]
  console.log(data)
  const width = window.innerWidth;
  const height = window.innerHeight;
  const svgSize = Math.min(width, height)
  const rScale = d3.scaleSqrt()
    .domain([1, 10000000])
    .range([1, 100])

    
    const color = d3.scaleOrdinal(data.map(d => d.species), d3.schemePastel1)
    

    const circles = d3.selectAll("svg")
    .selectAll("g")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", "species")
      .attr("r", 100)
      .attr("fill", "black")
      .attr("cx", 100)
      .attr("cy", 100)
    
    const simulation = d3.forceSimulation()
      .force("x", d3.forceX(width / 2).strength(0.01))
      .force("y", d3.forceY(height / 2). strength(0.01))
      .force("cluster", d3.forceCollide(d => rScale(d.pounds) + 1))

    const ticked = () => {
      circles.attr("cx", d => 100).attr("cy", d => 100)
    }

    simulation.nodes(data)
      .on("tick", ticked)

     // const pack = data => d3.pack()
    //   .size([svgSize / 2])
    //   .padding(3)
  //   (d3.hierarchy({ children: data })
  //     .sum(d => d.pounds))

  // dataContainer.append('g')
  //     .selectAll("circle")
  //     .data(data)
  //     .enter()


  
  // const format = d3.format(",d")
  
  // const root = pack(data);
  // const svg = d3.create("svg")
  //   .attr("viewBox", [0, 0, width, height])
  //   .attr("font-size", 10)
  //   .attr("font-family", "sans-serif")
  //   .attr("text-anchor", "middle");

  // const leaf = svg.selectAll("g")
  //   .data(root.leaves())
  //   .join("g")
  //   .attr("transform", d => `translate(${svgSize + 1},${svgSize + 1})`);

  // leaf.append("circle")
  //   .attr("r", data => data.pounds/svgSize)
  //   .attr("fill-opacity", 0.7)
  //   .attr("fill", d => color(d.data.species));

  // leaf.append("clipPath")
  //   .append("use")
  //   .attr("xlink:href", d => d.leafUid.href);

  // leaf.append("text")
  //   .attr("clip-path", d => d.clipUid)
  //   .selectAll("tspan")
  //   .data(d => d.data.species.split(/(?=[A-Z][a-z])|\s+/g))
  //   .join("tspan")
  //   .attr("x", 0)
  //   .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
  //   .text(d => d);

  // leaf.append("title")
  //   .text(d => `${d.data.species === undefined ? "" : `${d.data.species}
  //   `}${format(d.pounds)}`);

}
