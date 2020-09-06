<template>
  <div class="rank">
    <div class="rank__block">
      <h1 class="rank__title">报警类型</h1>
      <div class="row center-x" style="margin-top: 79px; justify-content: space-around;">
        <AlarmDoughnutChart :chart-data="alarms"></AlarmDoughnutChart>
        <ul class="column tip">
          <li class="row center-x tip__item" v-for="alarm in alarms.percent" :key="alarm.label">
            <i class="tip__dot" :style="{ backgroundColor: alarm.color }"></i>
            <span class="tip__percent">{{ alarm.value }}</span>
            <span class="tip__label">{{ alarm.label }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="rank__block">
      <h1 class="rank__title">报警地点排行</h1>
      <ul class="toprank">
        <li class="toprank__item" v-for="rank in alarms.rank" :key="rank.label">
          <div class="row center-x toprank__progress-bar">
            <span class="toprank__score">{{ rank.value }}</span>
            <div class="toprank__progress" :style="{ width: `${rank.value * 10}px` }"></div>
          </div>
          <p class="toprank__location">{{ rank.label }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { AlarmDoughnutChart } from '../chart'
export default {
  components: {
    AlarmDoughnutChart
  },
  data() {
    return {
      alarms: {
        // TODO 报警类型
        percent: [
          { value: 15.2, color: '#4880ff', label: '城管' },
          { value: 13.8, color: '#24ccb8', label: '国土' },
          { value: 9.7, color: '#ffc400', label: '空气' },
          { value: 9.1, color: '#ff5660', label: '路灯' }
        ],
        // TODO 报警地点排行
        rank: [
          { value: 23, label: '胜利东路' },
          { value: 11, label: '胜利西路大学城西口' },
          { value: 16, label: '信阳火车站北门' },
          { value: 9, label: '长途客气站' }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rank {
  margin-left: 27px;
  &__block {
    padding: 35px 22px;
    width: 401px;
  }
  &__title {
    line-height: 20px;
    font-family: HiraginoSansGB-W6;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }

  .tip {
    &__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    &__percent {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      width: 70px;
      line-height: 38px;
      font-family: Arial-Black;
      font-size: 21px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;

      &::after {
        content: '%';
        margin: 0 2px;
        font-family: HiraginoSansGB-W3;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: rgba(255, 255, 255, 0.6);
      }
    }
    &__label {
      margin-left: 9px;
    }
  }

  .toprank {
    &__score {
      min-width: 82px;
      font-family: Arial-Black;
      font-size: 30px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 44px;
      letter-spacing: 0px;
      color: #ffffff;
    }
    &__location {
      font-family: HiraginoSansGB-W3;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(255, 255, 255, 0.6);
    }
    &__progress-bar {
      width: 363px;
    }

    &__progress {
      transition: width 4s ease-in-out;
      height: 8px;
      background-image: linear-gradient(90deg, #01fdf9 0%, #0ea7fd 100%);
      border-radius: 4px;
    }
  }
}
</style>
