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
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: linear-gradient(90deg, #021541 0%, #0e2257 51%, #040d2b 100%);
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
</style>
