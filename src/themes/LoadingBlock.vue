<template>
  <div class="teligen-loading teligen-loading-block">
    <div class="block-combination" :style="{animationDuration: duration+'s'}">
      <div class="block block-0" :style="{background: color}"></div>
      <div class="arm" :class="['arm-'+arm]" v-for="(arm) in ['left', 'right']" :key="'arm-'+arm">
        <div class="block" :class="['block-'+block]" :style="{background: color}" v-for="(block) in [1,2,3,4]"
             :key="'block-'+block"></div>
      </div>
    </div>
    <div class="loading-text" v-text="loadingText" :style="{color: color}"></div>
  </div>
</template>
<script>
  export default {
    name: 'LoadingBlock',
    data() {
      return {
        loadingText: 'Loading...',
        color: 'seashell',
        duration: 2.5
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

  .teligen-loading-block {
    .block-combination {
      position: absolute;
      top: 50%;
      left: 50%;
      transform-style: preserve-3d;
      transform: rotateX(45deg) rotate(45deg);

      .block {
        position: absolute;
        margin: -15px;
        width: 30px;
        height: 30px;
        background: bisque;
        animation: ease-out infinite;
        animation-duration: inherit;
        transform-style: preserve-3d;

        &:before, &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: inherit;
        }

        &:before {
          filter: brightness(.8);
          transform: rotateX(-90deg) translateZ(15px) translateY(15px);
        }

        &:after {
          filter: brightness(.7);
          transform: rotateX(-90deg) rotateY(90deg) translateZ(15px) translateY(15px);
        }
      }

      .arm {
        position: absolute;
        transform-style: preserve-3d;
        animation-duration: inherit;

        &.arm-right {
          transform: rotate(180deg);

          .block {
            &:before {
              transform: rotateX(-90deg) rotateY(180deg) translateZ(15px) translateY(15px);
            }

            &:after {
              transform: rotateX(-90deg) rotateY(270deg) translateZ(15px) translateY(15px);
            }
          }
        }

        .block-1 {
          transform: translate(0px, -30px);
          animation-name: block-1;
        }

        .block-2 {
          transform: translate(30px, -30px);
          animation-name: block-2;
        }

        .block-3 {
          transform: translate(30px, 0px);
          animation-name: block-3;
        }

        .block-4 {
          transform: translate(30px, 30px);
          animation-name: block-4;
        }
      }
    }

    @keyframes block-1 {
      0% {
        transform: translate(0px, -30px);
      }
      25% {
        transform: translate(0px, -30px);
      }
      60% {
        transform: translate(0px, -30px);
      }
      75% {
        transform: translate(-38px, -30px);
      }
      80% {
        transform: translate(-30px, -30px);
      }
      100% {
        transform: translate(-30px, -30px);
      }
    }

    @keyframes block-2 {
      0% {
        transform: translate(30px, -30px);
      }
      10% {
        transform: translate(30px, -30px);
      }
      25% {
        transform: translate(30px, -68px);
      }
      30% {
        transform: translate(30px, -60px);
      }
      60% {
        transform: translate(30px, -60px);
      }
      75% {
        transform: translate(30px, -60px);
      }
      80% {
        transform: translate(30px, -30px);
      }
      100% {
        transform: translate(30px, -30px);
      }
    }

    @keyframes block-3 {
      0% {
        transform: translate(30px, 0px);
      }
      10% {
        transform: translate(30px, 0px);
      }
      25% {
        transform: translate(30px, -38px);
      }
      30% {
        transform: translate(30px, -30px);
      }
      60% {
        transform: translate(30px, -30px);
      }
      75% {
        transform: translate(-8px, -30px);
      }
      80% {
        transform: translate(0px, -30px);
      }
      100% {
        transform: translate(0px, -30px);
      }
    }

    @keyframes block-4 {
      0% {
        transform: translate(30px, 30px);
      }
      10% {
        transform: translate(30px, 30px);
      }
      25% {
        transform: translate(30px, -8px);
      }
      30% {
        transform: translate(30px, 0px);
      }
      60% {
        transform: translate(30px, 0px);
      }
      75% {
        transform: translate(30px, 0px);
      }
      100% {
        transform: translate(30px, 0px);
      }
    }

    .loading-text {
      position: absolute;
      top: 50%;
      margin-top: 90px;
      width: 100%;
      text-align: center;
      text-shadow: 0 0 15px black;
    }
  }
</style>
