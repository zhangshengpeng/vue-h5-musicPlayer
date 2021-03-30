<template>
  <mu-bottom-sheet class="list" :open.sync="showList">
    <div class="flex-box">
      <div class="top">顺序播放({{ songs.length }}首)</div>
      <mu-list class="item-list">
        <mu-list-item v-for="(item, index) in songs" :key="item.id" button @click="changeItem(index)">
          <mu-list-item-content>
            <mu-list-item-title :style="{fontSize: '14px', color: index === idx ? 'rgb(244, 67, 54)' : 'rgba(0, 0, 0, 0.87)'}">{{ item.title }}<span style="opacity:0.4;font-size: 14px"> - {{ item.artist }}</span></mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action class="close" @click="dlt(index)">
            <mu-button icon>
              <mu-icon value="close" />
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
      <div>
        <mu-ripple class="bottom" @click="showList = false">
            关闭
        </mu-ripple>
      </div>

    </div>
  </mu-bottom-sheet>
</template>

<script>
export default {
  name: 'MusicList',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showList: {
      set (val) {
        this.$emit('update:show', val)
      },
      get () {
        return this.show
      }
    },
    songs: {
      get () {
        return this.$store.state.songList
      }
    },
    idx () {
      return this.$store.state.index
    }
  },
  data () {
    return {
    }
  },
  methods: {
    dlt (index) {
      this.songs.splice(index, 1)
    },
    changeItem (index) {
      this.$store.commit('setIndex', index)
      this.$emit('update:show', false)
      setTimeout(() => {
        this.$parent.audio.play()
        this.$parent.status = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .list {
    position: absolute;
    width: 100vw;
    height: calc( 667px - 30vh);
  }
  .top {
    height: 57px;
    padding: 16px;
    font-size: 16px;
    display: flex;
    align-items: center;
    border-bottom: solid 1px #eeeeee;
  }
  .bottom {
    position: relative;
    height: 50px;
    line-height: 50px;
    width: 100vw;
    border-top: 1px solid #eeeeee;
    text-align: center;
  }
  .item-list {
    height: calc(100% - 108px);
    overflow: auto;
  }
  .flex-box {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .close {
    .material-icons {
      font-size: 16px;
    }
  }
  @media screen and (min-width: 500px) {

  }
</style>
