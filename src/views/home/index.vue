<template>
  <div class="page home">
    <Breadcrumb></Breadcrumb>
    <Overview></Overview>
  </div>
</template>

<script>
import Breadcrumb from './components/Breadcrumb.vue'
import Overview from './components/overview'

export default {
  name: 'Home',
  components: { Breadcrumb, Overview },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
