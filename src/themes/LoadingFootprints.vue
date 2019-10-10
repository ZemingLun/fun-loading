<template>
  <div class="fun-loading fun-loading-footprints">
    <div class="footprints" :class="[type]" :style="{lineHeight: lineHeight, transform: 'rotate('+rotate+'deg)'}">
      <div class="foot" :class="['foot-'+foot]" v-for="(foot) in ['left', 'right']"
           :style="{animationDuration: duration+'s', animationDelay: foot==='left' ? -(duration/2)+'s' : '0s'}"
           :key="'foot-'+foot">
        <div class="print" :style="{background: color, color: color}" v-for="(print) in prints">
          <div class="model"></div>
        </div>
      </div>
    </div>
    <!--<div class="loading-text" v-text="loadingText" :style="{color: color}"></div>-->
  </div>
</template>
<script>
  export default {
    name: 'LoadingFootprints',
    data() {
      return {
        loadingText: 'Loading...',
        color: 'rgb(255,228,196)',
        type: 'goose',
        printCount: 10,
        lineHeight: 1,
        rotate: -35,
        duration: 1.5
      }
    },
    computed: {
      prints() {
        let arr = [], i = 0, len = this.printCount || 3
        while (i++ < len) {
          arr.push(i)
        }
        return arr
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

  .fun-loading-footprints {
    .footprints {
      position: absolute;
      top: 50%;
      left: 50%;
      transform-style: preserve-3d;

      .foot {
        position: absolute;
        right: 50%;
        transform-origin: right top;
        transform-style: preserve-3d;
        white-space: nowrap;
        animation: walk 1.3s linear infinite;

        &.foot-left {
          transform: scaleY(-1);
          animation-delay: -.65s;
        }
      }

      .print {
        position: relative;
        display: inline-block;
        margin-right: 150px;
        border-radius: 1000px;

        .model {
          position: absolute;
          background: inherit;

          &:before, &:after {
            content: '';
            position: absolute;
            background: inherit;
          }
        }
      }

      &.bird {
        .model {
          width: 36px;
          height: 4px;
          border-radius: 50%;
          transform: rotate(10deg);

          &:before, &:after {
            left: 6px;
            width: 20px;
            height: 4px;
            transform-origin: 2px 2px;
            border-radius: inherit;
          }

          &:before {
            transform: rotate(30deg);
          }

          &:after {
            transform: rotate(-30deg);
          }
        }
      }

      &.cat {
        .model {
          width: 16px;
          height: 20px;
          border-radius: 6px 10px 10px 6px;

          &:before, &:after {
            transform-origin: 0 10px;
            width: 10px;
            height: 8px;
            border-radius: 50%;
            box-shadow: 18px 7px, 12px 16px;
            transform: rotate(10deg);
          }
          &:after {
            transform: rotate(-10deg) scaleY(-1);
          }
        }
      }

      &.human {
        .model {
          width: 16px;
          height: 22px;
          border-radius: 8px 8px 10px 6px / 8px 8px 14px 8px;
          transform: rotate(10deg);

          &:before {
            top: 5px;
            right: 28px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
          }

          &:after {
            top: -10px;
            left: 16px;
            width: 11px;
            height: 11px;
            border-radius: 50%;
            box-shadow: 3px 10px 0 -2px, 2px 19px 0 -2px, -2px 27px 0 -3px, -7px 31px 0 -3px;
          }
        }
      }

      &.pig {
        .model {
          width: 18px;
          height: 10px;
          border-radius: 50%;
          background: transparent;
          box-shadow: -10px 0 0 5px;
        }
      }

      &.goose {
        .model {
          width: 50px;
          height: 30px;
          border-radius: 100% 0 0 100% / 50% 0 0 50%;
          background: transparent;
          transform: rotate(5deg);

          &:before, &:after {
            left: 100%;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            transform-origin: -27px center;
            box-shadow: -35px 0 0 -5px;
          }

          &:before {
            transform: rotate(15deg);
          }

          &:after {
            transform: rotate(-15deg);
          }
        }
      }

    }

    @keyframes walk {
      0% {
        margin-right: -150px;
      }
      100% {
        margin-right: 0px;
      }
    }
  }
</style>
