import AK from '../../../alaska_500k.js';

export const renderAK = () => {
  
  const alaskaGeoJson = {
    "type": "FeatureCollection",
    "features": [AK]
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  const svg = d3.select(".data")
    .append("svg")
    .attr("id", "alaska")
    .attr("width", width - 10)
    .attr("height", height - 10);

  const projection = d3.geoMercator()
    .fitExtent(
    [
      [10, 10],
      [width - 10, height - 10],
    ],
    alaskaGeoJson
  )

  const path = d3.geoPath()
    .projection(projection)

  
  svg.append("g")
    .selectAll("path")
    // `features.features` is the list of country's polygons
    .data(alaskaGeoJson.features)
    .enter()
    // Everything after the `enter` method executes for each polygon
    // we append a path element...
    .append("path")
    // ... and assign the d attribute by running the path function
    // with the feature as the argument
    .attr("d", (feature) => path(feature))
}


