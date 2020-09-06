// 1. Import Chart.js so you can use the global Chart object
import Chart from 'chart.js'
// 2. Import the `generateChart()` method to create the vue component.
import { generateChart } from 'vue-chartjs'

// 3. Extend one of the default charts
// http://www.chartjs.org/docs/latest/developers/charts.html
Chart.defaults.ShadowDoughnut = Chart.defaults.doughnut
var draw = Chart.controllers.doughnut.prototype.draw
Chart.controllers.ShadowDoughnut = Chart.controllers.doughnut.extend({
  draw: function() {
    draw.apply(this, arguments)
    let ctx = this.chart.chart.ctx
    let _fill = ctx.fill
    ctx.fill = function() {
      ctx.save()
      ctx.shadowColor = 'rgba(255,255,255,0.25)'
      ctx.shadowBlur = 10
      ctx.shadowOffsetX = -5
      ctx.shadowOffsetY = -5
      _fill.apply(this, arguments)
      ctx.restore()
    }
  }
})

// 4. Generate the vue-chartjs component
// First argument is the chart-id, second the chart type.
export const ShadowDoughnut = generateChart('shadow-doughnut', 'ShadowDoughnut')
