<template>
  <div class="teligen-loading teligen-loading-spiral" :style="reverseX ? {transform: 'scaleX(-1)'} : {}">
    <div class="spiral" :style="{perspective: perspective+'px'}">
      <div class="stairs"
           :style="{animationDuration: duration+'s', animationDirection: reverseY ? 'reverse' : 'normal'}">
        <div class="step"
             :style="{background: color, transform: 'translateZ('+(5000-i*10)+'px) rotateZ('+(i*20)+'deg)'}"
             v-for="(item, i) in arr" :key="i">
          <div class="bottom" :style="{background: bottomColor || invertColor}"></div>
        </div>
      </div>
    </div>
    <!--<div class="loading-text" v-text="loadingText" :style="{color: color}"></div>-->
  </div>
</template>
<script>
  export default {
    name: 'LoadingSpiral',
    data() {
      return {
        loadingText: 'Loading...',
        perspective: 240,
        color: '#f7f',
        bottomColor: '#101',
        duration: 10,
        reverseX: true,
        reverseY: true
      }
    },
    computed: {
      arr() {
        let arr = [], i = 0, len = 1000
        while (i++ < len) {
          arr.push(i)
        }
        return arr
      },
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
  .teligen-loading {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .teligen-loading-spiral {
    .spiral {
      position: absolute;
      top: 50%;
      left: 50%;
      perspective: 1000px;
      /*transform: scaleX(-1);*/

      .stairs {
        position: absolute;
        transform-style: preserve-3d;
        /*transform: rotateX(90deg);*/
        animation: spiral 10s linear infinite;
        /*animation-direction: reverse;*/
      }

      .step {
        position: absolute;
        margin: -5px 30px;
        width: 60px;
        height: 10px;
        transform-origin: -30px 5px;
        transform-style: preserve-3d;
        background: bisque;

        &:before, &:after, .bottom {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
        }

        &:before, &:after {
          background: inherit;
          transform: translateZ(-1px);
        }

        &:after, .bottom {
          transform: translateZ(-2px);
        }
      }

      @keyframes spiral {
        0% {
          transform: rotateX(90deg) translateZ(0px) rotate(0deg);
        }
        100% {
          transform: rotateX(90deg) translateZ(-180px) rotate(360deg);
        }
      }
    }
  }
</style>
