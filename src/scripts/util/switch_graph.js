import { genBubbles } from '../transitions/intro_to_spatial.js'
import { clearCharts, renderYears } from './bubble_chart.js'
import { areas, zoom } from './alaska.js'
import { alaskaGeoJson } from '../../index.js'
import { hover } from './alaska.js'

export const switchGraphRaise = (amt, toGraph) => {
  const waveTop = document.getElementsByClassName('wave-top')[0]
  const waveBottom = document.getElementsByClassName('wave-bottom')[0]
  waveTop.style.zIndez = 1

  if (amt >= window.innerHeight - 1) {
    if(toGraph === 'byYear') {
      renderYears()
      genBubbles('1979', 'set')
      switchBoundingBoxes(toGraph)
    } else {
      clearCharts()
      switchBoundingBoxes(toGraph)
    }
    window.requestAnimationFrame(() => switchGraphLower(amt, toGraph))
  } else {
    amt += Math.sqrt(window.innerHeight - amt)
    waveTop.style.bottom = `${amt}px`
    waveBottom.style.height = `${amt + 1}px`
    window.requestAnimationFrame(() => switchGraphRaise(amt, toGraph))
  }
}

export const switchGraphLower = (amt, toGraph) => {

  const waveTop = document.querySelector('.wave-top')
  waveTop.style.zIndez = 1
  const waveBottom = document.querySelector('.wave-bottom')

  if (amt > window.innerHeight - 10) {
    amt -= Math.sqrt(100)
    waveTop.style.bottom = `${amt}px`
    waveBottom.style.height = `${amt}px`
    window.requestAnimationFrame(() => switchGraphLower(amt))
  } else if (amt > 0) {
    amt -= Math.sqrt(100 + (window.innerHeight - amt))
    waveTop.style.bottom = `${amt}px`
    waveBottom.style.height = `${amt}px`
    window.requestAnimationFrame(() => switchGraphLower(amt))
  } else if (amt < 0 && amt > -420) {
    amt -= Math.sqrt(100 + (window.innerHeight - amt))
    waveTop.style.bottom = `${amt}px`
    waveTop.style.zIndez = 1
    waveBottom.style.height = 0
    window.requestAnimationFrame(() => switchGraphLower(amt))
  } else if (amt < -420) {
    waveTop.remove()
  }
}

const unhoverByYear = (title) => {
  d3.select('#area-title')
    .text('mouseover area for name')

  document.getElementById(`${title.split(' ').join('-').split('/').join('')}-rect`)
    .style.fillOpacity = '0.2'
}

const unhoverByArea = (title) => {
  d3.select('#area-title')
    .text('mouseover area for name, click for data')

  document.getElementById(`${title.split(' ').join('-').split('/').join('')}-rect`)
    .style.fillOpacity = '0.2'
}

const switchBoundingBoxes = (toGraph) => {

  d3.select('#area-title')
    .text('hover over area for name')

  const width = window.innerWidth;
  const height = window.innerHeight;

  const projection = d3.geoMercator()
    .fitExtent(
      [
        [10, 60],
        [width - 10, height - 60],
      ],
      alaskaGeoJson
    )

  const path = d3.geoPath()
    .projection(projection)

  const salmonAreas = areas.map(
    (el, idx) => ({
      title: el.title,
      identifier: el.identifier,
      rect: el.rect.map(pair => projection(pair)),
      line: el.line.map(pair => projection(pair))
    })
  )

  if (toGraph === 'byYear') {
    salmonAreas.forEach(area => {
      d3.select(`#${area.title.split(' ').join('-').split('/').join('')}-rect`)
        .attr("stroke", "white")
        .on("click", null)
        .on("mouseenter", () => hover(area.title))
        .on("mouseout", () => unhoverByYear(area.title))

    })
  } else {
    salmonAreas.forEach(area => {
      d3.select(`#${area.title.split(' ').join('-').split('/').join('')}-rect`)
        .attr("stroke", "none")
        .on("click", () => zoom(area, path))
        .on("mouseenter", () => hover(area.title))
        .on("mouseout", () => unhoverByArea(area.title))

    })
  }
}