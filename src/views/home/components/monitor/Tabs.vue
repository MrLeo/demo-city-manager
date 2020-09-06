<template>
  <div class="row tabs">
    <ul class="row">
      <li
        class="tab"
        v-for="tab in tabs"
        :key="tab.key"
        @click="$emit('input', tab.key)"
        :class="{ active: value === tab.key }"
      >
        {{ tab.label }}
      </li>
    </ul>
    <icon-font iconStyle="font-size:18px;cursor: pointer;" iconType="icon-filter-map" />
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default() {
        return [
          { key: 1, label: '综合监控' },
          { key: 2, label: '空气质量' },
          { key: 3, label: '智慧城管' },
          { key: 4, label: '国土监测' }
        ]
      }
    },
    value: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  $h: 59px;

  padding: 0 36px;
  align-items: center;
  justify-content: space-between;
  width: 1245px;
  height: $h;
  line-height: $h;
  background-color: rgba(37, 110, 255, 0.09);

  font-family: HiraginoSansGB-W6;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #179eff;

  & > .row {
    margin: 0;
  }

  .tab {
    position: relative;
    margin-right: 70px;
    cursor: pointer;
    line-height: $h;

    &.active {
      color: #ffffff;

      &::after {
        content: '';
        display: block;
        background-color: #179eff;
        height: 6px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
  }
}
</style>
