<template>
  <div class="fun-loading fun-loading-hourglass">
    <div class="hourglass" :style="{animationDuration: duration+'s'}">
      <div class="half" :class="[half+'-half']" :style="{boxShadow: '0 -10px 0 9px '+glassColor}" v-for="(half, i) in ['upper', 'lower']" :key="i">
        <div class="sand" :style="{animationDelay: -(duration/2)+'s'}">
          <div class="flow-out" :style="{background: sandColor}"></div>
          <div class="flow-in" :style="{borderTopColor: sandColor}"></div>
        </div>
      </div>
    </div>
    <div class="loading-text" v-text="loadingText" :style="{color: glassColor}"></div>
  </div>
</template>
<script>
  export default {
    name: 'LoadingHourglass',
    data() {
      return {
        loadingText: 'Loading...',
        sandColor: 'sandybrown',
        glassColor: 'aliceblue',
        duration: 3
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

  .fun-loading-hourglass {
    .hourglass, .sand .flow-out, .sand .flow-in {
      /*animation-duration: 3s;*/
      animation-iteration-count: infinite;
    }

    .upper-half .sand .flow-in, .lower-half .sand .flow-out {
      animation-delay: inherit;
    }

    .hourglass {
      position: absolute;
      top: 50%;
      left: 50%;
      animation-name: rotate;

      .half {
        position: absolute;
        bottom: -2px;
        margin-left: -50px;
        width: 100px;
        height: 100px;
        border-radius: 0 0 50px 50px;
        transform-origin: 50px 98px;
        box-shadow: 0 -10px 0 9px aliceblue;
        animation-duration: inherit;

        &.lower-half {
          transform: rotate(180deg);
        }

        .sand {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: inherit;
          transform: scale(.8);
          animation-duration: inherit;

          .flow-out {
            /*content: '';*/
            position: absolute;
            width: 100%;
            height: 100%;
            background: sandybrown;
            animation-name: flow-out;
            animation-duration: inherit;
            animation-timing-function: ease-in;
          }

          .flow-in {
            /*content: '';*/
            position: absolute;
            border: 50px solid transparent;
            border-top-color: sandybrown;
            animation-name: flow-in;
            animation-duration: inherit;
            animation-timing-function: linear;
          }
        }
      }
    }

    @keyframes flow-out {
      0% {
        top: 40%;
      }
      40% {
        top: 100%;
      }
      100% {
        top: 100%;
      }
    }

    @keyframes flow-in {
      0% {
        top: 0;
        border-top-width: 0;
      }
      40% {
        top: 0;
        border-top-width: 80px;
      }
      45% {
        top: 0;
        border-top-width: 80px;
      }
      50% {
        top: 40%;
        border-top-width: 800px;
      }
      50.1% {
        top: 100%;
        border-top-width: 0;
      }
      100% {
        top: 0;
        border-top-width: 0;
      }
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      40% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      90% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .loading-text {
      position: absolute;
      top: 50%;
      margin-top: 150px;
      width: 100%;
      text-align: center;
      text-shadow: 0 0 15px black;
    }
  }
</style>
