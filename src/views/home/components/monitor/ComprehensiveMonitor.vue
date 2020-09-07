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
import { gps } from '../../../../util/random'

export default {
  data() {
    return {
      alarms: [],
      marker: {}, // 点标记
      markers: [], // 点集合
      map: {} // 地图对象
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.initMap()
      this.geoDistrictExplorer()
      this.getAlarms()
      this.initMarkers()
    },
    initMap() {
      // 创建地图
      this.map = new AMap.Map('container', {
        // MARK 自定义地图样式 https://lbs.amap.com/dev/mapstyle/index
        mapStyle: 'amap://styles/darkblue',
        features: ['bg', 'road'],
        resizeEnable: true, // 是否监控地图容器尺寸变化，默认值为false
        expandZoomRange: false, // 是否支持可以扩展最大缩放级别,和zooms属性配合使用设置为true的时候，zooms的最大级别在PC上可以扩大到20级，移动端还是高清19/非高清20
        center: [114.091058, 32.148624], // TODO 地图中心位置
        zooms: [4, 16], // 缩放范围
        zoom: 12, // TODO 初始缩放级别
        cursor: 'pointer',
        defaultCursor: 'pointer' // 变成小手 地图默认鼠标样式。参数defaultCursor应符合CSS的cursor属性规范
        // showLabel: true, // 显示地图文字标记
      })

      this.map.on('complete', () => {
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
      })
    },
    geoDistrictExplorer() {
      const renderAreaNode = (districtExplorer, areaNode) => {
        //清除已有的绘制内容
        districtExplorer.clearFeaturePolygons()

        //just some colors
        var colors = [
          '#3366cc',
          '#dc3912',
          '#ff9900',
          '#109618',
          '#990099',
          '#0099c6',
          '#dd4477',
          '#66aa00'
        ]

        //绘制子级区划
        districtExplorer.renderSubFeatures(areaNode, (feature, i) => {
          var fillColor = colors[i % colors.length]
          var strokeColor = colors[colors.length - 1 - (i % colors.length)]

          return {
            cursor: 'default',
            bubble: true,
            strokeColor: strokeColor, //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 1, //线宽
            fillColor: fillColor, //填充色
            fillOpacity: 0.35 //填充透明度
          }
        })

        //绘制父级区划，仅用黑色描边
        districtExplorer.renderParentFeature(areaNode, {
          cursor: 'default',
          bubble: true,
          strokeColor: 'black', //线颜色
          fillColor: null,
          strokeWeight: 3 //线宽
        })

        //更新地图视野以适合区划面
        this.map.setFitView(districtExplorer.getAllFeaturePolygons())
      }

      AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
        const districtExplorer = new DistrictExplorer({
          eventSupport: true, //打开事件支持
          map: this.map // 关联到地图
        })
        const adcode = 411500 //全国的区划编码
        districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
          console.error(error)
          if (error) return
          renderAreaNode(districtExplorer, areaNode) //绘制载入的区划节点
        })
      })
    },
    getAlarms() {
      // TODO 报警事件数据 step-1 定义数据格式
      this.alarms.splice(
        0,
        this.alarms.length,
        ...[
          // {
          //   label: '城管报警', // 事件名
          //   count: 4, // 事件数
          //   ratio: 1, // 时间同比变化（>0:上涨，<0:下降）
          //   color: '#ff0000', // 事件颜色
          //   disable: false, // 禁用激活
          //   list: [ // 地图标记点
          //     {
          //       lng: 114.091058, // 经度
          //       lat: 32.148624, // 纬度
          //       source: '高点监测', // 来源
          //       time: '2020-09-07 15:53:12', // 时间
          //       position: '天府新区胜利东路456号', // 地点
          //
          //       // 城管、国土
          //       camera: 'CCVT123', // 摄像机
          //       angle: 50, // 方位角
          //       state: '确认中', // 状态
          //
          //       // 空气
          //       空气质量级别，AQI，PM2.5，PM10
          //
          //       // 灯联网的
          //       集中器，灯编号，当前状态
          //     }
          //   ]
          // },
          /* eslint-disable prettier/prettier*/
          { key:'site1', label: '城管报警', count: 0, ratio: 0, color: '#ff0000', disable: false, list: [] },
          { key:'site2', label: '国土资源报警', count: 0, ratio: 0, color: '#f27022', disable: false, list: [] },
          { key:'site3', label: '空气污染报警', count: 0, ratio: 0, color: '#ffdf00', disable: false, list: [] },
          { key:'site4', label: '路灯报警', count: 0, ratio: 0, color: '#179eff', disable: false, list: [] }
          /* eslint-enable prettier/prettier*/
        ]
      )

      // TODO 报警事件数据 step-2 生成数据
      this.alarms.splice(
        0,
        this.alarms.length,
        ..._.map(this.alarms, alarm => {
          alarm.count = _.random(0, 10)
          alarm.ratio = _.random(-1, 1)
          alarm.list = _.map(Array(alarm.count), () => {
            const { lng, lat } = gps(114.091058, 32.148624, 10000)
            return {
              source: '高点监测',
              time: '2020-09-07 15:53:12',
              position: '天府新区胜利东路456号',
              camera: 'CCVT123',
              angle: _.random(0, 360),
              state: '确认中',
              lng,
              lat
            }
          })
          return alarm
        })
      )
    },
    initMarkers() {
      // TODO 报警事件Marker
      _.forEach(this.alarms, (alarm, index) => {
        console.log(`[LOG]: initMarkers -> alarm, index`, alarm, index)
        const markers = _.map(
          alarm.list,
          item =>
            new AMap.Marker({
              position: new AMap.LngLat(item.lng, item.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              content: `<div class="marker ${alarm.key}">${alarm.key}</div>`, // 自定义点标记覆盖物内容
              offset: new AMap.Pixel(0, 0), // 设置点标记偏移量
              anchor: 'bottom-center' // 设置锚点方位
            })
        )
        this.markers.splice(index, 1, markers)
        this.map.add(markers)
      })
    },
    onAlarmClick(alarm, index) {
      const disableAlarms = _.filter(this.alarms, 'disable')

      if (_.size(disableAlarms) === 0) {
        _.forEach(this.alarms, (alarm, i) => {
          alarm.disable = true
          this.map.remove(this.markers[i])
        })
      }

      this.map.add(this.markers[index])
      alarm.disable = false

      // 传入覆盖物数组，仅包括polyline和marker1的情况
      // this.map.setFitView(this.markers[index]);
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
<style lang="scss">
.marker {
  width: 44px;
  height: 55px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;

  @for $site from 1 through 4 {
    &.site#{$site} {
      background-image: url(../../../../assets/images/ic-map-marker/site#{$site}.png);
    }
  }
}

.amap-touch-toolbar .amap-zoomcontrol {
  display: flex;
  flex-direction: column;
  width: 64px;
  height: 120px;
  background-color: rgba(8, 32, 89, 0.8);
  box-shadow: none;
  border: none;
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
