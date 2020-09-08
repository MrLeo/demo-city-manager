<template>
  <div class="chart doughnut-chart" style="flex: 1;">
    <h1 class="chart__title">{{ title }}</h1>
    <div class="row" style="justify-content: space-around;">
      <div v-for="(action, key) in chartData" :key="key" class="doughnut-chart__item">
        <div class="doughnut-chart__data">
          <span class="doughnut-chart__value"
            >{{ action.value }}<i class="doughnut-chart__unit">%</i></span
          >
          <p class="doughnut-chart__title">{{ action.title }}</p>
        </div>
        <DoughnutChart
          class="v-doughnut-chart"
          :chart-data="action"
          :border-color="action.color"
        ></DoughnutChart>
      </div>
    </div>
  </div>
</template>

<script>
import { DoughnutChart } from '../chart.js'

export default {
  components: { DoughnutChart },
  props: {
    title: { type: String, default: '' },
    chartData: {
      type: [Array, Object],
      default() {
        return [
          { title: '已处理', value: 0, color: '#0EA7FD' },
          { title: '待处理', value: 0, color: '#FF710C' },
          { title: '不受理', value: 0, color: '#0EA7FD' },
          { title: '已完成', value: 0, color: '#0EA7FD' }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.doughnut-chart {
  &__item {
    position: relative;
  }

  &__data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -28px);
  }

  &__value {
    line-height: 40px;
    font-family: Arial-Black;
    font-size: 36px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }

  &__unit {
    font-family: HiraginoSansGB-W6;
    font-size: 20px;
    font-weight: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }

  &__title {
    text-align: center;
    font-family: HiraginoSansGB-W6;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(255, 255, 255, 0.6);
  }

  &__item::before {
    content: '';
    display: inline-block;
    width: calc(100% - 5px);
    height: calc(100% - 5px);
    // width: 119px;
    // height: 119px;
    border: solid 4px #14337d;
    border-radius: 50%;

    @extend .doughnut-chart__data;

    transform: translate(-50%, -50%);
  }
}
.v-doughnut-chart {
  width: 120px;
  height: 120px;
}
</style>
