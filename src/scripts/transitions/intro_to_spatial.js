import catchData from '../../index.js';
import { changeBubblesYear, renderBubbles, renderYears } from '../util/donut_chart.js'
import { renderAK } from '../util/alaska.js'
import AK from '../../../alaska_500k.js';

export const genBubbles = (year, swtch) => {
  
  const alaskaGeoJson = {
    "type": "FeatureCollection",
    "features": [AK]
  }
  
  const width = window.innerWidth;
  const height = window.innerHeight;

  const projection = d3.geoMercator()
    .fitExtent(
      [
        [10, 10],
        [width - 10, height - 10],
      ],
      alaskaGeoJson
    )

  const areaLongLats = [
    [-162.75075500093894, 66.61030936350049],
    [-162.61288934041147, 59.619327200001266],
    [-162.46535519863104, 64.05190962382768],
    [-165.50660311305106, 62.643382583042005],
    [-159.07000261214498, 58.06911606091179],
    [-152.65365969078832, 59.42486625786394],
    [-147.09391061807054, 60.70650201429044],
    [-134.05013097603768, 57.186978408650454],
    [-165.232772334737, 54.23480436673355],
    [-157.96017040218436, 55.86845119828741],
    [-153.33984384526508, 57.450847982884504]
  ]

  const areaProjections = areaLongLats.map(areaLongLat => projection(areaLongLat))

  const areaNames = [
    { area: "Kotzebue" },
    { area: "Kuskokwim" },
    { area: "Norton Sound" },
    { area: "Yukon" },
    { area: "Bristol Bay" },
    { area: "Cook Inlet" },
    { area: "Prince William Sound" },
    { area: "Southeast" },
    { area: "AK Pen/AI" },
    { area: "Chignik" },
    { area: "Kodiak" }
  ]

  const salmonAreas = areaNames.map(
    (el, idx) => ({
      name: el.area,
      x: areaProjections[idx][0],
      y: areaProjections[idx][1]
    })
  )

  const currentYear = catchData['byYear'][year]
  let data = salmonAreas.map(area => ({
    name: area.name,
    x: area.x,
    y: area.y,
    data: currentYear[area.name]
  }))

  swtch === "set" ? renderBubbles(data) : changeBubblesYear(data)
}

export const introToSpatial = (yr) => {
  
  renderYears();
  genBubbles(yr, "set");
  
}