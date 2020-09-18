<template>
  <div class="player">
    <audio ref="audio" muted="muted" :src="url" id="audio" controls></audio>
    <audio ref="audio2" muted="muted" :src="url2" id="audio" controls></audio>
    <p v-if="bookList.length">{{ bookName }}</p>
    <v-drop-menu>
      <v-drop-item v-model="value1" :options="option1" />
    </v-drop-menu>
    <div class="context">
      <div class="progress">
        <div ref="all" class="progress-all"></div>
        <div class="progress-point" ref="point" :style="{ left: `${pointPosition}px` }">
        </div>
        <div class="progress-done"></div>
      </div>
      <div class="time">
        <span>{{ pointTime | formatSeconds}}</span>
        <span>{{ length | formatSeconds}}</span>
      </div>
      <div class="p">
        <div style="display: flex; justify-content: center;width: 100%">
          <img class="p-icon" @click="handlePrev" src="@/assets/img/prev.png">
          <div class="p-icon">
            <v-loading style="padding: 0" color="#ffffff" v-if="loading" size="40px" />
            <img v-else @click="handleStart()" style="width: 40px; height: 40px" :src="img">
          </div>
          <img @click="handleNext" class="p-icon" src="@/assets/img/next.png">
        </div>
        <img @click="handleList" class="p-icon list" style="padding: 10px 6px" src="@/assets/img/list.png">
      </div>
    </div>
    <v-popup v-model="showList" position="right" round :style="{ width: '70%', height: '100%'}">
      <div style="height: 100vh;padding: 0 4px; overflow: auto;">
        <div @click="changePlay(item, i)" v-for="(item, i) in resourcesList" :key="item.url">
          <v-divider />
          <div :style="{ color: bookName === item.name ? '#ee0a24' : '' }">{{ item.name }}</div>
        </div>
        <div style="padding-bottom: 50px">
          <v-divider />
          <div style="font-size:14px;color: #aaaaaa">到底啦~</div>
        </div>
        <div class="list-close">
          <div @click="() => { this.showList = false }">关闭</div>
        </div>
      </div>
    </v-popup>
  </div>
</template>

<script>
import { Popup, Divider, Loading, DropdownMenu, DropdownItem } from 'vant'
import 'vant/lib/button/style'

