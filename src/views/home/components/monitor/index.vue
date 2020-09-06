<template>
  <div class="row monitor">
    <div class="column main">
      <Tabs v-model="tab"></Tabs>
      <component :is="tab"></component>
    </div>
    <Rank></Rank>
  </div>
</template>

<script>
import Tabs from './Tabs'
import ComprehensiveMonitor from './ComprehensiveMonitor.vue'
import AirQuality from './AirQuality.vue'
import WisdomTheWatch from './WisdomTheWatch.vue'
import DepartmentHomeland from './DepartmentHomeland.vue'
import Rank from './Rank.vue'

export default {
  components: {
    Tabs,
    ComprehensiveMonitor,
    AirQuality,
    WisdomTheWatch,
    DepartmentHomeland,
    Rank
  },
  data() {
    return {
      tab: 'ComprehensiveMonitor'
    }
  }
}
</script>

<style lang="scss" scoped>
.monitor {
  align-items: flex-start;
  .main {
    width: 1244px;
    background-color: #0a1944;
  }
}
</style>
<style>
.amap-logo {
  display: none !important;
  opacity: 0 !important;
}
</style>
