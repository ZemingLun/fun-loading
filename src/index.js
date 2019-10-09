import Vue from 'vue'
import TeligenLoading from './teligenLoading.vue'
import { addClass, getStyle, removeClass } from './dom'
import './teligenLoading.scss'

const LoadingConstructor = Vue.extend(TeligenLoading)
// 将theme中的主题全部导入，并构造成Vue实例
let themes = {}
const req = require.context('./themes', false, /\.vue$/)
req.keys().forEach(fileName => {
  const themeName = fileName.split('/')[1].split('.')[0]
  const reqTheme = req(fileName)
  themes[themeName] = Vue.extend(reqTheme.default)
})

const defaults = {
  fullscreen: true,
  background: null,
  body: false,
  lock: false,
  customClass: '',
  theme: 'LoadingDefault',
  themeOption: {}
}

let fullscreenLoading
LoadingConstructor.prototype.originalPosition = ''
LoadingConstructor.prototype.close = function () {
  if (this.fullscreen) {
    fullscreenLoading = undefined
  }
  const target = this.fullscreen || this.body ?
    document.body : this.target
  removeClass(target, 'teligen-loading-parent--relative')
  removeClass(target, 'teligen-loading-parent--hidden')
  if (this.$el) {
    this.$el.getElementsByClassName('teligen-loading-content')[0].removeChild(this.theme)
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  }
  this.show = false
  this.themeInstance.$destroy()
  this.$destroy()
}
const addStyle = (options, parent, instance) => {
  let maskStyle = {}
  if (options.fullscreen) {
    instance.originalPosition = getStyle(document.body, 'position')
    instance.originalOverflow = getStyle(document.body, 'overflow')
  } else if (options.body) {
    instance.originalPosition = getStyle(document.body, 'position');
    ['top', 'left'].forEach(property => {
      let scroll = property === 'top' ? 'scrollTop' : 'scrollLeft'
      maskStyle[property] = options.target.getBoundingClientRect()[property] +
        document.body[scroll] +
        document.documentElement[scroll] +
        'px'
    });
    ['height', 'width'].forEach(property => {
      maskStyle[property] = options.target.getBoundingClientRect()[property] + 'px'
    })
  } else {
    instance.originalPosition = getStyle(parent, 'position')
  }
  Object.keys(maskStyle).forEach(property => {
    instance.$el.style[property] = maskStyle[property]
  })
}
// 判断是否有合法的主题参数
const hasRightThemes = (option) => option.theme && Object.keys(themes).includes(option.theme)

const Loading = (options = {}) => {
  if (Vue.prototype.$isServer) {
    return
  }
  options = Object.assign({}, defaults, options)
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target)
  }
  options.target = options.target || document.body
  if (options.target !== document.body) {
    options.fullscreen = false
  } else {
    options.body = true
  }

  if (!hasRightThemes(options)) {
    options.theme = 'LoadingDefault'
  }
  if (options.fullscreen && fullscreenLoading) {
    if(options.theme !== fullscreenLoading.themeName) {
      let themeOption = Object.assign({}, options.themeOption)
      let theme = new themes[options.theme]({
        el: document.createElement('div'),
        data: themeOption
      })
      fullscreenLoading.$el.getElementsByClassName('teligen-loading-content')[0].removeChild(fullscreenLoading.theme)
      fullscreenLoading.themeInstance.$destroy()
      fullscreenLoading.theme = theme.$el
      fullscreenLoading.themeInstance = theme
      fullscreenLoading.themeName = options.theme
      fullscreenLoading.$el.getElementsByClassName('teligen-loading-content')[0].appendChild(fullscreenLoading.theme)
    } else {
      Object.keys(options.themeOption).forEach(key => {
        fullscreenLoading.themeInstance[key] = options.themeOption[key]
      })
    }
    fullscreenLoading.background = options.background
    fullscreenLoading.customClass = options.customClass

    return fullscreenLoading
  }
  let parent = options.body ? document.body : options.target
  let instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options
  })
  addStyle(options, parent, instance)
  if (instance.originalPosition !== 'absolute' && instance.originalPosition !== 'fixed') {
    addClass(parent, 'teligen-loading-parent--relative')
  }
  if (options.fullscreen && options.lock) {
    addClass(parent, 'teligen-loading-parent--hidden')
  }
  let themeOption = Object.assign({}, options.themeOption)
  let theme = new themes[options.theme]({
    el: document.createElement('div'),
    data: themeOption
  })
  instance.themeInstance = theme
  instance.themeName = options.theme
  instance.theme = theme.$el
  instance.$el.getElementsByClassName('teligen-loading-content')[0].appendChild(theme.$el)

  parent.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.show = true
  })
  if (options.fullscreen) {
    fullscreenLoading = instance
  }
  return instance
}

export default Loading
