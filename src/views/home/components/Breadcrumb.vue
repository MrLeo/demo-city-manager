<template>
  <a-breadcrumb>
    <span slot="separator" class="breadcrumb__split">|</span>
    <a-breadcrumb-item><a-icon type="environment" style="color: #14a3ff;"/></a-breadcrumb-item>
    <a-breadcrumb-item>{{ location }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    location: {
      type: String,
      default: '信阳市'
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb__split {
  color: #14a3ff;
}
</style>
