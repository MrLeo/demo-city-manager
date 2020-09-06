<template>
  <div style="display: inline-block">
    <my-font slot="suffix" :type="iconType" :style="iconStyle" />
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue'

const MyFont = Icon.createFromIconfontCN({
  scriptUrl: `//at.alicdn.com/t/font_1911732_6tjp05qj4jc.js`
})
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['iconType', 'iconStyle', 'iconSlot'],
  components: {
    MyFont
  }
}
</script>
