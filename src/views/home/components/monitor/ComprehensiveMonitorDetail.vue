<template>
  <div v-if="value" class="comprehensive-monitor-detail">
    <div class="menu row center-x">
      <div class="title">{{ value.name || '报警详情' }}</div>
      <a-icon class="close" type="close" @click="$emit('input', null)" />
    </div>
    <div class="content row">
      <section
        ref="video"
        id="video"
        class="video"
        :style="{ backgroundImage: `url(${value.cover})` }"
      ></section>
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
// https://juejin.im/post/6850037275579121671
// http://chimee.org/docs/start.html
import Chimee from 'chimee'
import ChimeePlayer from 'chimee-player'
import 'chimee-player/lib/chimee-player.browser.css'
// import axios from 'axios'

export default {
  props: {
    value: {
      type: Object,
      default() {
        return null
      }
    },
    // flv hls mp4
    box: { type: String, default: 'mp4' },
    isLive: { type: Boolean, default: false }
  },
  data() {
    return {
      player: null
    }
  },
  computed: {
    videoSource() {
      return this.value.videoSource
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        if (!val || !val.videoSource) {
          this.player = null
          return
        }
        this.initPlayer()
      }
    }
  },
  methods: {
    async initPlayer() {
      Chimee.errorHandler = error => console.log('wow, an error!!!', error.message)
      setTimeout(async () => {
        // if (!window.MediaSource) console.warn('The Media Source Extensions API is not supported.')

        // const mediaSource = new MediaSource()
        // const src = URL.createObjectURL(mediaSource)

        // mediaSource.addEventListener('sourceopen', async e => {
        //   // URL.revokeObjectURL(src)
        //   const mediaSource = e.target
        //   const mime = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
        //   const sourceBuffer = mediaSource.addSourceBuffer(mime)
        //   console.log(`[LOG]: initPlayer -> sourceBuffer1`, sourceBuffer)

        //   sourceBuffer.addEventListener('updateend', () => {
        //     if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
        //       mediaSource.endOfStream()
        //     }
        //   })

        //   const { data: videoData } = await axios.get(this.videoSource, {
        //     // headers: {
        //     //   Range: 'bytes=0-100'
        //     // },
        //     responseType: 'arraybuffer'
        //   })
        //   console.log(`[LOG]: initPlayer -> videoData`, videoData)

        //   sourceBuffer.appendBuffer(videoData)
        //   console.log(`[LOG]: initPlayer -> sourceBuffer2`, sourceBuffer)
        // })

        this.player = new ChimeePlayer({
          wrapper: '#video',
          src: this.videoSource,
          // src,
          box: this.box,
          isLive: this.isLive,
          controls: true,
          autoplay: true
        })
        this.player.play()
      }, 0)
    }
  }
}
</script>

<style>
.chimee-log {
  color: #000;
}
</style>
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
