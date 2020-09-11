<template>
  <div class="home">
    <player :url="song.url"/>
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
        url: 'https://www.zsp.cool/music/dmbj/盗墓笔记1七星鲁王21.周建龙.mp3'
      }
    }
  }
}
</script>
