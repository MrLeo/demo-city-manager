<template>
  <div id="app">
    <PageBanner></PageBanner>
    <div class="main">
      <PageMenu class="menu"></PageMenu>
      <router-view />
    </div>
  </div>
</template>

<script>
import PageBanner from './components/PageBanner.vue'
import PageMenu from './components/PageMenu.vue'

export default {
  components: {
    PageBanner,
    PageMenu
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: linear-gradient(90deg, #021541 0%, #0e2257 51%, #040d2b 100%);
  color: #fff;
}

.main {
  flex: 1;
  display: flex;

  & + .menu {
    width: 200px;
    height: 1008px;
    background-color: #0d1a44;
  }
}
</style>
