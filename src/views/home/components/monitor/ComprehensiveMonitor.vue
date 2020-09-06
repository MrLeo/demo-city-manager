<template>
  <div class="comprehensive-monitor">
    <div id="container" class="map"></div>
    <div class="footer">
      <h1 class="footer__title">报警事件</h1>
      <ul class="row alarm">
        <li
          class="colunm center-x alarm__item"
          v-for="(alarm, index) in alarms"
          :key="index"
          @click="onAlarmClick(alarm, index)"
        >
          <div
            class="alarm__data"
            :style="{
              color: alarm.disable ? '' : alarm.color,
              filter: alarm.disable ? 'grayscale(100%)' : ''
            }"
          >
            <span
              class="row alarm__value"
              :class="{ up: alarm.ratio > 0, down: alarm.ratio < 0 }"
              >{{ alarm.count }}</span
            >
          </div>
          <p class="alarm__label">{{ alarm.label }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      alarms: [
        { label: '城管报警', count: 4, ratio: 1, color: '#f00', disable: false },
        { label: '国土资源报警', count: 4, ratio: 1, color: '#f27022', disable: false },
        { label: '空气污染报警', count: 4, ratio: -1, color: '#ffdf00', disable: false },
        { label: '路灯报警', count: 4, ratio: -1, color: '#179eff', disable: false }
      ],
      mapZoom: 12,
      marker: {}, // 点标记
      markers: [], // 点集合
      map: {} // 地图对象
    }
  },
  mounted() {
    setTimeout(() => this.initMap(), 1000)
  },
  methods: {
    // 初始化地图
    initMap() {
      // 创建地图
      this.map = new AMap.Map('container', {
        // MARK 自定义地图样式 https://lbs.amap.com/dev/mapstyle/index
        mapStyle: 'amap://styles/darkblue',
        features: ['bg', 'road'],
        resizeEnable: true, // 是否监控地图容器尺寸变化，默认值为false
        expandZoomRange: false, // 是否支持可以扩展最大缩放级别,和zooms属性配合使用设置为true的时候，zooms的最大级别在PC上可以扩大到20级，移动端还是高清19/非高清20
        center: [114.091058, 32.148624], // 地图中心位置
        zooms: [4, 16], // 缩放范围
        zoom: this.mapZoom, // 初始缩放级别
        cursor: 'pointer',
        defaultCursor: 'pointer' // 变成小手 地图默认鼠标样式。参数defaultCursor应符合CSS的cursor属性规范
        // showLabel: true, // 显示地图文字标记
      })

      // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
      this.map.plugin(['AMap.ToolBar'], () => {
        this.map.addControl(
          new AMap.ToolBar({
            liteStyle: true, // 简易缩放模式，默认为 false
            position: 'RT'
          })
        )
      })

      this.map.on('zoomchange', () => {
        console.log(`[LOG]: initMap -> 当前地图级别`, this.map.getZoom())
      })
    },
    onAlarmClick(alarm) {
      const disableAlarms = _.filter(this.alarms, 'disable')

      if (_.size(disableAlarms) === 0) {
        _.forEach(this.alarms, alarm => (alarm.disable = true))
      }

      alarm.disable = false
    }
  }
}
</script>

<style lang="scss" scoped>
.comprehensive-monitor {
  position: relative;

  .map {
    width: 1244px;
    height: 676px;
    background-color: #0a1944;

    >>> .amap-logo {
      display: none;
    }
  }

  .footer {
    height: 153px;
    background-color: rgba(2, 16, 59, 0.91);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    &__title {
      margin: 14px 0;
      padding-left: 64px;
      background: url(../../../../assets/images/ic-warning.png) no-repeat 29px center/contain;
      line-height: 20px;
      font-family: HiraginoSansGB-W6;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }

    .alarm {
      &__item {
        margin-left: 93px;
        cursor: pointer;
      }
      &__data {
        line-height: 48px;
        font-family: HiraginoSansGB-W6;
        font-size: 48px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ee3124;
      }
      .up::after {
        content: '↑';
        font-size: 18px;
        margin-left: 6px;
      }
      .down::after {
        content: '↓';
        font-size: 18px;
        margin-left: 6px;
      }

      &__label {
        margin: 0;
        line-height: 18px;
        font-family: HiraginoSansGB-W3;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }
}
</style>
<style>
.amap-touch-toolbar .amap-zoomcontrol {
  display: flex;
  flex-direction: column;
  width: 64px;
  height: 120px;
  background-color: rgba(8, 32, 89, 0.8);
}
.amap-zoom-touch-plus,
.amap-zoom-touch-minus {
  flex: 1;
  background-color: rgba(8, 32, 89, 0.8);
}
.amap-touch-toolbar .amap-zoomcontrol::after {
  display: none;
}
.amap-zoom-touch-plus > div,
.amap-zoom-touch-minus > div {
  color: #fff;
  line-height: 55px;
}
</style>
