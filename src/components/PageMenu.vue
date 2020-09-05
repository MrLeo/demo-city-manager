<template>
  <div class="nav">
    <router-link
      class="nav__item"
      v-for="(menu, index) in menus"
      :key="index"
      :to="menu.path"
      :style="{ backgroundImage: `url(${menu.icon})` }"
      >{{ menu.title }}</router-link
    >
  </div>
</template>

<script>
export default {
  name: 'PageMenu',
  data() {
    return {
      menus: [
        { title: '智慧大屏', path: '/', icon: require('../assets/images/ic-menu/1.png') },
        { title: '智慧管理', path: '/2', icon: require('../assets/images/ic-menu/2.png') },
        { title: '报警列表', path: '/3', icon: require('../assets/images/ic-menu/3.png') },
        { title: '数据分析', path: '/4', icon: require('../assets/images/ic-menu/4.png') },
        { title: '用户管理', path: '/5', icon: require('../assets/images/ic-menu/5.png') },
        { title: '系统设置', path: '/6', icon: require('../assets/images/ic-menu/6.png') }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  height: 100%;
  width: 201px;
  display: flex;
  flex-direction: column;
  background-color: #0d1a44;

  &__item {
    $h: 60px;

    padding-left: 89px;
    position: relative;
    height: $h;
    font-family: HiraginoSansGB-W6;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: $h;
    letter-spacing: 0px;
    color: #c9dfff;
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 61px;

    &.router-link-exact-active {
      background-color: #071439;
      color: #099eff;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: $h;
        background-color: #19a4ff;
      }
    }
  }
}
</style>
