<template>
  <div class="teligen-loading teligen-loading-pacman">
    <div class="pacman" :style="{animationDuration: duration+'s'}">
      <div class="mouth" :style="{background: 'linear-gradient(0deg, '+(mouthColor || color)+' 50%, transparent 50%)'}">
        <div class="eye" :style="{background: eyeColor || color}"></div>
      </div>
      <div class="line">
        <div class="bean" :style="{background: beanColor || color}" v-for="(item, i) in beans" :key="i"></div>
      </div>
    </div>
    <!--<div class="loading-text" v-text="loadingText" :style="{color: color}"></div>-->
  </div>
</template>
<script>
  export default {
    name: 'LoadingPacman',
    data() {
      return {
        loadingText: 'Loading...',
        color: 'bisque',
        mouthColor: 'bisque',
        eyeColor: 'grey',
        beanColor: 'bisque',
        beanCount: 3,
        duration: 1.2
      }
    },
    computed: {
      beans() {
        let arr = [], i = 0, len = this.beanCount || 3
        while (i++ < len) {
          arr.push(i)
        }
        return arr
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

  .teligen-loading-pacman {
    .pacman {
      position: absolute;
      top: 50%;
      left: 50%;
      transform-style: preserve-3d;
    }

    .mouth {
      position: absolute;
      z-index: 1;
      left: -120px;
      border-radius: 1000px;
      background: linear-gradient(0deg, bisque 50%, transparent 50%);
      animation-duration: inherit;

      &:before, &:after {
        content: '';
        position: absolute;
        margin: -80px;
        width: 160px;
        height: 160px;
        border-radius: inherit;
        background: inherit;
        animation-duration: inherit;
        animation-timing-function: ease-out;
        animation-iteration-count: infinite;
      }

      &:before {
        animation-name: upperjaw;
      }

      &:after {
        animation-name: lowerjaw;
      }

      .eye {
        position: absolute;
        z-index: 1;
        top: -47px;
        left: -44px;
        width: 28px;
        height: 28px;
        border-radius: inherit;
        background: darkgray;
      }
    }

    .line {
      position: absolute;
      margin: -20px;
      white-space: nowrap;
      animation: march linear infinite;
      animation-duration: inherit;

      .bean {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 1000px;
        background: bisque;

        + .bean {
          margin-left: 60px;
        }
      }
    }

    @keyframes upperjaw {
      0% {
        transform: rotate(180deg);
      }
      50% {
        transform: rotate(150deg);
      }
      100% {
        transform: rotate(180deg);
      }
    }

    @keyframes lowerjaw {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(30deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }


    @keyframes march {
      100% {
        transform: translateX(-100px);
      }
    }
  }
</style>
