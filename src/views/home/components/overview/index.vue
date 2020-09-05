<template>
  <div class="overview row">
    <div class="overview__card--1">
      <h1 class="title">今日报警数</h1>
      <h2 class="data">{{ alarm.count }}</h2>
      <span
        class="compared"
        :class="{
          'compared--up': alarm.comparedWithChange > 0,
          'compared--down': alarm.comparedWithChange < 0
        }"
        >{{ Math.abs(alarm.comparedWithChange) }}</span
      >
      <AlarmChart :chart-data="alarm"></AlarmChart>
    </div>
    <div class="overview__card--1">
      <h1 class="title">连接设备数</h1>
      <h2 class="data">{{ device.count }}</h2>
      <span
        class="compared"
        :class="{
          'compared--up': device.comparedWithChange > 0,
          'compared--down': device.comparedWithChange < 0
        }"
        >{{ Math.abs(device.comparedWithChange) }}</span
      >
      <DeviceChart :chart-data="device"></DeviceChart>
    </div>
  </div>
</template>

<script>
import { AlarmChart, DeviceChart } from './chart.js'

export default {
  name: 'Overview',
  components: { AlarmChart, DeviceChart },

  data() {
    return {
      alarm: {
        count: 113,
        comparedWithChange: -958,
        datasets: [100, 120, 200, 100]
      },
      device: {
        count: 113,
        comparedWithChange: 13,
        datasets: [100, 120, 200, 100]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.overview {
  margin-left: 15px;
  &__card--1 {
    width: 410px;
    height: 186px;
  }
}
</style>
