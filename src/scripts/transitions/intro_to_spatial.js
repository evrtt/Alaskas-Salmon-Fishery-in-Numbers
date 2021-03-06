import { catchData, projection } from '../../index.js';
import { 
  changeBubblesYear, 
  renderBubbles, 
  renderYears 
} from '../util/bubble_chart.js'
import AK from '../../../alaska_500k.js';

export const genBubbles = (year, swtch) => {
  
  const width = window.innerWidth;
  const height = window.innerHeight;

  // const areaLongLats = [
  //   [[-162.75075500093894, 66.61030936350049], [-165.45638539991677, 67.35511868130742]],
  //   [[-162.61288934041147, 59.619327200001266], [-166.30680136604542, 58.406451176287135]],
  //   [[-162.46535519863104, 64.05190962382768], [-168.14628799425125, 64.24863325775765]],
  //   [[-165.50660311305106, 62.643382583042005], [-169.15500534976613, 62.288268861541745]],
  //   [[-159.07000261214498, 58.06911606091179], [-152.00712708274554, 66.55522673411546]],
  //   [[-152.65365969078832, 59.42486625786394], [-139.55282541742721, 67.35788579875347]],
  //   [[-147.09391061807054, 60.70650201429044], [-140.2718841215425, 63.85052875477269]],
  //   [[-134.05013097603768, 57.186978408650454], [-144.44792070227217, 55.91376231220995]],
  //   [[-165.232772334737, 54.23480436673355], [-172.94678815396927, 58.27739560637519]],
  //   [[-157.96017040218436, 55.86845119828741], [-158.10339730174698, 53.6546519728167]],
  //   [[-153.33984384526508, 57.450847982884504], [-153.2136639009687, 54.05681980564907]]
  // ]

  const areaLongLats = [
    [[-164.173980182047, 66.9], [-165.45638539991677, 66.9]],
    [[-164.385943, 59.46568291400549], [-168.30680136604542, 59.46568291400549]],
    [[-166.516336, 64.24863325775765], [-168.14628799425125, 64.24863325775765]],
    [[-165.0640988907766, 62.72892775998075], [-167.45500534976613, 62.72892775998075]],
    [[-156.941329, 59.036099], [-156.941329, 61.39217259599086]],
    [[-153.55282541742721, 61.383330375381526], [-153.55282541742721, 64.35788579875347]],
    [[-147.7718841215425, 61.25121467077413], [-147.7718841215425, 64.85052875477269]],
    [[-140.13620545027447, 57.01376231220995], [-145.84792070227217, 57.01376231220995]],
    [[-165.7, 56.06928416194262], [-165.7, 57.47739560637519]],
    [[-158.10339730174698, 54.691240], [-158.10339730174698, 53.6546519728167]],
    [[-152.5136639009687, 56.429975], [-152.5136639009687, 53.35681980564907]]
  ]

  const areaNames = [
    { area: "Kotzebue",
      title: "Kotzebue" },
    { area: "Kuskokwim",
      title: "Kuskokwim" },
    { area: "Norton Sound",
      title: "Norton Sound" },
    { area: "Yukon",
      title: "Yukon River" },
    { area: "Bristol Bay",
      title: "Bristol Bay" },
    { area: "Cook Inlet",
      title: "Cook Inlet" },
    { area: "Prince William Sound",
      title: "Prince William Sound" },
    { area: "Southeast",
      title: "Southeast Alaska" },
    { area: "AK Pen/AI",
      title: "Alaskan Peninsula / Aleutian Islands" },
    { area: "Chignik",
      title: "Chignik" },
    { area: "Kodiak",
      title: "Kodiak" }
  ]

  const salmonAreas = areaNames.map(
    (el, idx) => ({
      name: el.area,
      title: el.title,
      line: areaLongLats[idx].map(pair => projection(pair))
    })
  )

  const currentYear = catchData['byYear'][year]
  let data = salmonAreas.map(area => ({
    name: area.name,
    title: area.title,
    line: area.line,
    data: currentYear[area.name]
  }))

  swtch === "set" ? renderBubbles(data, year) : changeBubblesYear(data, year)
}
