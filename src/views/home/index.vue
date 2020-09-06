<template>
  <div class="page home">
    <Breadcrumb></Breadcrumb>
    <Overview></Overview>
    <Monitor></Monitor>
  </div>
</template>

<script>
import Breadcrumb from './components/Breadcrumb.vue'
import Overview from './components/overview'
import Monitor from './components/monitor'

export default {
  name: 'Home',
  components: { Breadcrumb, Overview, Monitor },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
