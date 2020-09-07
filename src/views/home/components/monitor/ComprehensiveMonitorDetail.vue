<template>
  <div v-if="value" class="comprehensive-monitor-detail">
    <div class="menu row center-x">
      <div class="title">报警详情</div>
      <a-icon class="close" type="close" @click="$emit('input', null)" />
    </div>
    <div class="content row">
      <div class="video">
        <!-- https://github.com/redxtech/vue-plyr -->
        <!-- https://github.com/core-player/vue-core-video-player -->
        <vue-core-video-player
          autoplay
          :cover="value.video.cover"
          :src="value.video.source"
        ></vue-core-video-player>
      </div>
      <ul class="info">
        <li class="row" v-if="value.source">
          <div class="label">来源</div>
          <div class="val">{{ value.source }}</div>
        </li>
        <li class="row" v-if="value.time">
          <div class="label">时间</div>
          <div class="val">{{ value.time }}</div>
        </li>
        <li class="row" v-if="value.position">
          <div class="label">地点</div>
          <div class="val">{{ value.position }}</div>
        </li>
        <li class="row" v-if="value.camera">
          <div class="label">摄像机</div>
          <div class="val">{{ value.camera }}</div>
        </li>
        <li class="row" v-if="value.lng">
          <div class="label">经度</div>
          <div class="val">{{ value.lng }}</div>
        </li>
        <li class="row" v-if="value.lat">
          <div class="label">纬度</div>
          <div class="val">{{ value.lat }}</div>
        </li>
        <li class="row" v-if="value.angle">
          <div class="label">方位角</div>
          <div class="val">{{ value.angle }}</div>
        </li>
        <li class="row" v-if="value.state">
          <div class="label">状态</div>
          <div class="val">{{ value.state }}</div>
        </li>
        <li class="row" v-if="value.qualityLevel">
          <div class="label">空气质量级别</div>
          <div class="val">{{ value.qualityLevel }}</div>
        </li>
        <li class="row" v-if="value.AQI">
          <div class="label">AQI</div>
          <div class="val">{{ value.AQI }}</div>
        </li>
        <li class="row" v-if="value.PM2">
          <div class="label">PM2.5</div>
          <div class="val">{{ value.PM2 }}</div>
        </li>
        <li class="row" v-if="value.PM10">
          <div class="label">PM10</div>
          <div class="val">{{ value.PM10 }}</div>
        </li>
        <li class="row" v-if="value.concentrator">
          <div class="label">集中器</div>
          <div class="val">{{ value.concentrator }}</div>
        </li>
        <li class="row" v-if="value.lampNumber">
          <div class="label">灯编号</div>
          <div class="val">{{ value.lampNumber }}</div>
        </li>
        <li class="row" v-if="value.lampState">
          <div class="label">当前状态</div>
          <div class="val">{{ value.lampState }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueCoreVideoPlayer from 'vue-core-video-player' // https://core-player.github.io/vue-core-video-player/zh/

Vue.use(VueCoreVideoPlayer, { lang: 'zh-CN' })

export default {
  props: {
    value: {
      type: Object,
      default() {
        // {
        //   lng: 114.091058, // 经度
        //   lat: 32.148624, // 纬度
        //   source: '高点监测', // 来源
        //   time: '2020-09-07 15:53:12', // 时间
        //   position: '天府新区胜利东路456号', // 地点
        //   // 视频信息
        //   video: {
        //     cover: 'https://img1.wxzxzj.com/vpc-example-cover-your-name-c.png', // 视频封面
        //     // 视频源
        //     source: [
        //       {
        //         src: 'https://media.vued.vanthink.cn/sparkle_your_name_am360p.mp4',
        //         resolution: 360
        //       },
        //       {
        //         src: 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4',
        //         resolution: 720
        //       },
        //       {
        //         src:
        //           'https://media.vued.vanthink.cn/y2mate.com%20-%20sparkle_your_name_amv_K_7To_y9IAM_1080p.mp4',
        //         resolution: 1080
        //       }
        //     ]
        //   },

        //   // 城管、国土
        //   camera: 'CCVT123', // 摄像机
        //   angle: 50, // 方位角
        //   state: '确认中', // 状态

        //   // 空气
        //   qualityLevel: 1, // 空气质量级别
        //   AQI: 2,
        //   PM2: 3,
        //   PM10: 4,

        //   // 灯联网的
        //   concentrator: 'AWK', // 集中器
        //   lampNumber: 'A0001', // 灯编号
        //   lampState: '正常' //当前状态
        // }
        return null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comprehensive-monitor-detail {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 200;
  transform: translate(-50%, -50%);
  background-color: #2b365c;
  width: 1391px;
  height: 701px;

  .menu {
    padding: 40px 51px;
    justify-content: space-between;

    .title {
      font-family: HiraginoSansGB-W6;
      line-height: 24px;
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }

    .close {
      width: 24px;
      height: 24px;
      color: #ffffff;
      font-size: 24px;
    }
  }

  .content {
    padding-left: 51px;

    .video {
      width: 953px;
      height: 539px;
      background-color: #1b1b1b;
    }

    .info {
      flex: 1;
      margin-left: 22px;
      .label {
        font-family: HiraginoSansGB-W6;
        font-size: 22px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 60px;
        letter-spacing: 0px;
        color: rgba(255, 255, 255, 0.59);
        word-break: break-all;
        text-align: right;
      }

      .val {
        margin-left: 14px;
        font-family: HiraginoSansGB-W6;
        font-size: 22px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 60px;
        letter-spacing: 0px;
        color: #ffffff;
        word-break: break-all;
      }

      .state {
        color: #ff7f19;
      }
    }
  }
}
</style>
