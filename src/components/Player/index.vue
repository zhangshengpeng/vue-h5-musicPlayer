<template>
<div>
  <mu-slide-bottom-transition>
    <div v-show="show && !showList && !showCover" class="player">
      <div class="bc" />
      <div v-show="false" style="position: absolute; top: -100px">
        <audio ref="audio" :src="song.src || '/img/default.jpg'" id="audio" controls></audio>
      </div>
      <div class="music" @click="handlePlayer">
        <div class="cd"><img :src="`data:image/jpg;base64,${song.image || '/img/default.jpg' }`" alt=""></div>
        <div class="song">{{ song.title }} - {{ song.artist }}</div>
        <div class="control" @click="handlePlay">
          <div class="control-icon" v-show="isReady">
            <mu-icon :value="icon"></mu-icon>
          </div>
          <mu-circular-progress
            class="circular-progress"
            :mode="isReady ? 'determinate' : 'indeterminate'"
            :value="now"
            :max="max"
            :min="min"
            :size="27"
            :stroke-width="2"
            color="#ffffff">
          </mu-circular-progress>
        </div>
        <div class="list" @click="showList = true">
          <mu-icon value="reorder"></mu-icon>
        </div>
      </div>
    </div>
  </mu-slide-bottom-transition>
  <music-list :show.sync="showList"></music-list>
  <cover :show.sync="showCover"/>
</div>
</template>

<script>
import MusicList from './musicList'
import Cover from './cover'
export default {
  components: { MusicList, Cover },
  name: 'Player',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showList: false,
      showCover: false,
      min: 0,
      icon: 'play_arrow',
      audio: null,
      timer: null,
      didTouch: false
    }
  },
  watch: {
    status (val) {
      this.icon = val ? 'pause' : 'play_arrow'
    }
  },
  computed: {
    song () {
      return this.$store.state.song
    },
    now () {
      // console.log(this.$store.state.now, this.$store.state.max)
      if (this.$store.state.now && this.$store.state.now > this.$store.state.max) {
        this.$store.commit('next')
      }
      return this.$store.state.now
    },
    status () {
      return this.$store.state.status
    },
    max () {
      return this.$store.state.max
    },
    isReady () {
      return this.$store.state.isReady
    }
  },
  mounted () {
    this.audio = this.$refs.audio
    this.audio.onloadstart = () => {
      this.$store.commit('setIsReady', false)
      console.log('onloadstart，开始加载')
    }
    this.audio.onloadedmetadata = () => {
      this.$store.commit('setMax', this.audio.duration)
      this.$store.commit('setIsReady', true)
      console.log('onloadedmetadata，获取到时间信息：', this.audio.duration)
      this.didTouch ? this.handlePlay() : this.didTouch = true
    }
  },
  methods: {
    handlePlay () {
      if (this.status) {
        this.audio.pause()
        clearTimeout(this.timer)
      } else {
        this.audio.play()
        // 进度条更新
        this.timer = setInterval(() => {
          this.$store.commit('setNow', Math.ceil(this.audio.currentTime))
        }, 1000)
      }
      this.$store.commit('setStatus', !this.status)
    },
    handlePlayer (e) {
      const className = e.target.getAttribute('class')
      if (['music', 'song'].includes(className)) {
        this.showCover = true
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
  .player {
    position: fixed;
    bottom: 0;
    width: 100vw;
    .music {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-between;
      top: -24px;
      margin: 0 16px;
      padding-right: 20px;
      width: calc(100% - 32px);
      height: 48px;
      border-radius: 24px;
      background: #c9caca;
      text-align: left;
      color: #fff;
      .cd {
        position: relative;
        width: 54px;
        height: 48px;
        flex-shrink: 0;
        img {
          position: absolute;
          bottom: 0;
          width: 54px;
          height: 54px;
          background: #666666;
          box-shadow: 6px 0px 8px rgb(143, 143, 143);
          border-radius: 4px;
        }
      }
    }
    .bc {
      width: 100%;
      height: 54px;
      background: #fff;
    }
    .song {
      width: 100%;
      max-width: calc(100vw - 160px);
      margin: 0 16px;
      overflow: hidden;
      text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    }
    .control {
      flex-shrink: 0;
      height: 29px;
      width: 29px;
      position: relative;
      border: solid 2px #fff;
      border-radius: 50%;
      &-icon {
        position: absolute;
        top: 2px;
        left: 2px;
        .material-icons {
          font-size: 22px;
        }
      }
    }
    .list {
      margin-left: 10px;
      height: 28px;
      width: 28px;
      .material-icons {
          font-size: 28px;
        }
    }
  }
  .circular-progress {
    transform:rotate(-90deg);
    position: absolute;
    top: -1px;
    left: -1px;
  }
</style>
