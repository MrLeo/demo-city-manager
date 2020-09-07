import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import IconFont from '@/components/IconFont/IconFont'

// import 'lib-flexible'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(IconFont)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
