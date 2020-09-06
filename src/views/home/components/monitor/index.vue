<template>
  <div class="column monitor">
    <Tabs v-model="tab"></Tabs>
    <component :is="tab"></component>
  </div>
</template>

<script>
import Tabs from './Tabs'
import ComprehensiveMonitor from './ComprehensiveMonitor.vue'
import AirQuality from './AirQuality.vue'
import WisdomTheWatch from './WisdomTheWatch.vue'
import DepartmentHomeland from './DepartmentHomeland.vue'

export default {
  components: {
    Tabs,
    ComprehensiveMonitor,
    AirQuality,
    WisdomTheWatch,
    DepartmentHomeland
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
  width: 1244px;
  background-color: #0a1944;
}
</style>
