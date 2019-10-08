import Vue from 'vue'
import App from './App.vue'
import TeligenLoading from '../index'

Vue.use(TeligenLoading)

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
