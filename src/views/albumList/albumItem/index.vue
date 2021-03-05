<template>
  <div class="page" @scroll="scroll">
    <div class="top-bar" >
      <div class="back" @click="$router.go(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </div>
      <div>歌单</div>
      <div class="option" @click="showBottom = !showBottom">
        <mu-icon value="more_horiz"></mu-icon>
      </div>
    </div>
    <div v-if="album.img" class="top-box">
      <div class="bg">
        <img v-show="showBg" :src="`https://www.zsp.cool${album.img}`" :onload="setBg()">
      </div>
      <div class="baner">
        <div class="img">
          <img :src="`https://www.zsp.cool${album.img}`" class="img">
        </div>
        <div class="info">
          <div>{{ album.albumName }}</div>
          <div class="author">
            <img :src="`https://www.zsp.cool${album.creatorImg}`" alt="">
            {{ album.creatorName }}
          </div>
          <div></div>
        </div>
      </div>
    </div>
    <div>
      <mu-list class="item-list">
        <mu-list-item v-for="(item, index) in songs" :key="item.id" button @click="changeItem(index)">
          <mu-list-item-content>
            <mu-list-item-title style="font-size: 14px; color:#2c3e50">{{ item.title }}<span style="opacity:0.4;font-size: 14px"> - {{ item.artist }}</span></mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action v-if="album.creatorId == $store.state.user.id" class="close" @click="dlt(index)">
            <mu-button icon>
              <mu-icon value="close" />
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </div>
    <mu-bottom-sheet style="height: 170px;background: #f5f5f5" :open.sync="showBottom">
      <div class="btm">
        <div v-if="album.creatorId == $store.state.user.id">
          <div class="block" @click="$refs.upload.chooseFile()">
            <mu-icon value="playlist_add"></mu-icon>
          </div>
          添加歌曲
        </div>
        <div v-if="album.creatorId == $store.state.user.id" @click="$router.push(`/album/edit/${album.id}`)">
          <div class="block">
            <mu-icon value="edit"></mu-icon>
          </div>
          编辑详情
        </div>
        <div @click="setFavorite">
          <div class="block" :style="{ color: favoColor }">
            <mu-icon value="favorite" ></mu-icon>
          </div>
          {{ isFavorite? '已收藏' : '收藏' }}
        </div>
      </div>
      <mu-ripple class="bottom" @click="showBottom = false">
        关闭
      </mu-ripple>
    </mu-bottom-sheet>
    <file-upload  ref="upload" @finish="uploadFinish" />
  </div>
</template>

<script>
import FileUpload from '../../../components/uploadFile'

export default {
  components: { FileUpload },
  data () {
    return {
      showBottom: false,
      album: {},
      songs: [],
      innerHeight: 0,
      showBg: false,
      scrollTop: 0,
      fId: ''
    }
  },
  computed: {
    favoColor () {
      return this.fId !== '' ? '#f44336' : '#2c3e50'
    },
    isFavorite () {
      return !!this.fId
    }
  },
  created () {
    this.$axios.get(`/album/${this.$route.params.id}`).then(res => {
      this.album = res.data
      this.getMusicList()
    })
    this.$store.dispatch('getIsFavorite', { type: 'album', id: this.$route.params.id }).then(id => {
      this.fId = id
    })
  },
  methods: {
    async setFavorite () {
      const p = {
        isFavorite: !this.isFavorite,
        type: 'album',
        id: this.isFavorite ? this.fId : this.album.id
      }
      this.$store.dispatch('setIsFavtite', p).then(id => {
        this.fId = id || ''
      })
    },
    scroll (e) {
      this.scrollTop = e.target.scrollTop
    },
    setBg () {
      setTimeout(() => {
        this.showBg = true
      })
    },
    changeItem (index) {
      this.$store.commit('setSongInfo', {
        songList: this.songs
      })
      this.$store.commit('setIndex', index)
    },
    uploadFinish (data) {
      data.albumId = this.album.id
      this.$axios.post('/add-music', data).then(() => {
        this.getMusicList()
      })
    },
    getMusicList () {
      this.$axios.get(`/album/${this.album.id}/music`).then(res => {
        this.showBottom = false
        this.songs = res.data
      })
    },
    dlt (index) {
      this.$axios.delete(`album/${this.album.id}/music/${this.songs[index].id}`)
      this.songs.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
  .page {
    height: 100%;
    overflow: auto;
  }
  .top-bar {
    position: fixed;
    width: 100vw;
    display: flex;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    padding: 10px;
    color: #fff;
    overflow: hidden;
    z-index: 100;
  }
  .back {
    position: absolute;
    top: 8px;
    left: 0;
    .material-icons {
      font-size: 30px;
    }
  }
  .option {
    position: absolute;
    top: 8px;
    right: 16px;
  }
  .bg {
    position: absolute;
    width: 100vw;
    overflow: hidden;
    height: 260px;
    img {
      object-fit: cover; // 取代background-cover
      width: 100vw;
      height: auto;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100%;
      z-index: 0;
      -webkit-backdrop-filter: blur(5px); /* apply the blur */
      backdrop-filter: blur(5px);         /* apply the blur */
      pointer-events: none;
    }
  }

  .baner {
    background: rgba(0, 0, 0, .3);
    position: relative;
    height: 260px;
    padding: 100px 0 48px 20px;
    display: flex;
    justify-content: flex-start;
    color: #fff;
    .img {
      height: 120px;
      width: 120px;
      border-radius: 10px;
    }
    .info {
      width: 100%;
      padding-left: 20px;
      text-align: left;
      img {
        height: 20px;
        width: 20px;
        border-radius: 50%;
      }
    }
    .author {
      display: flex;
      align-items: center;
      padding-top: 10px;
      img {
        margin-right: 8px;
      }
    }
  }
  .btm {
    display: flex;
    padding: 20px 20px 10px;
    color: #2c3e50;
    font-size: 12px;
    line-height: 40px;
    .block {
      width: 50px;
      height: 50px;
      padding: 10px;
      border-radius: 8px;
      background: #fff;
      .material-icons {
        font-size: 30px;
      }
    }
  }
  .btm > div {
    margin-right: 20px;
    text-align: center;
  }
  .bottom {
    position: relative;
    height: 50px;
    line-height: 50px;
    width: 100%;
    border-top: 1px solid #eeeeee;
    text-align: center;
  }
  .item-list {
    overflow: auto;
  }
  .close {
    .material-icons {
      font-size: 16px;
    }
  }
  .top-box {
    position: -webkit-sticky;
    position: -moz-sticky;
    position: -ms-sticky;
    position: sticky;
    width: 100vw;
    overflow: hidden;
    height: 260px;
    top: -220px;
    z-index: 10;
  }
</style>
