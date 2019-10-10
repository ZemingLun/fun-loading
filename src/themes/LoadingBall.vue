<template>
  <div class="fun-loading fun-loading-ball">
    <div class="ball" :style="{background: color, color: invertColor, animationDuration: duration+'s'}"
         :data-text="loadingText"></div>
    <!--<div class="loading-text" v-text="loadingText" :style="{color: color}"></div>-->
  </div>
</template>
<script>
  export default {
    name: 'LoadingBall',
    data() {
      return {
        loadingText: 'Loading...',
        color: 'rgb(255,228,196)',
        duration: .9
      }
    },
    computed: {
      invertColor() {
        let color = this.color || ''
        if (/rgb/.test(color)) {
          let arr = color.split(/\(|,|\)/).filter(Boolean).map((v, i) => {
            if (i > 0 && i < 4) {
              return (255 - v)
            }
            return v
          })
          return arr[0] + '(' + arr.slice(1).join(',') + ')'
        } else if (/#/.test(color)) {
          let str = color.replace(/#/g, '').trim(), rgb
          if (str.length === 3) {
            rgb = str.split('').map((v) => {
              return v + v
            })
          } else if (str.length === 6) {
            rgb = [str.slice(0, 2), str.slice(2, 4), str.slice(4, 6)]
          }
          if (!rgb) return color
          rgb.forEach((v, i) => {
            rgb[i] = (255 - parseInt(v, 16)).toString(16)
            while (rgb[i].length < 2) {
              rgb[i] = '0' + rgb[i]
            }
          })
          return '#' + rgb.join('')
        } else {
          return color
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .fun-loading {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .fun-loading-ball {
    .ball {
      position: absolute;
      top: 50%;
      left: 50%;
      animation: ease-out infinite alternate;

      &:before {
        content: '';
        position: absolute;
        top: 100px;
        margin: -2px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(0, 0, 20, .4);
        box-shadow: 0 0 5px 5px rgba(0, 0, 20, .4);
        animation: inherit;
        animation-name: shadow;
      }

      &:after {
        /*content: '';*/
        position: absolute;
        margin: -60px;
        width: 120px;
        height: 120px;
        transform-origin: center bottom;
        border-radius: 1000px;
        overflow: hidden;
        box-shadow: inset -10px -10px 50px rgba(0, 0, 20, .4);
        background: inherit;
        animation: inherit;
        animation-name: bounce;

        content: attr(data-text);
        line-height: 120px;
        text-align: center;
        color: inherit;
      }
    }

    @keyframes bounce {
      0% {
        margin-top: -20px;
        transform: scale(1.05, .8);
      }
      15% {
        margin-top: -20px;
        transform: scale(1);
      }
      100% {
        margin-top: -120px;
        transform: scale(1);
      }
    }

    @keyframes shadow {
      0% {
        transform: scaleX(5);
        opacity: 1;
      }
      15% {
        transform: scaleX(5);
        opacity: 1;
      }
      100% {
        transform: scaleX(1.5);
        opacity: .5;
      }
    }
  }
</style>
