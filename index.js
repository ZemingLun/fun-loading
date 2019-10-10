import directive from './src/directive'
import service from './src/index'

// 第一事业部 丰富多彩的loading
export default {
  install(Vue, Options) {
    Vue.use(directive, Options)
    Vue.prototype.$funLoading = service
  },
  directive,
  service
}
