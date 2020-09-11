<template>
  <div class="player">
    <audio ref="audio" :src="url" id="audio" controls></audio>
    <div class="context">
      <div class="progress">
        <div class="progress-all"></div>
        <div class="progress-point"></div>
        <div class="progress-done"></div>
      </div>
      <div>时间</div>
      <div>按钮</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Player',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    console.log(this.$refs.audio)
  },
  methods: {

  }
}
</script>
<style scoped lang="less">
.context {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.progress {
  position: relative;
  padding: 20px;
  &-all {
    width: 100%;
    height: 2px;
    border-radius: 1px;
    background: #999999;
  }
  &-point {
    width: 6px;
    height: 6px;
    background: #ffffff;
    border-radius: 50%;
  }
}
#audio {
  display: none;
}
.player {
  position: relative;
  height: 100vh;
  background: #666666;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
