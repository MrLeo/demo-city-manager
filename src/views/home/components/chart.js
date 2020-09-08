// https://vue-chartjs.org/zh-cn/

import _ from 'lodash'
import { Doughnut, Line, mixins } from 'vue-chartjs'
import { ShadowDoughnut } from './custom-chart'

export const hexToRgba = (hex, opacity) => {
  return (
    'rgba(' +
    parseInt('0x' + hex.slice(1, 3)) +
    ',' +
    parseInt('0x' + hex.slice(3, 5)) +
    ',' +
    parseInt('0x' + hex.slice(5, 7)) +
    ',' +
    opacity +
    ')'
  )
}

export const LineChart = {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    // chart-data: { count: 0, comparedWithChange: 0, datasets: [0] }
    options: {
      type: Object,
      default: null
    },
    styles: {
      type: Object,
      default() {
        return { /* width: '223px', height: '129px', */ position: 'relative' }
      }
    },
    borderColor: {
      type: String,
      default: '#ff5910'
    },
    borderWidth: {
      type: Number,
      default: 2
    },
    pointRadius: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      gradient: null,
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
    getChartData() {
      return {
        labels: _.fill(Array(this.chartData.datasets.length), ''),
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
    },
    getOptions() {
      let min = _.min(this.chartData.datasets)
      return _.merge(
        this.defaultOptions,
        {
          scales: {
            xAxes: [{ display: false }],
            yAxes: [
              {
                display: false,
                ticks: { min: _.lt(min, 50) ? 0 : min - 50 }
              }
            ]
          }
        },
        this.options
      )
    }
  },
  watch: {
    chartData() {
      this.setGradient()
      setTimeout(() => this.$data._chart.update(), 0)
    }
  },
  mounted() {
    this.setGradient()
    this.renderChart(this.getChartData, this.getOptions)
  },
  methods: {
    setGradient() {
      const ctx = this.$refs.canvas.getContext('2d')

      this.gradient = ctx.createLinearGradient(0, 0, 0, 130)
      this.gradient.addColorStop(0, hexToRgba(this.borderColor, 0.5))
      this.gradient.addColorStop(0.5, hexToRgba(this.borderColor, 0.25))
      this.gradient.addColorStop(1, hexToRgba(this.borderColor, 0))
    }
  }
}

export const DoughnutChart = {
  extends: ShadowDoughnut,
  mixins: [mixins.reactiveProp],
  props: {
    // chart-data: { title: '已处理', value: 0, color: '#0EA7FD' },
    options: {
      type: Object,
      default: null
    },
    styles: {
      type: Object,
      default() {
        return { /* width: '120px', height: '120px', */ position: 'relative' }
      }
    },
    borderColor: {
      type: String,
      default: 'rgba(0,0,0,0)'
    },
    borderWidth: {
      type: Number,
      default: 0
    },
    cutoutPercentage: {
      type: Number,
      default: 85
    }
  },
  data() {
    return {
      gradient: null,
      defaultOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        tooltip: { enabled: false },
        title: { display: false },
        cutoutPercentage: this.cutoutPercentage
      }
    }
  },
  computed: {
    getChartData() {
      return {
        labels: ['', ''],
        datasets: [
          {
            borderWidth: this.borderWidth,
            borderColor: this.borderColor,
            backgroundColor: [this.gradient, 'rgba(20,51,125,0)'],
            data: [this.chartData.value, 100 - this.chartData.value]
          }
        ]
      }
    },
    getOptions() {
      return _.merge(this.defaultOptions, this.options)
    }
  },
  watch: {
    chartData() {
      this.setGradient()
      setTimeout(() => this.$data._chart.update(), 0)
    }
  },
  mounted() {
    this.setGradient()
    this.renderChart(this.getChartData, this.getOptions)
  },
  methods: {
    setGradient() {
      const ctx = this.$refs.canvas.getContext('2d')

      this.gradient = ctx.createLinearGradient(100, 0, 0, 0)
      this.gradient.addColorStop(0, hexToRgba(this.borderColor, 1))
      this.gradient.addColorStop(0.5, hexToRgba(this.borderColor, 0.5))
      this.gradient.addColorStop(1, hexToRgba(this.borderColor, 1))
    }
  }
}

export const AlarmDoughnutChart = {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: {
    // chart-data: { percent: [{ value: 15.2, color: '#4880ff', label: '城管' }] },
    options: {
      type: Object,
      default: null
    },
    styles: {
      type: Object,
      default() {
        return { /* width: '154px', height: '154px', */ position: 'relative' }
      }
    },
    borderColor: {
      type: String,
      default: 'rgba(0,0,0,0)'
    },
    borderWidth: {
      type: Number,
      default: 0
    },
    cutoutPercentage: {
      type: Number,
      default: 85
    }
  },
  data() {
    return {
      gradient: null,
      defaultOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        tooltip: { enabled: false },
        title: { display: false },
        cutoutPercentage: this.cutoutPercentage
      }
    }
  },
  computed: {
    getChartData() {
      return {
        labels: _.fill(Array(this.chartData.percent.length), ''),
        datasets: [
          {
            borderWidth: this.borderWidth,
            borderColor: this.borderColor,
            backgroundColor: _.map(this.chartData.percent || [], 'color'),
            data: _.map(this.chartData.percent, 'value')
          }
        ]
      }
    },
    getOptions() {
      return _.merge(this.defaultOptions, this.options)
    }
  },
  watch: {
    chartData() {
      setTimeout(() => this.$data._chart.update(), 0)
    }
  },
  mounted() {
    this.renderChart(this.getChartData, this.getOptions)
  }
}
