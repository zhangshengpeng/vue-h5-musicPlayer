<template>
  <mu-bottom-sheet class="cover-box" :open.sync="show">
    <div class="bg">
      <img :src="`data:image/jpg;base64,${base64}`">
      <div class="banner" ></div>
    </div>
    <div style="padding: 10px 20px">
      <mu-icon value="keyboard_arrow_down" @click="$emit('update:show', false)"/>
    </div>
    <div class="img-box">
      <img :src="`data:image/jpg;base64,${base64}`">
    </div>
    <div class="info">
      <div>
        <h2>{{ song.title }}</h2>
        <mu-icon value="favorite" :color="isFavorite ? '#f44336' : '#ffffff'" @click="handleFavorite"></mu-icon>
      </div>
      <h4>{{ song.artist }}</h4>
    </div>
    <div class="bt-box">
      <div>
        <mu-slider v-model="now" color="#ffffff" :max="max" :display-value="false" :step="1"></mu-slider>
        <div class="bt-time">
          <span>{{ now | minute }}</span>
          <span>{{ max | minute }}</span>
        </div>
      </div>
      <div class="bt-control">
        <div>
          <mu-icon @click="prev" value="skip_previous"></mu-icon>
        </div>
        <div class="play-btn" @click="handlePlay">
          <div v-if="!isReady" style="padding:6px">
            <mu-circular-progress
              class="circular-progress"
              mode="indeterminate"
              :size="48"
              :stroke-width="2"
              color="#ffffff">
            </mu-circular-progress>
          </div>
          <div v-else>
            <mu-icon v-show="status" value="pause_circle_filled"></mu-icon>
            <mu-icon v-show="!status" value="play_circle_filled"></mu-icon>
          </div>
        </div>
        <div>
          <mu-icon @click="next" value="skip_next"></mu-icon>
        </div>
      </div>
      <div class="song-list" @click="$parent.showList = true">
        <mu-icon value="reorder"></mu-icon>
      </div>
    </div>
  </mu-bottom-sheet>
</template>

<script>
export default {
  name: 'Cover',
  props: {
    show: {
      type: Boolean,
      default: false,
      point: null
    }
  },
  mounted () {
  },
  filters: {
    minute (value) {
      let seconds = parseInt(value)
      let middle = '00'
      if (seconds > 59) {
        middle = parseInt(seconds / 60) > 9 ? parseInt(seconds / 60) : '0' + parseInt(seconds / 60).toString()
        seconds = parseInt(seconds % 60) > 9 ? parseInt(seconds % 60) : '0' + parseInt(seconds % 60).toString()
      } else {
        seconds = seconds > 9 ? seconds.toString() : '0' + seconds.toString()
      }
      return `${middle} : ${seconds}`
    }
  },
  data: () => {
    return {
      base64: ''
    }
  },
  computed: {
    song () {
      return this.$store.state.song
    },
    isFavorite () {
      return this.$store.state.isFavorite
    },
    now: {
      get () {
        return this.$store.state.now
      },
      set (val) {
        this.$parent.audio.currentTime = val
        this.$store.commit('setNow', val)
      }
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
  watch: {
    song (val) {
      val.image && (this.base64 = val.image)
    }
  },
  methods: {
    handleFavorite () {
      const p = {
        isFavorite: !this.isFavorite,
        type: 'song',
        id: this.$store.state.song.id
      }
      this.$store.dispatch('setIsFavtite', p)
    },
    handlePlay () {
      this.$parent.handlePlay()
    },
    prev () {
      this.$store.commit('prev')
    },
    next () {
      this.$store.commit('next')
    }
  }
}
</script>

<style lang="less" scoped>
    .material-icons {
      color: #ffffff;
    }
  .bg {
    position: absolute;
    height: 120vh;
    width: 120vW;
    top: -10vh;
    left: -10vw;
    filter: blur(20px);
    z-index: -1;
    img {
      height: 120vh;
      width: auto;
    }
  }
  .banner {
    top: 0;
    left: 0;
    position: absolute;
    background: rgba(0, 0, 0, .5);
    height: 120vh;
    width: 100%;
  }
  .cover {
    &-box {
      height: 100%;
      color: #ffffff;
      overflow: hidden;
    }
  }
  .img-box {
    width: 100%;
    text-align: center;
    img {
      width: calc(100vw - 48px);
      height: calc(100vw - 48px);
      border-radius: 12px;
    }
  }
  .info {
    padding: 0 20px;
    & > div {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      .material-icons {
        padding: 20px 10px 10px 10px;
        flex-shrink: 0;
        font-size: 30px;
      }
    }
  }
  .bt {
    &-box {
      position: absolute;
      width: 100%;
      padding: 30px 20px;
      bottom: 0;
      .song-list {
        position: absolute;
        bottom: 42px;
        right: 20px;
        .material-icons {
          font-size: 34px;
        }
      }
    }
    &-time {
      width: 100%;
      margin-top: -20px;
      display: flex;
      justify-content: space-between;
    }
    &-control {
      display: flex;
      padding: 0 60px;
      width: 100%;
      justify-content: space-around;
      align-items: center;
      .material-icons {
        font-size: 40px;
      }
      .play-btn {
        .material-icons {
        font-size: 60px;
      }
      }
    }
  }
</style>
