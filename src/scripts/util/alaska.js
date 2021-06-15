import AK from '../../../alaska_500k.js';

const width = window.innerWidth;
const height = window.innerHeight;
const alaskaGeoJson = {
  "type": "FeatureCollection",
  "features": [AK]
}

export const projection = d3.geoMercator()
  .fitExtent(
    [
      [10, 10],
      [width - 10, height - 10],
    ],
    alaskaGeoJson
  )

export const renderAK = () => {

  const svg = d3.select(".data")
    .append("svg")
    .attr("id", "alaska")
    .attr("width", width - 10)
    .attr("height", height - 10);

  const path = d3.geoPath()
    .projection(projection)

  
  svg.append("g")
    .selectAll("path")
    .data(alaskaGeoJson.features)
    .join("path")
    .attr("d", (feature) => path(feature))
    .attr("fill", "#5E5E5E")
}

export const clearAK = () => {
  d3.select("#alaska")
    .remove()
}


// bottomLeft: 51.205223045307164, -179.1654933287791

// bottomRight: 51.205223045307164, -129.87596174728094

// top: 71.397313978511, -179.1654933287791

// top: 71.397313978511, -129.87596174728094
 
