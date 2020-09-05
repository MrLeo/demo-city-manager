// https://vue-chartjs.org/zh-cn/

import { Line, mixins } from 'vue-chartjs'

export const LineChart = () => ({
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    options: {
      type: Object,
      default: null
    },
    styles: {
      type: Object,
      default() {
        return { width: '225px', height: '190px' }
      }
    }
  },
  data() {
    return {
      gradient: null,
      borderColor: '#ff5910',
      borderWidth: 2,
      pointRadius: 0,
      defaultOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        tooltip: { enabled: false },
        title: { display: false },
        scales: {
          xAxes: [{ display: false }],
          yAxes: [{ display: false, ticks: { min: 0 } }]
        }
      }
    }
  },
  computed: {
    chartDatas() {
      return {
        labels: new Array(this.chartData.datasets.length).fill(''),
        datasets: [
          {
            borderColor: this.borderColor,
            borderWidth: this.borderWidth,
            pointRadius: this.pointRadius,
            backgroundColor: this.gradient,
            data: this.chartData.datasets
          }
        ]
      }
    }
  },
  watch: {
    chartData() {
      this.$data._chart.update()
    }
  }
})

export const AlarmChart = {
  ...LineChart(),
  mounted() {
    this.borderColor = '#ff5910'
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)')
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')

    this.renderChart(this.chartDatas, { ...this.defaultOptions, ...this.options })
  }
}

export const DeviceChart = {
  ...LineChart(),
  mounted() {
    this.borderColor = '#2bfff0'
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(43,255,240, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(43,255,240, 0.25)')
    this.gradient.addColorStop(1, 'rgba(43,255,240, 0)')

    this.renderChart(this.chartDatas, { ...this.defaultOptions, ...this.options })
  }
}
