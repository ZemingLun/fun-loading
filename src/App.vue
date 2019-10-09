<template>
  <div id="app">
    <div class="test-loading"></div>

    <!--指令方式使用-->
    <div class="test-loading2" v-teligen-loading="option"></div>

    <ul>
      <li v-for="(theme, index) in themes" :key="index" @click="changeTheme(theme)"><span> {{ theme }}</span></li>
    </ul>
  </div>
</template>

<script>
const req = require.context('./themes', false, /\.vue$/)
export default {
  name: 'app',
  components: {},
  mounted() {
    // 服务方式使用
    let loading = this.$teligenLoading({
      theme: 'LoadingFootprints',
      target: '.test-loading',
      themeOption: {
        duration: 3
      }
    })

    setTimeout(() => {
      loading.close();
    }, 5000);
  },
  data() {
    return {
      themes: req.keys(),
      option: {
        show: true,
        theme: 'LoadingFootprints',
        themeOption: {
          // duration: 3
        }
      }
    }
  },
  methods: {
    changeTheme(theme) {
      let themeName = theme.split('/')[1].split('.')[0]
      this.option.theme = themeName
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  .test-loading, .test-loading2 {
    width: 500px;
    height: 500px;
    background: rgba(255, 255, 0, .5);
  }

  ul {
    list-style: none;

    li {
      display: inline-block;

      span {
        display: inline-block;
        padding: 10px;
        cursor: pointer;
        color: aqua;

        &:hover {
          color: cornflowerblue;
        }
      }
    }
  }
}
</style>
