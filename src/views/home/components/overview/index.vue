<template>
  <div class="overview row">
    <div class="overview__card--1 ">
      <h1 class="title">今日报警数</h1>
      <div class="row">
        <div style="margin-right: 40px">
          <h2 class="data red">{{ alarm.count }}</h2>
          <span
            class="compared"
            :class="{
              'compared--up': alarm.comparedWithChange > 0,
              'compared--down': alarm.comparedWithChange < 0
            }"
            >{{ Math.abs(alarm.comparedWithChange) }}</span
          >
        </div>
        <LineChart :chart-data="alarm" border-color="#ff5910"></LineChart>
      </div>
    </div>
    <div class="overview__card--1 row">
      <h1 class="title">连接设备数</h1>
      <div class="row">
        <div style="margin-right: 40px">
          <h2 class="data blue">{{ device.count }}</h2>
          <span
            class="compared"
            :class="{
              'compared--up': device.comparedWithChange > 0,
              'compared--down': device.comparedWithChange < 0
            }"
            >{{ Math.abs(device.comparedWithChange) }}</span
          >
        </div>
        <LineChart :chart-data="device" border-color="#2bfff0"></LineChart>
      </div>
    </div>
  </div>
</template>

<script>
import { LineChart } from './chart.js'
import _ from 'lodash'

export default {
  name: 'Overview',
  components: { LineChart },

  data() {
    return {
      alarm: {
        count: 113,
        comparedWithChange: -958,
        datasets: _.map(Array(10), () => _.random(113))
      },
      device: {
        count: 7907,
        comparedWithChange: 13,
        datasets: _.map(Array(10), () => _.random(7907))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.overview {
  margin-top: 29px;
  margin-left: 15px;
  &__card--1 {
    width: 410px;
    height: 186px;
    align-items: flex-end;

    .title {
      font-family: HiraginoSansGB-W6;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }

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
}
</style>
