<template>
  <div id="app">
    <div class="test-loading" v-teligen-loading="option"></div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {},
    data() {
      return {
        option: {
          show: true,
          theme: 'LoadingFootprints',
          themeOption: {
            // duration: 3
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  #app {
    .test-loading {
      width: 500px;
      height: 500px;
      background: rgba(255, 255, 0, .5);
    }
  }
</style>
