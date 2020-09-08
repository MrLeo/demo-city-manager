<template>
  <div ref="infoWindow" class="info-window">
    <div className="info-window__head row center-x" :style="{ backgroundColor: value.color }">
      {{ value.label }}
    </div>
    <h1 className="info-window__title row center-x">
      发生疑似森林火情
      <span class="level">高级</span>
    </h1>
    <ul class="info-window__list" style="">
      <li class="row center-x">
        <div class="label">时间</div>
        <div class="value">{{ value.time }}</div>
      </li>
      <li class="row center-x">
        <div class="label">地点</div>
        <div class="value">{{ value.position }}</div>
      </li>
    </ul>
    <div className="info-window__footer" style="">
      <div
        className="footer-btn"
        :style="{ backgroundColor: value.color }"
        @click="$emit('view', value)"
      >
        实时监控
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {
          list: []
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-window {
  background-color: rgb(77, 159, 224, 0.6);
  &__head {
    color: #fff;
    padding: 2px;
    font-size: 16px;
    font-weight: 900;
  }
  &__title {
    color: #fff;
    font-size: 20px;
    font-weight: 900;
    margin: 5px;
    .level {
      font-size: 14px;
      padding: 2px;
      background-color: #f00;
    }
  }
  &__list {
    padding: 5px;
    .label {
      width: 30px;
    }
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    .footer-btn {
      color: #fff;
      width: 100px;
      padding: 5px;
      text-align: center;
    }
  }
}
</style>
