import Vue from 'vue'
import App from './App.vue'
import FunLoading from '../index'

Vue.use(FunLoading)

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
