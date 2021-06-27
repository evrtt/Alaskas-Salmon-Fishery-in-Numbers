import { genBubbles } from '../transitions/intro_to_spatial.js'
import { clearCharts, renderYears } from './bubble_chart.js'
import { areas } from './alaska.js'

export const switchGraphRaise = (amt, toGraph) => {
  const waveTop = document.getElementsByClassName('wave-top')[0]
  const waveBottom = document.getElementsByClassName('wave-bottom')[0]
  waveTop.style.zIndez = 1

  if (amt >= window.innerHeight - 1) {
    if(toGraph === 'byYear') {
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
    window.requestAnimationFrame(() => switchGraphLower(amt, toGraph))
  } else if (amt > 0) {
    amt -= Math.sqrt(100 + (window.innerHeight - amt))
    waveTop.style.bottom = `${amt}px`
    waveBottom.style.height = `${amt}px`
    window.requestAnimationFrame(() => switchGraphLower(amt, toGraph))
  } else if (amt < 0 && amt > -420) {
    amt -= Math.sqrt(100 + (window.innerHeight - amt))
    waveTop.style.bottom = `${amt}px`
    waveTop.style.zIndez = 1
    waveBottom.style.height = 0
    window.requestAnimationFrame(() => switchGraphLower(amt, toGraph))
  } else if (amt < -420) {
    waveTop.remove()
    if (toGraph === 'byYear') {
      renderYears()
    }
  }
}

const switchBoundingBoxes = (toGraph) => {

  if (toGraph === 'byYear') {
    areas.forEach(area => {
      d3.select(`#${area.title.split(' ').join('-').split('/').join('')}-rect`)
        .attr("stroke", "white")
        .attr('fill', 'none')
    })
  } else {
    areas.forEach(area => {
      d3.select(`#${area.title.split(' ').join('-').split('/').join('')}-rect`)
        .attr("stroke", "none")
        .attr("fill", "white")
        .attr("fill-opacity", "0.1")
    })
  }
}