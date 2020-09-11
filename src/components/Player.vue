<template>
  <div class="player">
    <audio ref="audio" :src="url" id="audio" controls></audio>
    <div class="context">
      <div class="progress">
        <div class="progress-all"></div>
        <div class="progress-point" ref="point" :style="{ left: `${pointPosition}px` }"></div>
        <div class="progress-done"></div>
      </div>
      <div class="time">
        <span>{{ pointTime | formatSeconds}}</span>
        <span>{{ length | formatSeconds}}</span>
      </div>
      <div class="p">
        <div>
          <img class="p-icon" @click="handlePrev" src="@/assets/img/prev.png">
          <img @click="handleStart()" class="p-icon" style="border: solid 2px #ffffff; border-radius: 50%" :src="img">
          <img @click="handleNext" class="p-icon" src="@/assets/img/next.png">
        </div>
        <img @click="handleList" class="p-icon list" style="padding: 10px 6px" src="@/assets/img/list.png">
      </div>
    </div>
    <v-popup v-model="showList" position="right" round :style="{ width: '70%', height: '100%'}">
      <div style="height: 100vh;padding: 0 4px; overflow: auto">
        <div @click="changePlay(item, index)" v-for="(item, index) in resourcesList" :key="index">
          <v-divider />
          <div>{{ item.name }}</div>
        </div>
        <div class="list-close">
          <div @click="() => { this.showList = false }">关闭</div>
        </div>
      </div>
    </v-popup>
  </div>
</template>

<script>
import { Popup, Divider } from 'vant'
import 'vant/lib/button/style'

export default {
  name: 'Player',
  components: {
    VPopup: Popup,
    VDivider: Divider
  },
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      img: require('@/assets/img/begin.png'),
      length: 0,
      isStart: true,
      audio: null,
      pointTime: 0,
      timer: null,
      point: null,
      showList: false,
      resourcesList: [],
      index: 0,
      x: 0,
      l: 0,
      isDown: false
    }
  },
  computed: {
    pointPosition () {
      return this.pointTime / this.length * 374
    }
  },
  filters: {
    formatSeconds (value) {
      let seconds = parseInt(value)
      let middle = '00'
      if (seconds > 60) {
        middle = parseInt(seconds / 60) > 9 ? parseInt(seconds / 60) : '0' + parseInt(seconds / 60).toString()
        seconds = parseInt(seconds % 60) > 9 ? parseInt(seconds % 60) : '0' + parseInt(seconds % 60).toString()
      } else {
        seconds = seconds > 9 ? seconds.toString() : '0' + seconds.toString()
      }
      return `${middle}:${seconds}`
    }
  },
  mounted () {
    this.audio = this.$refs.audio
    // 跳过前60s
    this.audio.onloadedmetadata = () => {
      this.audio.currentTime = 60
      this.length = this.audio.duration
      console.log('开始加载')
    }
    // 加载完毕可以开始播放
    setTimeout(() => {
      this.audio.oncanplay = () => {
        this.isStart = false
        this.audio.play()
        this.img = require('@/assets/img/stop.png')
      }
    }, 500)
    // 进度条更新
    this.timer = setInterval(() => {
      this.pointTime = Math.ceil(this.audio.currentTime)
    }, 1000)
    // 监听进度条拖拽
    this.point = this.$refs.point
    this.point.onmousedown = e => {
      this.x = e.clientX
      this.l = this.point.offsetLeft
      this.isDown = true
      this.point.style.cursor = 'move'
      console.log(this.x, this.l)
    }
    // 鼠标移动
    window.onmousemove = e => {
      if (this.isDown === false) {
        return
      }
      // 获取x和y
      var nx = e.clientX
      // 计算移动后的左偏移量和顶部的偏移量
      var nl = nx - (this.x - this.l)
      this.point.style.left = nl + 'px'
    }
    // 鼠标抬起事件
    this.point.onmouseup = () => {
      // 开关关闭
      this.isDown = false
      this.point.style.cursor = 'default'
    }

    for (let i = 1; i < 21; i++) {
      this.resourcesList.push({
        url: `https://www.zsp.cool/music/dmbj/盗墓笔记1七星鲁王${20 + i}.周建龙.mp3`,
        name: `盗墓笔记1七星鲁王${20 + i}.周建龙.mp3`
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    changePlay (item, index) {
      if (this.index !== index) {
        this.index = index
        this.url = item.url
        this.audio.canplay = this.handleStart()
      }
    },
    handleStart () {
      console.log(this.isStart)
      if (this.isStart) {
        this.audio.play()
        this.img = require('@/assets/img/stop.png')
        this.isStart = false
      } else {
        this.audio.pause()
        this.img = require('@/assets/img/begin.png')
        this.isStart = true
      }
    },
    handleNext () {
      this.url = this.resourcesList[++this.index].url
    },
    handlePrev () {
      if (this.index > 0) {
        this.url = this.resourcesList[--this.index].url
      }
    },
    handleList () {
      this.showList = !this.showList
    }
  }
}
</script>
<style scoped lang="less">
.list-close {
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  background: #ffffff;
  padding:14px 0px;
}
.list {
  position: absolute;
  top: 0;
  right: 0;
}
.p {
  position: relative;
  height: 60px;
}
.p-icon {
  margin: 0 2vw;
  width: 40px;
  height: 40px;
  padding: 6px;
}
.time {
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  padding-top: 6px;
  color: #aaaaaa;
}
.context {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
}
.progress {
  position: relative;
  height: 6px;
  margin: 0 20px;
  &-all {
    position: relative;
    margin-top: 2px;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background: #999999;
  }
  &-point {
    position: absolute;
    top: -2px;
    left: 0px;
    width: 6px;
    height: 6px;
    background: #ffffff;
    border-radius: 50%;
    z-index: 10000;
  }
}
#audio {
  display: none;
}
.player {
  position: relative;
  height: 100%;
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
