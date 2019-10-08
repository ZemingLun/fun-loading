<template>
  <div class="LoadingDefault">
    <div v-text="loadingText"></div>
  </div>
</template>

<script>
  export default {
    name: 'LoadingDefault',
    data() {
      return {
        loadingText: null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .LoadingDefault {

  }
</style>
