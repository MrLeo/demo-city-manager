<template>
  <div class="overview row">
    <LineChart title="今日报警数" :chart-data="alarm" border-color="#ff5910"></LineChart>
    <LineChart title="连接设备数" :chart-data="device" border-color="#2bfff0"></LineChart>
    <MultipleDoughnutChart title="报警处理" :chart-data="actions"></MultipleDoughnutChart>
  </div>
</template>

<script>
import _ from 'lodash'
import LineChart from './LineChart.vue'
import MultipleDoughnutChart from './MultipleDoughnutChart.vue'

export default {
  name: 'Overview',
  components: { LineChart, MultipleDoughnutChart },
  data() {
    return {
      // TODO 今日报警数
      alarm: {
        count: 113,
        comparedWithChange: -958,
        datasets: _.map(Array(10), () => _.random(113))
      },
      // TODO 连接设备数
      device: {
        count: 7907,
        comparedWithChange: 13,
        datasets: _.map(Array(10), () => _.random(7907))
      },
      // TODO 报警处理
      actions: [
        { title: '已处理', value: 75, color: '#0EA7FD' },
        { title: '待处理', value: 19, color: '#FF710C' },
        { title: '不受理', value: 3, color: '#0EA7FD' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.overview {
  margin-top: 29px;
  margin-left: 15px;
}
</style>
<style lang="scss">
.chart {
  min-width: 410px;
  height: 186px;
  align-items: flex-end;
  margin-right: 40px;

  &__title {
    font-family: HiraginoSansGB-W6;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }
}
</style>