export default {
  name: 'Player',
  components: {
    VPopup: Popup,
    VDivider: Divider,
    VLoading: Loading,
    VDropMenu: DropdownMenu,
    VDropItem: DropdownItem
  },
  data () {
    return {
      bookName: '秦岭神树',
      img: require('@/assets/img/begin.png'),
      length: 0, // 音频总时长
      isStart: true, // 是否开始播放
      audio: null,
      url: 'https://www.zsp.cool/music/dmbj/qlss/周建龙-第01集 (秦岭神树).mp3',
      audio2: null,
      url2: 'https://www.zsp.cool/music/dmbj/qlss/周建龙-第01集 (秦岭神树).mp3',
      pointTime: 0, // 当前时间点
      timer: null,
      point: null,
      showList: false,
      resourcesList: [],
      index: 0, // 当前播放第几集
      x: 0,
      l: 0,
      isDown: false, // 是否按下进度点
      loading: false, // 音频是否加载完毕
      allWidth: 0, // 进度条总长度
      value1: 0,
      option1: [
        { text: '秦岭神树', value: 0 },
        { text: '云顶天宫', value: 1 },
        { text: '蛇沼鬼城', value: 2 }
      ],
      bookList: [],
      jumpBeginTime: 55
    }
  },
  watch: {
    value1 (val) {
      console.log('选择书籍')
      switch (val) {
        case 0: {
          this.resourcesList = this.bookList[0]
          this.jumpBeginTime = 55
          break
        }
        case 1: {
          this.resourcesList = this.bookList[1]
          this.jumpBeginTime = 72
          break
        }
        case 2: {
          this.resourcesList = this.bookList[2]
          this.jumpBeginTime = 53
          break
        }
      }
    }
  },
  computed: {
    pointPosition () {
      return this.pointTime / this.length * this.allWidth
    }
  },
  filters: {
    formatSeconds (value) {
      let seconds = parseInt(value)
      let middle = '00'
      if (seconds > 59) {
        middle = parseInt(seconds / 60) > 9 ? parseInt(seconds / 60) : '0' + parseInt(seconds / 60).toString()
        seconds = parseInt(seconds % 60) > 9 ? parseInt(seconds % 60) : '0' + parseInt(seconds % 60).toString()
      } else {
        seconds = seconds > 9 ? seconds.toString() : '0' + seconds.toString()
      }
      return `${middle}:${seconds}`
    }
  },
  created () {
    let list = []
    for (let i = 1; i < 45; i++) {
      const j = i < 10 ? '0' + i : i
      list.push({
        url: `https://www.zsp.cool/music/dmbj/qlss/周建龙-第${j}集 (秦岭神树).mp3`,
        name: `周建龙 - 第${j}集 (秦岭神树).mp3`
      })
    }
    this.bookList.push(list)
    list = []
    for (let i = 1; i < 39; i++) {
      list.push({
        url: `https://www.zsp.cool/music/dmbj/ydtg/云顶天宫${i}.mp3`,
        name: `周建龙 - 第${i}集 (云顶天宫).mp3`
      })
    }
    this.bookList.push(list)
    list = []
    for (let i = 1; i < 39; i++) {
      list.push({
        url: `https://www.zsp.cool/music/dmbj/szgc/蛇沼鬼城${i}.mp3`,
        name: `周建龙 - 第${i}集 (蛇沼鬼城).mp3`
      })
    }
    this.bookList.push(list)
    this.resourcesList = this.bookList[0]
  },
  mounted () {
    this.allWidth = this.$refs.all.offsetWidth
    this.audio = this.$refs.audio
    this.audio2 = this.$refs.audio2
    if (window.localStorage.getItem('listenHistory')) {
      const w = JSON.parse(window.localStorage.getItem('listenHistory'))
      console.log(w)
      this.value1 = w.value1
      this.index = w.index
      this.url = this.bookList[w.value1][w.index].url
    }
    // 设置初始书名
    this.audio.onloadstart = () => {
      console.log('开始加载')
      this.loading = true
      this.bookName = this.bookList[this.value1][this.index].name
    }
    // 跳过前60s
    this.audio.onloadedmetadata = () => {
      this.audio.currentTime = this.jumpBeginTime
      this.length = this.audio.duration
      console.log('获取到时间信息')
    }
    // 加载完毕
    this.audio.oncanplay = () => {
      this.loading = false
      console.log('oncanplay')
      this.audio.play()
      this.isStart = false
      this.img = require('@/assets/img/stop.png')
    }
    // 加载足够长度
    this.audio.oncanplaythrough = () => {
      window.localStorage.setItem('listenHistory', JSON.stringify({
        value1: this.value1,
        index: this.index
      }))
      console.log('设置历史记录：', this.value1, this.index)
    }
    // 进度条更新
    this.timer = setInterval(() => {
      if (!this.isDown) {
        this.pointTime = Math.ceil(this.audio.currentTime)
      }
      if (this.length > 0 && this.length - this.pointTime < 120 && this.resourcesList[this.index + 1] && this.url2 !== this.resourcesList[this.index + 1].url) {
        console.log('预加载')
        this.url2 = this.resourcesList[this.index + 1].url
      }
      if (this.length > 0 && !this.isDown && this.length - this.pointTime < 60) {
        this.handleNext()
      }
    }, 1000)
    // 监听进度条拖拽
    this.point = this.$refs.point
    this.point.addEventListener('touchstart', e => {
      this.x = e.touches[0].clientX
      this.l = this.point.offsetLeft
      this.isDown = true
      this.point.style.cursor = 'move'
    })
    // 鼠标移动
    this.point.addEventListener('touchmove', e => {
      if (this.isDown === false || this.pointTime <= 0 || this.pointTime >= this.length) {
        return
      }
      // 获取当前clientX
      var nx = e.touches[0].clientX
      // 计算移动后的左偏移量
      var nl = nx - (this.x - this.l)
      this.pointTime = nl / this.allWidth * this.length
    })
    // 鼠标抬起事件
    this.point.addEventListener('touchend', () => {
      // 开关关闭
      this.isDown = false
      this.audio.currentTime = this.point.offsetLeft / this.$refs.all.offsetWidth * this.length
    })
    console.log(this.url)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    changePlay (item, index) {
      console.log('播放项：', item)
      if (this.index !== index) {
        this.index = index
        this.url = item.url
      }
    },
    handleStart () {
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
/deep/ .van-dropdown-menu__bar {
  background: none;
  box-shadow: 0 0 0 0;
}
/deep/ .van-dropdown-menu__title--active, /deep/ .van-ellipsis {
  color: #ffffff;
}
p {
  color: #ffffff;
}
.list-close {
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  background: #ffffff;
  padding:14px 0px;
  box-shadow: 0 0 8px 2px #aaaaaa;
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
  height: 10px;
  margin: 0 20px;
  &-all {
    position: relative;
    margin-top: 2px;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: #999999;
  }
  &-point {
    position: absolute;
    top: -6px;
    left: 0px;
    width: 16px;
    height: 16px;
    background: #ffffff;
    border-radius: 50%;
    z-index: 10000;
  }
}
#audio {
  display: none;
}
.player {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(70, 70, 70, 0.5);
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
