import { catchData } from '../../index.js';
import {
  clearCharts
} from '../util/bubble_chart.js'
import {renderAreaChart} from '../util/area_chart.js'

export const spatialToTemporal = () => {

  clearCharts();

  renderAreaChart(catchData.byArea["Kodiak"], 'pounds')



}