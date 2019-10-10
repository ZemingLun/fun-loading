import Vue from 'vue'
import FunLoading from './funLoading.vue'
import { addClass, getStyle, removeClass } from './dom'
import './funLoading.scss'

// loading展示内容 (将FunLoading构造成Vue实例)
const Mask = Vue.extend(FunLoading)
// 将theme中的主题全部导入，并构造成Vue实例
let themes = {}
const req = require.context('./themes', false, /\.vue$/)
req.keys().forEach(fileName => {
  const themeName = fileName.split('/')[1].split('.')[0]
  const reqTheme = req(fileName)
  themes[themeName] = Vue.extend(reqTheme.default)
})


const loadingDirective = {}
// 指令插件
loadingDirective.install = (Vue, Options) => {
  if (Vue.prototype.$isServer) {
    return
  }

  // 默认配置
  let DefaultOption = {
    background: null,
    show: false,
    customClass: '',
    theme: 'LoadingDefault',
    themeOption: {}
  }
  // Vue.use option 覆盖 DefaultOption
  Object.assign(DefaultOption, Options)

  // 判断是否有合法的主题参数
  const hasRightThemes = (option) => option.theme && Object.keys(themes).includes(option.theme)

  // 判断loading配置是否相同
  const isOptionSame = (option, oldOption) => {
    return Object.entries(oldOption).every(([key, value]) => option[key] === value)
  }

  // 显示隐藏Loading内容
  const toggleLoading = (el, binding) => {
    console.log('toggleLoading toggleLoading')
    let option = getOption(binding.value)
    el.option = option
    if (option.show) {
      if (!hasRightThemes(option)) {
        option.theme = 'LoadingDefault'
      }
      if (!el.themeName || (el.themeName !== option.theme)) {
        if(el.themeInstance){
          el.mask.getElementsByClassName('fun-loading-content')[0].removeChild(el.theme)
          el.themeInstance.$destroy()
        }
        let themeOption = Object.assign({},  option.themeOption)
        let theme = new themes[option.theme]({
          el: document.createElement('div'),
          data: themeOption
        })
        el.themeInstance = theme
        el.themeName = option.theme
        el.theme = theme.$el
      } else {
        Object.keys(option.themeOption).forEach(key => {
          el.themeInstance[key] = option.themeOption[key]
        })
      }
      Vue.nextTick(() => {
        if (binding.modifiers.fullscreen) {
          el.originalPosition = getStyle(document.body, 'position')
          insertDom(document.body, el, binding)
        } else {
          if (binding.modifiers.body) {
            el.originalPosition = getStyle(document.body, 'position');
            ['top', 'left'].forEach(property => {
              const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft'
              el.maskStyle[property] = el.getBoundingClientRect()[property] +
                document.body[scroll] +
                document.documentElement[scroll] -
                parseInt(getStyle(document.body, `margin-${property}`), 10) +
                'px'
            });
            ['height', 'width'].forEach(property => {
              el.maskStyle[property] = el.getBoundingClientRect()[property] + 'px'
            })
            insertDom(document.body, el, binding)
          } else {
            el.originalPosition = getStyle(el, 'position')
            insertDom(el, el, binding)
          }
        }
      })
    } else {
      const target = binding.modifiers.fullscreen || binding.modifiers.body ? document.body : el
      removeClass(target, 'fun-loading-parent--relative')
      removeClass(target, 'fun-loading-parent--hidden')
      el.instance.show = false
    }
  }

  // 将Loading插入dom结构
  const insertDom = (parent, el, binding) => {
    if (getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
      Object.keys(el.maskStyle).forEach(property => {
        el.mask.style[property] = el.maskStyle[property]
      })
      if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
        addClass(parent, 'fun-loading-parent--relative')
      }
      if (binding.modifiers.fullscreen && binding.modifiers.lock) {
        addClass(parent, 'fun-loading-parent--hidden')
      }
      el.mask.getElementsByClassName('fun-loading-content')[0].appendChild(el.theme)
      parent.appendChild(el.mask)
      el.instance.show = true
      el.domInserted = true//标记是否插入过了dom结构
    }
  }

  // 动态获取Option
  const getOption = (clientOption) => {
    let option = {}
    if (clientOption instanceof Object) {
      Object.assign(option, DefaultOption, clientOption)
    } else {
      if (clientOption) {
        Object.assign(option, DefaultOption, { show: true })
      } else {
        Object.assign(option, DefaultOption, { show: false })
      }
    }
    return option
  }

  // Vue扩展指令
  Vue.directive('fun-loading', {
    // 指令绑定时调用
    bind(el, binding, vnode) {
      console.log('bind bind')
      let option = getOption(binding.value)
      // 初始化FunLoading组件

      const mask = new Mask({
        el: document.createElement('div'),
        data: {
          background: option.background,
          customClass: option.customClass,
          show: option.show,
          fullscreen: !!binding.modifiers.fullscreen
        }
      })
      // 保存option信息,方便更新时比较
      el.option = option
      el.instance = mask
      el.mask = mask.$el
      el.maskStyle = {}
      option.show && toggleLoading(el, binding)
    },
    // 组件更新时调用
    update(el, binding, vnode) {
      console.log('update update')
      let option = getOption(binding.value)
      // 判断参数是否一致, 一致则不操作
      if (isOptionSame(option, el.option)) {
        return
      }
      if (option.show) {
        el.instance.customClass = option.customClass
        el.instance.background = option.background
        el.instance.show = option.show
      }
      toggleLoading(el, binding)
    },
    // 指令解绑时调用
    unbind(el, binding) {
      if (el.domInserted) {
        if(el.mask ){
          el.mask.getElementsByClassName('fun-loading-content')[0].removeChild(el.theme)
          el.mask.parentNode &&
          el.mask.parentNode.removeChild(el.mask)
        }

        toggleLoading(el, {
          value: false,
          modifiers: binding.modifiers
        })
      }
      el.instance && el.instance.$destroy()
      el.themeInstance && el.themeInstance.$destroy()
    }
  })
}

export default loadingDirective
