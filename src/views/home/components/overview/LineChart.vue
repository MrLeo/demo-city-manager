<template>
  <div class="chart line-chart">
    <h1 class="chart__title">{{ title }}</h1>
    <div class="row" style="justify-content: space-between;">
      <div style="margin-right: 40px">
        <h2 class="data red">{{ chartData.count }}</h2>
        <span
          class="compared"
          :class="{
            'compared--up': chartData.comparedWithChange > 0,
            'compared--down': chartData.comparedWithChange < 0
          }"
          >{{ Math.abs(chartData.comparedWithChange) }}</span
        >
      </div>
      <LineChart
        :chart-data="chartData"
        :border-color="borderColor"
        v-bind="$attrs"
        v-on="$listeners"
      ></LineChart>
    </div>
  </div>
</template>

<script>
import { LineChart } from './chart.js'

export default {
  components: { LineChart },
  props: {
    title: { type: String, default: '' },
    borderColor: { type: String, default: '#FFF' },
    chartData: {
      type: Object,
      default() {
        return {
          count: 0,
          comparedWithChange: 0,
          datasets: []
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.line-chart {
  .data {
    line-height: 72px;
    font-family: Helvetica;
    font-size: 60px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    margin-bottom: 0;

    &.red {
      color: #ff4600;
      text-shadow: 0px 2px 4px rgba(255, 92, 92, 0.69);
    }

    &.blue {
      color: #19a4ff;
      text-shadow: 0px 1px 8px #1b58ff;
    }
  }

  .compared {
    line-height: 22px;
    font-family: HiraginoSansGB-W3;
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #27fa82;

    &::before {
      content: '';
      display: inline-block;
      line-height: 28px;
      background-color: rgba(25, 255, 112, 0.55);
      color: #000;
      margin-right: 5px;
    }

    &--up::before {
      content: '↑';
    }
    &--down::before {
      content: '↓';
    }
  }
}
</style>
