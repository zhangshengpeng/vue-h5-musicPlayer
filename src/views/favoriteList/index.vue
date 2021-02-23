<template>
  <div class="page">
    <div class="top-bar">
      <div class="back" @click="$router.push('/')">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </div>
      <div :class="isSong ? 'active' : ''" @click="handleBar(true)">收藏歌曲</div>
      <div class="line"></div>
      <div :class="isSong ? '' : 'active'" @click="handleBar(false)">收藏歌单</div>
    </div>
    <div class="body">
      <div class='title'>
        <div v-show="isSong">{{ length }} 首歌曲</div>
        <div v-show="!isSong">{{ length }} 张歌单</div>
      </div>
      <div>
        <mu-list v-show="isSong" key="1">
          <mu-list-item v-for="(item, index) in songs" :key="item.id" button @click="changeItem(index)">
            <mu-list-item-content>
              <mu-list-item-title style="font-size: 14px; color:#2c3e50">{{ item.title }}<span style="opacity:0.4;font-size: 14px"> - {{ item.artist }}</span></mu-list-item-title>
            </mu-list-item-content>
            <mu-list-item-action class="close" @click="dlt(index)">
              <mu-button icon>
                <mu-icon value="close" />
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
        <mu-list v-show="!isSong" textline="three-line" key="2">
          <mu-list-item v-for="item in favAlbum" :key="item.id" avatar button @click="$router.push(`/album/${item.id}`)">
            <img :src="`https://www.zsp.cool${item.img || '/img/default.jpg'}`" class="album-img">
            <mu-list-item-content>
              <mu-list-item-title>{{ item.name }}</mu-list-item-title>
              <mu-list-item-sub-title>{{ item.length }}首</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon value="keyboard_arrow_right"></mu-icon>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      songs: [],
      favAlbum: [],
      isSong: true
    }
  },
  mounted () {
    this.$axios.get(`/favoriteList/${this.$store.state.user.id}/song`).then((res) => {
      this.songs = res.data
    })
  },
  computed: {
    length () {
      return this.isSong ? this.songs.length : this.favAlbum.length
    }
  },
  methods: {
    handleBar (flag) { // 切换tab
      if (this.isSong === flag) return
      this.isSong = flag
    },
    changeItem (index) {
      this.$store.commit('setSongInfo', {
        songList: this.songs
      })
      this.$store.commit('setIndex', index)
    }
  }
}
</script>

<style lang="less" scoped>
  .active {
    font-weight: 700;
  }
  .top-bar {
    position: fixed;
    width: 100vw;
    display: flex;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background: #fff;
    box-shadow: 0 0 8px #e4e4e4;
    z-index: 100;
  }
  .title {
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
  }
  .body {
    padding-top: 56px;
    text-align: left;
  }
  .line {
    display: inline-block;
    height: 16px;
    width: 1px;
    margin: 0 14px;
    background: rgb(146, 146, 146);
  }
  .back {
    position: absolute;
    top: 8px;
    left: 0;
    .material-icons {
      font-size: 30px;
    }
  }
  .close {
    .material-icons {
      font-size: 16px;
    }
  }
</style>
