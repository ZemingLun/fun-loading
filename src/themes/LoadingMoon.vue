<template>
  <div class="teligen-loading teligen-loading-moon">
    <div class="moon"></div>
  </div>
</template>
<script>
  export default {
    name: 'LoadingMoon'
  }
</script>
<style scoped lang="scss">
  .teligen-loading {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .teligen-loading-moon {
    .moon {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -120px;
      width: 240px;
      height: 240px;
      border-radius: 1000px;
      overflow: hidden;
      box-shadow: inset 0 0 50px bisque;

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        /*box-shadow: 0 0 0 1200px bisque;*/
        /*transform: translateX(-12000px) scale(100.00499987500625);*/
        /*scale = sqrt(pow(translateX, 2) + pow(radius, 2)) / radius /*双曲线焦点在y轴*/
        /*
        s = sqrt(t*t + r*r) / r
        t = sqrt(s*s - 1)) * r

        x = t + r - s * r

        s = ((x-r)*(x-r) + r*r) / (r-x) / r / 2
        t = (x*x - 2*r*x) / (x-r) / 2
        */
      }

      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        /*background: bisque;*/
        /*transform: translateX(12000px) scale(100.00499987500625);*/
      }
    }
  }
</style>
