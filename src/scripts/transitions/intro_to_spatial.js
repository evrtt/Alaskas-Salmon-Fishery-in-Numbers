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
    [[-162.75075500093894, 66.61030936350049], [-165.45638539991677, 67.35511868130742]],
    [[-162.61288934041147, 59.619327200001266], [-166.30680136604542, 58.406451176287135]],
    [[-162.46535519863104, 64.05190962382768], [-168.14628799425125, 64.24863325775765]],
    [[-165.50660311305106, 62.643382583042005], [-169.15500534976613, 62.288268861541745]],
    [[-159.07000261214498, 58.06911606091179], [-152.00712708274554, 66.55522673411546]],
    [[-152.65365969078832, 59.42486625786394], [-139.55282541742721, 67.35788579875347]],
    [[-147.09391061807054, 60.70650201429044], [-140.2718841215425, 63.85052875477269]],
    [[-134.05013097603768, 57.186978408650454], [-144.44792070227217, 55.91376231220995]],
    [[-165.232772334737, 54.23480436673355], [-172.94678815396927, 58.27739560637519]],
    [[-157.96017040218436, 55.86845119828741], [-158.10339730174698, 53.6546519728167]],
    [[-153.33984384526508, 57.450847982884504], [-153.2136639009687, 54.05681980564907]]
  ]

  const areaProjections = areaLongLats.map(areaLongLat => [projection(areaLongLat[0]), projection(areaLongLat[1])])


  console.log(areaProjections)

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
      xFrom: areaProjections[idx][0][0],
      yFrom: areaProjections[idx][0][1],
      xTo: areaProjections[idx][1][0],
      yTo: areaProjections[idx][1][1]
    })
  )

  const currentYear = catchData['byYear'][year]
  let data = salmonAreas.map(area => ({
    name: area.name,
    xFrom: area.xFrom,
    yFrom: area.yFrom,
    xTo: area.xTo,
    yTo: area.yTo,
    data: currentYear[area.name]
  }))

  swtch === "set" ? renderBubbles(data) : changeBubblesYear(data)
}

export const introToSpatial = (yr) => {
  
  renderYears();
  genBubbles(yr, "set");
  
}