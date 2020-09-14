<template>
  <div class="home">
    <player />
  </div>
</template>

<script>
// @ is an alias to /src
import Player from '@/components/Player.vue'

export default {
  name: 'Home',
  components: {
    Player
  },
  data () {
    return {
      song: {
        url: 'https://www.zsp.cool/music/dmbj/盗墓笔记1七星鲁王24.周建龙.mp3'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .home {
    height: 100vh;
    background-image: url('../assets/img/dmbj.jpg');
    background-size: cover;
  }
</style>
