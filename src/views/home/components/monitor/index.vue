<template>
  <div class="row monitor">
    <div class="column main">
      <Tabs v-model="tab"></Tabs>
      <component class="tab__content" :is="tab"></component>
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
  align-items: stretch;
  .main {
    // width: 1244px;
    flex: 1;
    background-color: #0a1944;

    .tab__content {
      flex: 1;
      height: calc(100% - 59px);
    }
  }
}
</style>
<style>
.amap-logo {
  display: none !important;
  opacity: 0 !important;
}
</style>
