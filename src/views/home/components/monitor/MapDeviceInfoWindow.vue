<template>
  <div class="map-device-info">
    <div class="info-title">
      {{ title
      }}<span @click="viewInfo" class="view-info"
        >（<span class="link-txt">查看设备详情</span>）</span
      >
    </div>

    <div v-if="markerInfo" :class="deviceImg ? 'info-main' : 'info-main no-img'">
      <div class="info-main-left">
        <div class="item-txt">
          <span>设备编号</span>
          <span class="right-value" v-if="markerInfo.code">
            <a-tooltip placement="topLeft" class="value-txt">
              <template slot="title">
                {{ markerInfo.code || '无' }}
              </template>
              {{ markerInfo.code || '无' }}
            </a-tooltip>
          </span>
          <span class="right-value" v-else>无</span>
        </div>

        <div class="item-txt">
          <span>设备名称</span>
          <span class="right-value" v-if="markerInfo.deviceName">
            <a-tooltip placement="topLeft" class="value-txt">
              <template slot="title">
                {{ markerInfo.deviceName || '无' }}
              </template>
              {{ markerInfo.deviceName || '无' }}
            </a-tooltip>
          </span>
          <span class="right-value" v-else>无</span>
        </div>

        <div class="item-txt">
          <span>设备位置</span>
          <span class="right-value" v-if="markerInfo.address">
            <a-tooltip placement="topLeft" class="value-txt">
              <template slot="title">
                {{ markerInfo.address }}
              </template>
              {{ markerInfo.address }}
            </a-tooltip>
          </span>
          <span class="right-value" v-else>无</span>
        </div>
      </div>

      <div class="info-main-right" v-if="deviceImg">
        <img :src="deviceImg" alt="图片" class="right-img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapInfoWindow',
  props: {
    title: {
      type: String,
      default: ''
    },
    markerInfo: {
      type: Object,
      default: null
    },
    deviceImg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    viewInfo() {
      console.log('查看设备详情！！！')
      this.$emit('handleView', this.markerInfo)
    }
  }
}
</script>

<style scoped></style>
