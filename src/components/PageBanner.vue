<template>
  <div class="banner">
    <div class="logo">信阳智慧城市综合管理平台</div>
  </div>
</template>

<script>
export default {
  name: 'PageBanner'
}
</script>

<style lang="scss" scoped>
.banner {
  $h: 75px;

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
}
</style>
