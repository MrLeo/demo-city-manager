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
          :cover="video.cover"
          :src="video.source"
        ></vue-core-video-player>
      </div>
      <ul class="info">
        <li class="row">
          <div class="label">来源</div>
          <div class="val">xxxxx</div>
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
        return null
      }
    }
  },
  data() {
    return {
      video: {
        cover: 'https://img1.wxzxzj.com/vpc-example-cover-your-name-c.png',
        source: [
          { src: 'https://media.vued.vanthink.cn/sparkle_your_name_am360p.mp4', resolution: 360 },
          { src: 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4', resolution: 720 },
          {
            src:
              'https://media.vued.vanthink.cn/y2mate.com%20-%20sparkle_your_name_amv_K_7To_y9IAM_1080p.mp4',
            resolution: 1080
          }
        ]
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
    padding: 0 51px;

    .video {
      width: 953px;
      height: 539px;
      background-color: #1b1b1b;
    }

    .info {
      margin-left: 22px;
      .label {
        font-family: HiraginoSansGB-W6;
        font-size: 22px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 60px;
        letter-spacing: 0px;
        color: rgba(255, 255, 255, 0.59);
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
      }

      .state {
        color: #ff7f19;
      }
    }
  }
}
</style>
