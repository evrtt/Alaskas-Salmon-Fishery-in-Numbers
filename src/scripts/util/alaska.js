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

const areaBBLongLats = {
    kotzebue: [
      [-160.91609582550768, 65.915648],
      [-163.889686, 65.915648],
      [-163.889686, 67.284340],
      [-160.91609582550768, 67.284340]
    ],
    kuskokwim: [
      [-161.501213, 58.705659],
      [-164.385943, 58.705659],
      [-164.385943, 60.449060],
      [-161.501213, 60.449060]
    ],
    nortonSound: [
      [-160.328478, 63.445480],
      [-166.516336, 63.445480],
      [-166.516336, 64.972821],
      [-160.328478, 64.972821]
    ],
    yukon: [
      [-163.079208, 62.52892775998075],
      [-165.0640988907766, 62.52892775998075],
      [-165.0640988907766, 63.258378298296215],
      [-163.079208, 63.258378298296215]
    ],
    bristolBay: [
      [-156.941329, 57.488976],
      [-161.282311, 57.488976],
      [-161.282311, 59.036099],
      [-156.941329, 59.036099]
    ],
    cookInlet: [
      [-154.26499773972284, 59.07109314036479],
      [-149.43830837972038, 59.07109314036479],
      [-149.43830837972038, 61.383330375381526],
      [-154.26499773972284, 61.383330375381526]
    ],
    princeWilliamSound: [
      [-143.94379487175303, 59.45746863067117],
      [-148.71427099899506, 59.45746863067117],
      [-148.71427099899506, 61.25121467077413],
      [-143.94379487175303, 61.25121467077413]
    ],
    southeast: [
      [-129.332031, 54.484837],
      [-141.868731, 54.484837],
      [-141.868731, 60.322219],
      [-129.332031, 60.322219]
    ],
    akPenAI: [
      [-161.0992717187983, 51.19779167999059],
      [-179.1256032424475, 51.19779167999059],
      [-179.1256032424475, 56.06928416194262],
      [-161.0992717187983, 56.06928416194262]
    ],
    chignik: [
      [-155.016066, 54.691240],
      [-159.866434, 54.691240],
      [-159.866434, 56.800398],
      [-155.016066, 56.800398]
    ],
    kodiak: [
      [-151.757786, 56.429975],
      [-154.877566, 56.429975],
      [-154.877566, 58.615083],
      [-151.757786, 58.615083]
    ],
}

const southEastLongLats = 
  [
    [-141.868731, 54.484837],
    [-129.332031, 54.484837],
    [-129.332031, 60.322219],
    [-141.868731, 60.322219]
  ]


  

export const renderAK = () => {

  const svg = d3.select(".data")
    .append("svg")
    .attr("id", "alaska")
    .attr("width", width - 10)
    .attr("height", height - 10);

  const path = d3.geoPath()
    .projection(projection)
  
    svg.append("g")
    .attr("class", "alaska-svg")
    .selectAll("path")
    .data(alaskaGeoJson.features)
    .join("path")
    .attr("d", (feature) => path(feature))
    .attr("fill", "white")

  const squareGenerator = d3.area()

  Object.values(areaBBLongLats).forEach(areaBB => {
    
    const projs = Object.values(areaBB).map(pair => projection(pair))
    const square = squareGenerator(projs)

    return d3.select(".alaska-svg")
      .append("path")
      .data(square)
      .join("path")
      .attr('d', square)
      .attr("fill", "grey")
      .attr("fill-opacity", "0.4")

  })
}

export const clearAK = () => {
  d3.select("#alaska")
    .remove()
}


const SouthEastBB = { 
  NE: [60.322219, -129.332031],
  NW: [60.322219, -130.868731],
  SW: [54.484837, -130.868731],
  SE: [54.484837, -129.332031]
} 

const AKFIT = [
  []
]


// bottomLeft: 51.205223045307164, -179.1654933287791

// bottomRight: 51.205223045307164, -129.87596174728094

// top: 71.397313978511, -179.1654933287791

// top: 71.397313978511, -129.87596174728094
 
