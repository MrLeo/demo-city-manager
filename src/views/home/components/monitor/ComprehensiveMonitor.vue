<template>
  <div class="comprehensive-monitor">
    <div class="map">
      <div id="container" class="map-container"></div>
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
    <ComprehensiveMonitorDetail v-model="markerDetail"></ComprehensiveMonitorDetail>
  </div>
</template>

<script>
/* eslint-disable max-len */
import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
import { gps } from '../../../../util/random'
import ComprehensiveMonitorDetail from './ComprehensiveMonitorDetail.vue'

export default {
  components: { ComprehensiveMonitorDetail },
  data() {
    return {
      alarms: [
        // TODO 报警事件数据 step-1 定义数据格式
        // {
        //   label: '城管报警', // 事件类型
        //   count: 4, // 事件数
        //   ratio: 1, // 事件同比变化（>0:上涨，<0:下降）
        //   color: '#ff0000', // 事件颜色
        //   disable: false, // 禁用激活
        //   list: [
        //     // 地图标记点
        //     {
        //       lng: 114.091058, // 经度
        //       lat: 32.148624, // 纬度
        //       name: '海营水库打起污染检测指数超标', // 事件名
        //       level: '高级', // 事件等级
        //       time: '2020-09-07 15:53:12', // 时间
        //       position: '天府新区胜利东路456号', // 地点
        //       cover: 'https://img1.wxzxzj.com/vpc-example-cover-your-name-c.png', // 左侧（视频封面 / 背景图）
        //       videoSource: 'https://gbs.liveqing.com:10010/play.html?serial=34020000001110000064&code=37020100001320000003&aspect=fullscreen', // 视频地址
        //       info:[
        //           // 国土资源和智慧城管
        //           {label: '来源', value: '高点监测'},
        //           {label: '时间', value: '2020-09-10 21:42:00'},
        //           {label: '地点', value: '天府新区胜利东路456号'},
        //           {label: '摄像机', value: 'CCVT123'},
        //           {label: '经度', value: 114.091058},
        //           {label: '纬度', value: 32.148624},
        //           {label: '方位角', value: '50度'},
        //           {label: '状态', value: '确认中'},

        //           // 灯联网
        //           {label: '来源', value: '高点监测'},
        //           {label: '时间', value: '2020-09-10 21:42:00'},
        //           {label: '经度', value: 114.091058},
        //           {label: '纬度', value: 32.148624},
        //           {label: '集中器', value: '天烛峰路北变压器'},
        //           {label: '灯编号', value: 2},
        //           {label: '状态', value: '故障'},

        //           // 空气质量
        //           {label: '来源', value: '高点监测'},
        //           {label: '时间', value: '2020-09-10 21:42:00'},
        //           {label: '地点', value: '天府新区胜利东路456号'},
        //           {label: '污染级别', value: '重度污染'},
        //           {label: 'AQI', value: '255'},
        //           {label: 'PM2.5', value: '280'},
        //           {label: 'PM10', value: '130'},
        //           {label: '状态', value: '确认中'}
        //         ],
        //     }
        //   ]
        // },
        /* eslint-disable prettier/prettier*/
        { key:'site1', label: '城管报警', count: 0, ratio: 0, color: '#ff0000', disable: false, list: [] },
        { key:'site2', label: '国土资源报警', count: 0, ratio: 0, color: '#f27022', disable: false, list: [] },
        { key:'site3', label: '空气污染报警', count: 0, ratio: 0, color: '#ffdf00', disable: false, list: [] },
        { key:'site4', label: '路灯报警', count: 0, ratio: 0, color: '#179eff', disable: false, list: [] }
        /* eslint-enable prettier/prettier*/
      ],
      markerDetail: null,
      markers: [], // 点集合
      districtExplorer: null, // 行政区
      zoom: 9, // TODO 初始缩放级别
      map: {} // 地图对象
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      await this.getAlarms()
      this.initMap()
      this.geoDistrictExplorer()
      this.initMarkers()
    },

    /** 初始化数据 */
    async getAlarms() {
      // TODO 报警事件数据 step-2 生成数据
      return await Promise.all([
        this.getLandResources(0),
        this.getLandResources(1),
        this.getLightPoleData(),
        this.getAirPollution()
      ])
    },

    /** 获取『国土资源』『智慧城管』报警数据 */
    async getLandResources(index) {
      const markers = _.map(Array(_.random(0, 10)), () => {
        const { lng, lat } = gps(115.221717, 32.0189, 40000)
        return {
          lng, // 经度
          lat, // 纬度
          name: `高点监测`, // 事件名
          level: '高级', // 事件等级
          time: moment().format('YYYY-MM-DD HH:mm:ss'), // 时间
          position: '天府新区胜利东路456号', // 地点
          cover: require('../../../../../public/cover.png'), // 左侧（视频封面 / 背景图）
          // videoSource: 'https://media.wxzxzj.com/the_garden_of_words_trailer_english__1080p.m3u8',
          // videoSource: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s-fmp4/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
          videoSource:
            'https://gbs.liveqing.com:10010/sms/34020000002020000001/hls/34020000001110000064_37020100001320000003/34020000001110000064_37020100001320000003_live.m3u8?token=dL-UEfzsaXXcgkp8KKHc__kcGhLlj9AOAGNNlIz8fiI.oxNTk5NzU2NzM3LCJwIjoiMzA4NjMyYTc4ZCIsInQiOjE1OTk3NTY0MzcsInUiOiIzMDg2MzJhNzhkIn0eyJlIj.GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJhb',
          info: [
            { label: '来源', value: '大气污染监测' },
            { label: '时间', value: moment().format('YYYY-MM-DD HH:mm:ss') },
            { label: '地点', value: '信阳市开发区海营水库' },
            { label: '摄像机', value: 'CCVT123' },
            { label: '经度', value: lng },
            { label: '纬度', value: lat },
            { label: '方位角', value: `${_.random(0, 360)}度` },
            { label: '状态', value: '确认中' }
          ]
        }
      })

      const alarm = this.alarms[index]
      alarm.count = markers.length
      alarm.ratio = _.random(-1, 1)
      alarm.list = markers

      return Promise.resolve(markers)
    },

    /** 获取『灯联网』报警数据 */
    async getLightPoleData() {
      // eslint-disable-next-line prettier/prettier
      const { data: { pole,transf } } = await axios.get('http://114.215.143.58:5502/api/Transfinfo.ashx?code=3801')

      const markers = []
      _.forEach(pole, poleItem => {
        if (poleItem.pole_state === 5) {
          const markerInfo = {
            lng: poleItem.lng_baidu, // 经度
            lat: poleItem.lat_baidu, // 纬度
            name: `灯联网报警`, // 事件名
            level: '故障', // 事件等级
            time: poleItem.fault_dt || '', // 时间
            point: poleItem.point || '', // 灯编号
            position: '', // 地点
            cover: require('../../../../../public/cover.png') // 左侧（视频封面 / 背景图）
          }
          markers.push({
            ...markerInfo,
            info: [
              { label: '来源', value: markerInfo.name },
              { label: '时间', value: markerInfo.time },
              { label: '经度', value: markerInfo.lng || '' },
              { label: '纬度', value: markerInfo.lat || '' },
              { label: '集中器', value: transf.name || '' },
              { label: '灯编号', value: markerInfo.point || '' },
              { label: '状态', value: markerInfo.level }
            ]
          })
        }
      })

      const alarm = this.alarms[3]
      alarm.count = markers.length
      alarm.ratio = _.random(-1, 1)
      alarm.list = markers

      return markers
      // return _.filter(pole, poleItem => poleItem.pole_state === 5)
    },

    /** 获取『空气污染』报警数据 */
    async getAirPollution() {
      const markers = [
        {
          lng: '114.17315', // 经度
          lat: '32.18745', // 纬度
          name: `海营水库大气污染检测指数超标`, // 事件名
          level: '确认中', // 事件等级
          time: moment().format('YYYY-MM-DD HH:mm:ss'), // 时间
          position: '信阳市开发区海营水库', // 地点
          cover: require('../../../../../public/demo.vue-chartjs.org.png'), // 左侧（视频封面 / 背景图）
          info: [
            { label: '来源', value: '大气污染监测' },
            { label: '时间', value: moment().format('YYYY-MM-DD HH:mm:ss') },
            { label: '地点', value: '信阳市开发区海营水库' },
            { label: '污染级别', value: '严重污染' },
            { label: 'AQI', value: '255' },
            { label: 'PM2.5', value: '280' },
            { label: 'PM10', value: '130' },
            { label: '状态', value: '确认中' }
          ]
        },
        {
          lng: '114.16058', // 经度
          lat: '332.13957', // 纬度
          name: `城东办事处大气污染检测指数超标`, // 事件名
          level: '中度污染', // 事件等级
          time: moment().format('YYYY-MM-DD HH:mm:ss'), // 时间
          position: '信阳市开发区城东办事处', // 地点
          cover: require('../../../../../public/demo.vue-chartjs.org.png'), // 左侧（视频封面 / 背景图）
          info: [
            { label: '来源', value: '大气污染监测' },
            { label: '时间', value: moment().format('YYYY-MM-DD HH:mm:ss') },
            { label: '地点', value: '信阳市开发区城东办事处' },
            { label: '污染级别', value: '中度污染' },
            { label: 'AQI', value: '177' },
            { label: 'PM2.5', value: '168' },
            { label: 'PM10', value: '190' },
            { label: '状态', value: '中度污染' }
          ]
        },
        {
          lng: '114.17209', // 经度
          lat: '32.13678', // 纬度
          name: `新栗集团大气污染检测指数超标`, // 事件名
          level: '轻度污染', // 事件等级
          time: moment().format('YYYY-MM-DD HH:mm:ss'), // 时间
          position: '信阳市开发区新栗集团', // 地点
          cover: require('../../../../../public/demo.vue-chartjs.org.png'), // 左侧（视频封面 / 背景图）
          info: [
            { label: '来源', value: '大气污染监测' },
            { label: '时间', value: moment().format('YYYY-MM-DD HH:mm:ss') },
            { label: '地点', value: '信阳市开发区新栗集团' },
            { label: '污染级别', value: '严重污染' },
            { label: 'AQI', value: '127' },
            { label: 'PM2.5', value: '125' },
            { label: 'PM10', value: '130' },
            { label: '状态', value: '轻度污染' }
          ]
        }
      ]

      const alarm = this.alarms[2]
      alarm.count = markers.length
      alarm.ratio = _.random(-1, 1)
      alarm.list = markers

      return Promise.resolve(markers)
    },

    /** 初始化地图 */
    initMap() {
      // 创建地图
      this.map = window.map = new AMap.Map('container', {
        // MARK 自定义地图样式 https://lbs.amap.com/dev/mapstyle/index
        mapStyle: 'amap://styles/darkblue',
        features: ['bg', 'road'],
        resizeEnable: true, // 是否监控地图容器尺寸变化，默认值为false
        expandZoomRange: false, // 是否支持可以扩展最大缩放级别,和zooms属性配合使用设置为true的时候，zooms的最大级别在PC上可以扩大到20级，移动端还是高清19/非高清20
        center: [114.879901, 31.971168], // TODO 地图中心位置
        zooms: [4, 16], // 缩放范围
        zoom: this.zoom,
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
          const zoom = this.map.getZoom()
          if (this.zoom > zoom) this.geoDistrictExplorer()
          this.zoom = zoom
        })
      })
    },

    /** 行政区
     * https://lbs.amap.com/api/amap-ui/demos/amap-ui-districtexplorer/index
     */
    geoDistrictExplorer() {
      AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
        const districtExplorer = (this.districtExplorer = new DistrictExplorer({
          eventSupport: true, //打开事件支持
          map: this.map
        }))

        let currentAreaNode = null //当前聚焦的区域

        //绘制某个区域的边界
        const renderAreaPolygons = areaNode => {
          // this.map.setBounds(areaNode.getBounds(), null, null, true) //更新地图视野
          districtExplorer.clearFeaturePolygons() //清除已有的绘制内容
          //绘制子区域
          districtExplorer.renderSubFeatures(areaNode, () => {
            return {
              cursor: 'default',
              bubble: true,
              strokeColor: '#00AFFF', //线颜色
              strokeOpacity: 1, //线透明度
              strokeWeight: 1, //线宽
              fillColor: '#00AFFF', //填充色
              fillOpacity: 0 //填充透明度
            }
          })
          //绘制父区域
          districtExplorer.renderParentFeature(areaNode, {
            cursor: 'default',
            bubble: true,
            strokeColor: '#00AFFF', //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 1, //线宽
            fillColor: '#00AFFF', //填充色
            fillOpacity: 0 //填充透明度
          })
        }

        //切换区域
        const switch2AreaNode = adcode => {
          if (currentAreaNode && '' + currentAreaNode.getAdcode() === '' + adcode) return
          districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
            if (error) return
            currentAreaNode = window.currentAreaNode = areaNode
            districtExplorer.setAreaNodesForLocating([currentAreaNode]) //设置当前使用的定位用节点
            districtExplorer.setHoverFeature(null)
            renderAreaPolygons(areaNode)
          })
        }

        //监听feature的hover事件
        districtExplorer.on('featureMouseout featureMouseover', (e, feature) => {
          const props = feature.properties
          const polys = districtExplorer.findFeaturePolygonsByAdcode(props.adcode)
          _.forEach(polys, poly =>
            poly.setOptions({ fillOpacity: e.type === 'featureMouseover' ? 0.2 : 0 })
          )
        })

        // //监听鼠标在feature上滑动
        // districtExplorer.on('featureMousemove', (e, feature) => {
        //   console.log(`[LOG]: geoDistrictExplorer -> e, feature`, e, feature)
        // })

        //feature被点击
        districtExplorer.on('featureClick', (e, feature) => {
          var props = feature.properties
          //如果存在子节点
          // if (props.childrenNum > 0) {
          //切换聚焦区域
          switch2AreaNode(props.adcode)
          // }
        })

        //外部区域被点击
        districtExplorer.on('outsideClick', function(e) {
          districtExplorer.locatePosition(
            e.originalEvent.lnglat,
            function(error, routeFeatures) {
              if (routeFeatures && routeFeatures.length > 1) {
                switch2AreaNode(routeFeatures[1].properties.adcode) //切换到省级区域
              } else {
                switch2AreaNode(100000) //切换到全国
              }
            },
            { levelLimit: 2 }
          )
        })

        switch2AreaNode(411500)
      })
    },

    /** 初始化Marker */
    initMarkers() {
      const _this = this

      window.onMarkerClick = (key, index) => {
        const alarm = _.find(this.alarms, alarm => alarm.key === key)
        const marker = alarm.list[index] || {}
        this.markerDetail = marker
      }

      // TODO 报警事件Marker
      _.forEach(this.alarms, (alarm, index) => {
        console.log(`[LOG]: initMarkers -> alarm`, alarm)
        const markers = _.map(alarm.list, (item, index) => {
          console.log(`[LOG]: initMarkers -> item`, item)
          const marker = new AMap.Marker({
            position: new AMap.LngLat(item.lng, item.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            content: `<div class="marker ${alarm.key}">${alarm.key}</div>`, // 自定义点标记覆盖物内容
            offset: new AMap.Pixel(0, 0), // 设置点标记偏移量
            anchor: 'bottom-center', // 设置锚点方位
            extData: item
          })
          marker.on('click', function() {
            _this.markerDetail = this.getExtData()
          })
          marker.on('mouseover', function() {
            const infoWindow = new AMap.InfoWindow({
              isCustom: true, //使用自定义窗体
              content: `
<div class="info-window" style="background-color: rgb(77,159,224,0.6);">
  <div class="info-window__head row center-x" style="background-color: ${
    alarm.color
  };color: #FFF;padding: 2px;font-size: 16px;font-weight: 900;">${alarm.label}</div>
  <h1 class="info-window__title row center-x" style="flex-wrap: nowrap;color: #fff; font-size: 20px; font-weight: 900; margin: 5px; white-space: nowrap;">
    <span class="info-window__title-txt">${item.name}</span>&nbsp;
    <span class="level" style="white-space: nowrap;font-size:10px;background-color:#f00;">${
      item.level
    }</span>
  </h1>
  <ul style="padding:5px;">
    <li class="row" style="${item.time ? '' : 'display:none'}">
      <div class="label" style="width:30px;">时间</div>
      <div class="value">${item.time}</div>
    </li>
    <li class="row" style="${item.position ? '' : 'display:none'}">
      <div class="label" style="width:30px;">地点</div>
      <div class="value">${item.position}</div>
    </li>
  </ul>
  <div class="info-window__footer" style="display:flex;justify-content:flex-end;padding:5px;">
    <a href="javascript:window.onMarkerClick('${
      alarm.key
    }',${index})" class="footer-btn" style="background-color:${
                alarm.color
              };color:#FFF;width:100px;padding:5px;text-align:center;">查看详情</a>
  </div>
</div>`,
              offset: new AMap.Pixel(0, -10)
            })
            infoWindow.open(_this.map, marker.getPosition())
          })
          marker.on('mouseout', function() {
            _this.map.clearInfoWindow()
          })
          return marker
        })
        this.markers.splice(index, 1, markers)
        this.map.add(markers)
      })
    },

    /** 点击页脚报警事件 */
    onAlarmClick(alarm, index) {
      const enableAlarms = _.filter(this.alarms, alarm => !alarm.disable)
      const enableAlarmsSize = _.size(enableAlarms)

      if (enableAlarmsSize === this.alarms.length) {
        _.forEach(this.alarms, (alarm, i) => {
          alarm.disable = true
          this.map.remove(this.markers[i])
        })
      }

      if (enableAlarmsSize === 1 && alarm.key === enableAlarms[0]['key']) {
        _.forEach(this.alarms, (alarm, i) => {
          alarm.disable = false
          this.map.add(this.markers[i])
        })
        this.map.remove(this.markers[index])
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
  .map {
    position: relative;
  }

  .map-container {
    width: 1244px;
    height: 720px;
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
