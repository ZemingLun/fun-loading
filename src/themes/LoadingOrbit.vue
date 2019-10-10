<template>
  <div class="fun-loading fun-loading-orbit">
    <div class="star">
      <div class="planet" :style="{animationDuration: duration+'s'}">
        <div class="satellite" :style="{animationDuration: (duration2 || duration)+'s'}"></div>
      </div>
    </div>
    <div class="loading-text" v-text="loadingText"></div>
  </div>
</template>
<script>
  export default {
    name: 'LoadingOrbit',
    data() {
      return {
        loadingText: 'Loading...',
        duration: 10,
        duration2: 1
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

  .fun-loading-orbit {
    .star {
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 1000px;

      &:before, &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: inherit;
      }

      &:after {
        margin: -15px;
        width: 30px;
        height: 30px;
        background: #fff;
        box-shadow: 0 0 15px 5px #fff, 0 0 50px rgba(0, 0, 0, .1);
      }

      &:before {
        margin: -99px;
        width: 198px;
        height: 198px;
        box-shadow: inset 0 0 1px #fff, 0 0 1px #fff, inset 0 0 15px rgba(0, 0, 0, .1), 0 0 15px rgba(0, 0, 0, .1);
      }

      .planet {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 70px;
        height: 70px;
        transform-origin: right bottom;
        border-radius: inherit;
        animation: rotate 10s linear infinite;

        &:before, &:after {
          content: '';
          position: absolute;
          border-radius: inherit;
        }

        &:after {
          margin: -5px;
          width: 10px;
          height: 10px;
          background: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, .1);
        }

        &:before {
          margin: -14px;
          width: 28px;
          height: 28px;
          box-shadow: inset 0 0 1px #fff, 0 0 1px #fff, inset 0 0 15px rgba(0, 0, 0, .1), 0 0 15px rgba(0, 0, 0, .1);
        }

        .satellite {
          position: absolute;
          bottom: 100%;
          right: 100%;
          width: 10px;
          height: 10px;
          transform-origin: right bottom;
          border-radius: inherit;
          animation: rotate 1s linear infinite;

          &:after {
            content: '';
            position: absolute;
            border-radius: inherit;
            margin: -2px;
            width: 4px;
            height: 4px;
            background: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, .1);
          }
        }
      }
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .loading-text {
      position: absolute;
      top: 50%;
      margin-top: 115px;
      width: 100%;
      text-align: center;
      color: #fff;
      text-shadow: 0 0 15px black;
    }
  }
</style>
