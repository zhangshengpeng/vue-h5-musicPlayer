<template>
  <div>
    <audio :src="song.url" id="audio" controls></audio>
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
      }
    }
  }
}
</script>
