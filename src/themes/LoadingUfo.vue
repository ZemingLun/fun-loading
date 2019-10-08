<template>
  <div class="teligen-loading teligen-loading-ufo">
    <div class="ufo" :style="{animationDuration: duration+'s'}"></div>
    <div class="loading-text" v-text="loadingText"></div>
  </div>
</template>
<script>
  export default {
    name: 'LoadingUfo',
    data() {
      return {
        loadingText: 'Loading...',
        duration: 2
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

  .teligen-loading-ufo {
    .ufo {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -125px;
      width: 250px;
      height: 100px;
      border-radius: 120px 120px 130px 130px / 70px 70px 35px 35px;
      box-shadow: inset 0 -5px 5px silver;
      background: linear-gradient(90deg, ghostwhite, aliceblue);
      animation: hovering 2s infinite;

      &:before {
        content: '';
        position: absolute;
        bottom: 75px;
        left: 50%;
        margin-left: -80px;
        width: 160px;
        height: 90px;
        border-radius: 200px 200px 200px 200px / 200px 200px 35px 35px;
        box-shadow: inset 10px 0 50px aliceblue;
        background: rgba(0, 0, 0, .5);
      }

      &:after {
        content: '';
        position: absolute;
        z-index: -1;
        top: 30px;
        left: 50%;
        margin-left: -100px;
        width: 200px;
        height: 1000px;
        box-shadow: inset 0 0 200px -10px rgba(248, 248, 255, .5);
        background: rgba(248, 248, 255, .1);
      }
    }

    @keyframes hovering {
      0% {
        margin-top: -35px;
      }
      50% {
        margin-top: -60px;
      }
      100% {
        margin-top: -35px;
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
