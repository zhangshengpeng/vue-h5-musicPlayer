<template>
  <div id="app">
    <transition :name='direction'>
      <router-view class="appview" />
    </transition>
    <player :show="isShow"/>
  </div>
</template>
<script>
import Player from './components/Player/index'
export default {
  components: { Player },
  created () {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) { // 如果存在本地信息，先使用本地信息，后重新获取一次信息
      this.$store.commit('setUser', user)
    }
    this.$store.dispatch('getUser')

    const data = JSON.parse(localStorage.getItem('songInfo'))
    const index = parseInt(localStorage.getItem('index')) | 0
    this.$store.commit('setSongInfo', data)
    this.$store.commit('setIndex', index)
  },
  data () {
    return {
      direction: ''
    }
  },
  computed: {
    isShow () {
      return this.$store.state.showBottom
    }
  },
  watch: {
    $route (to, from) { // 设置路由切换动画
      const flag = to.path !== '/login'
      this.$store.commit('setBottom', flag)
    }
  }
}
</script>
<style lang="less">
html, body {
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.overflow {
  overflow: hidden;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.card {
  background: #fff;
  border-radius: 10px;
  padding: 10px;
}
.page {
  background: #f5f5f5;
  width: 100%;
  min-height: 100%;
  padding-bottom: 80px;
}
.album-img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
}
</style>
