<template>
  <div id="app" class="app colunm">
    <PageBanner></PageBanner>
    <div class="app__main row">
      <PageMenu class="app__menu"></PageMenu>
      <div class="app__content">
        <router-view />
      </div>
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
@import './assets/scss/base.scss';

.app {
  min-height: 100%;
  min-width: 1920px;
  // zoom: 0.78;
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: linear-gradient(90deg, #071439 210px, #0e2257 51%, #040d2b 100%);
  color: #fff;

  &__main {
    flex: 1;
  }

  &__content {
    flex: 1;
  }

  .page {
    padding: 25px;
  }
}

// @media all and (-moz-min-device-pixel-ratio: 1.81) and (-moz-max-device-pixel-ratio: 2.1),
//   (-webkit-min-device-pixel-ratio: 1.81) and (-webkit-max-device-pixel-ratio: 2.1),
//   (min-resolution: 1.81dppx) and (max-resolution: 2.1dppx) {
//   :root {
//     color: #fff;
//   }
// }
</style>
