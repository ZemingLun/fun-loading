<template>
  <div class="fun-loading fun-loading-swing">
    <div class="swing" :style="{background: color}">
      <div class="ring" :class="['ring-'+item]" :style="{boxShadow: '-2px 0 0 2px '+(ropeColor || invertColor)}"
           v-for="(item, i) in ['left', 'right']" :key="i">
        <div class="rope" :style="{background: ropeColor || invertColor, animationDuration: duration+'s'}">
          <div v-if="item === 'left'" class="seat" :style="{background: color}">
            <div class="loading-text" v-text="loadingText" :style="{color: color}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'LoadingSwing',
    data() {
      return {
        loadingText: 'Loading...',
        color: 'rgb(255,228,196)',
        ropeColor: '',
        duration: 2
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

  .fun-loading-swing {
    .swing {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: /*-3px */
        -50px;
      width: 100px;
      height: 6px;

      &:before, &:after {
        content: '';
        position: absolute;
        margin: 0 -3px;
        width: 6px;
        height: 6px;
        border-radius: 100px;
        background: inherit;
      }

      &:before {
        right: 100%;
      }

      &:after {
        left: 100%;
      }

      .ring {
        position: absolute;
        width: 1px;
        height: 6px;
        border-radius: 1px 0 0 1px / 3px 0 0 3px;

        &.ring-left {
          left: 10px;
        }

        &.ring-right {
          right: 10px;
        }

        .rope {
          position: absolute;
          top: 6px;
          right: 0;
          width: 3px;
          height: 100px;
          transform-origin: right top;
          animation: swing 2s infinite alternate ease-in-out;

          .seat {
            position: absolute;
            bottom: 0;
            margin: -3px -5px;
            width: 90px;
            height: 6px;
            transform-origin: 5px 3px;
            animation: inherit;
            animation-direction: alternate-reverse;

            &:after {
              content: '';
              position: absolute;
              right: 0;
              height: 100%;
              width: 10px;
              background: rgba(0, 0, 20, .2);
            }
          }
        }
      }
    }

    @keyframes swing {
      0% {
        transform: rotate(-30deg);
      }
      100% {
        transform: rotate(30deg);
      }
    }

    .loading-text {
      position: absolute;
      bottom: 10px;
      width: 100%;
      text-align: center;
      text-shadow: 0 0 15px black;
    }
  }
</style>
