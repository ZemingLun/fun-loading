<template>
  <transition name="loading-fade">
    <div
      v-show="show"
      class="teligen-loading-mask"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="teligen-loading-content"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'teligenLoading',
    data() {
      return {
        show: false,
        fullscreen: true,
        background: null,
        customClass: ''
      }
    },
    computed: {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .loading-fade-enter-active, .loading-fade-leave-active {
    transition: opacity .3s;
  }

  .loading-fade-enter, .loading-fade-leave-to {
    opacity: 0;
  }

  .teligen-loading-mask {
    z-index: 9999;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 20, .8);
    &.is-fullscreen{
      position: fixed;
    }
  }
  .teligen-loading-content{
    color: #fff;
    width: 100%;
    height: 100%;
    overflow: hidden;
    /*pointer-events: none;*/ /*开发环境下停用*/
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 1.5em;
  }
</style>
