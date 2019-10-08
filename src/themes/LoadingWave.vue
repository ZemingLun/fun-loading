<template>
  <div class="teligen-loading teligen-loading-wave">
    <div class="water-ball"
         :style="{background: background, boxShadow: 'inset 0 0 0 3px '+waves[0].color+',inset 0 0 50px 5px '+waves[0].color}">
      <div class="wave-card"
           :style="{animationDuration: wave.duration+'s', animationDelay: wave.delay+'s', animationDirection: wave.reverse ? 'reverse' : 'normal'}"
           v-for="(wave, i) in waves" :key="i">
        <div class="wave convex" :style="{background: wave.color, boxShadow: '81px 81px 0 80px '+wave.color}"
             v-for="(convex, i) in [1,2,3]"></div>
        <div class="wave concave" :style="{boxShadow: '81px 81px 0 80px '+wave.color}"
             v-for="(convex, i) in [1,2,3]"></div>
      </div>
    </div>
    <div class="loading-text" v-text="loadingText" :style="{color: waves[0].color}"></div>
  </div>
</template>
<script>
  export default {
    name: 'LoadingWave',
    data() {
      return {
        loadingText: 'Loading...',
        background: 'aliceblue',
        waves: [
          {color: 'midnightblue', duration: 6, delay: -2, reverse: false},
          {color: 'mediumblue', duration: 5, delay: -2, reverse: true},
          {color: 'dodgerblue', duration: 4, delay: -3, reverse: false},
          {color: 'deepskyblue', duration: 3, delay: -2.5, reverse: false},
          {color: 'darkblue', duration: 2, delay: -2, reverse: false},
        ]
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

  .teligen-loading-wave {
    .water-ball {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -125px;
      width: 250px;
      height: 250px;
      border-radius: 1000px;
      overflow: hidden;
      box-shadow: inset 0 0 50px skyblue;
      background: aliceblue;
    }

    .wave-card {
      position: absolute;
      width: 500px;
      height: 250px;
      animation: wave linear infinite;
      /*box-shadow: inset 0 0 5px skyblue;*/

      .wave {
        position: absolute;
        top: 50%;
        margin: -40px;
        width: 80px;
        height: 80px;
        transform: rotate(45deg);
        box-shadow: 81px 81px 0 80px skyblue;
        /*box-shadow: inset 0 0 5px skyblue;*/

        &:nth-child(1) {
          left: 50px;
        }

        &:nth-child(4) {
          left: 163px;
        }

        &:nth-child(2) {
          left: 276px;
        }

        &:nth-child(5) {
          left: 389px;
        }

        &:nth-child(3) {
          left: 502px;
        }

        &:nth-child(6) {
          left: 615px;
        }

        &.convex {
          border-radius: 80px 0 0 0;
          background: skyblue;

          &:before, &:after {
            content: '';
            position: absolute;
            width: 80px;
            height: 80px;
            /*background: skyblue;*/
            background: inherit;
          }

          &:before {
            top: 79px;
            left: 0;
          }

          &:after {
            left: 79px;
            top: 1px;
          }
        }

        &.concave {
          border-radius: 0 0 80px 0;

          &:before {
            top: 80px;
            left: -1px;
          }
        }
      }
    }

    @keyframes wave {
      0% {
        right: 0;
      }
      100% {
        right: -224px;
      }
    }

    .loading-text {
      position: absolute;
      top: 50%;
      margin-top: -80px;
      width: 100%;
      text-align: center;
    }
  }
</style>
