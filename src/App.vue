<template>
  <div id="app">
    <audio :src="song.url" id="audio" ref="audio" controls></audio>
    <router-view/>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'playPage',
  data () {
    return {
      song: {
        url: 'https://www.zsp.cool/music/dmbj/盗墓笔记1七星鲁王21.周建龙.mp3'
      },
      audio: null
    }
  },
  mounted () {
    setTimeout(() => {
      this.audio = this.$refs.audio
      console.log(this.audio.currentTime)
      console.log(this.audio.duration)
    }, 500)
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
