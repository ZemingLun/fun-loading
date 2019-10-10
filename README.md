# fun-loading

> 这是一个使用简单，样式多样的loading组件。它能是你系统的loading更有趣。

## Demo

[例子](https://zeminglun.github.io/fun-loading/index.html)

## 使用

```bash
// 引入
import FunLoading from '@/fun-loading'

// 使用Vue.use加载组件
Vue.use(FunLoading, {themeOption: {loadingText: '加载中...'}})

 <!-- 通过指令方式使用 -->
 <template>
   <!-- 通过对象使用 -->
   <div id="app" v-fun-loading.fullscreen="option">
   
   <!-- 通过boolean使用 -->
   <div v-if="show" v-fun-loading="loading" 
     style="width: 200px;height: 200px;"></div>
     <router-view/>
   </div>
 </template>
 
 <script>
   export default {
     name: 'App',
     data() {
       return {
         loading: true,
         option: {show: true, themeOption: {loadingText: '加载中...'}, 
         background: 'rgba(255, 0, 0, .2)'}
       }
     },
   }
 </script>
```

## 提供多种主题

## 参数列表

参数能够在多个地方设置，不提供参数会使用默认的参数，参数配置优先级：默认配置 < Vue.use(FunLoading, options)中的配置 < v-fun-loading="options"的配置

| 属性名 | 解释 | 类型 | 默认值 | 是否必传 | 例子 |
| --------- | --------- | --------- | --------- | --------- | --------- |
| show | 显示loading | Boolean | false | 否 | false|
| background | mask背景颜色 | 颜色字符串 | 'rgba(0, 0, 0, .5)' | 否 | '#f00' |
| themeOption | 主体的参数 | object | null | 否 | {loadingText: '加载中...'} |
| customClass | 自定义class | String | '' | 否 | 'customClass' |
| theme | 主题（./themes下的文件名） | String | 'LoadingDefault' | 否 | 'LoadingBall' |

## 指令修饰符

| 修饰名 | 解释 | 
| --------- | --------- | 
| fullscreen | 是否全屏loading |
| lock | 仅在fullscreen修饰符下有用,将body的overflow设为hidden |
| body | loading生成位置在body元素上 |

## 自定义主题

自行增加主体,放置在themes文件夹中,会自动加载

