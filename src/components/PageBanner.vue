<template>
  <div class="banner">
    <div class="logo">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'PageBanner',
  props: {
    title: {
      type: String,
      default: process.env.VUE_APP_TITLE
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  $h: 75px;

  position: relative;
  width: 100%;
  height: $h;
  background-color: #041541;
  display: flex;

  .logo {
    height: 100%;
    padding-left: 93px;
    background: url('../assets/images/logo.png') no-repeat left center/contain;
    text-align: left;

    flex: 1;
    line-height: $h;
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    text-shadow: 0px 3px 8px rgba(65, 115, 255, 0.82);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-image: linear-gradient(90deg, #0b2b55 0%, #137af8 92%, #062d51 100%);
  }
}
</style>
