<template>
  <div class="page">
    <div class="top-bar" >
      <div class="back" @click="$router.push('/album')">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </div>
      <div style="postion: relative; z-index: 100">歌单</div>
      <div class="option" @click="showBottom = !showBottom">
        <mu-icon value="more_horiz"></mu-icon>
      </div>
    </div>
    <div v-if="album.img" style="position: relative;overflow: hidden; height: 260px">
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
          <mu-list-item-action class="close" @click="dlt(index)">
            <mu-button icon>
              <mu-icon value="close" />
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </div>
    <mu-bottom-sheet style="height: 170px;background: #f5f5f5" :open.sync="showBottom">
      <div class="btm">
        <div>
          <div class="block" @click="$refs.upload.chooseFile()">
            <mu-icon value="playlist_add"></mu-icon>
          </div>
          添加歌曲
        </div>
        <div @click="$router.push(`/album/edit/${album.id}`)">
          <div class="block">
            <mu-icon value="edit"></mu-icon>
          </div>
          编辑详情
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
      showBg: false
    }
  },
  created () {
    this.$axios.get(`/album/${this.$route.params.id}`).then(res => {
      this.album = res.data
      this.getMusicList()
    })
  },
  methods: {
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
    overflow: hidden;
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
    top: -10px;
    left: -10vw;
    width: 120vw;
    overflow: hidden;
    height: 280px;
    img {
      filter: blur(10px);
      width: 120vw;
      height: auto;
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
  .circular-progress {
    transform:rotate(-90deg);
    // position: absolute;
    top: -1px;
    left: -1px;
  }
  .progress {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>
