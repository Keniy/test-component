
import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import TestComponent from '../packages/index'
import ElementUI from 'element-ui'
import './style/theme/element/theme/index.css'
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(TestComponent)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
