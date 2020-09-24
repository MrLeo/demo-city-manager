<template>
  <div v-if="value" class="comprehensive-monitor-detail">
    <div class="menu row center-x">
      <div class="title">{{ value.name || '报警详情' }}</div>
      <a-icon class="close" type="close" @click="$emit('input', null)" />
    </div>
    <div class="content row">
      <div class="video" :style="{ backgroundImage: `url(${value.cover})` }">
        <!-- https://github.com/redxtech/vue-plyr -->
        <!-- https://github.com/core-player/vue-core-video-player -->
        <vue-core-video-player
          v-if="value.videoSource"
          autoplay
          preload="metadata"
          :core="core"
          :cover="value.cover"
          :src="value.videoSource"
        ></vue-core-video-player>
      </div>
      <ul class="info">
        <li class="row" v-for="(item, index) in value.info" :key="index">
          <div class="label">{{ item.label }}</div>
          <div class="val" :class="{ state: item.label === '状态' }">{{ item.value }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueCoreVideoPlayer, { BaseVideoCore } from 'vue-core-video-player' // https://core-player.github.io/vue-core-video-player/zh/
import HLSCore from '@core-player/playcore-hls'

Vue.use(VueCoreVideoPlayer, { lang: 'zh-CN' })

export default {
  props: {
    value: {
      type: Object,
      default() {
        return null
      }
    },
    isHLS: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * {@link https://sourcegraph.com/github.com/core-player/vue-core-video-player/-/blob/src/core/index.js HLS 视频}
     */
    core() {
      if (this.isHLS || /\.m3u8/.test(this.value.videoSource)) {
        return HLSCore
      }
      return BaseVideoCore
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
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }

    .info {
      flex: 1;
      margin-left: 22px;
      .label {
        min-width: 65px;
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
