<template>
  <div class="page">
    <div class="top-bar">
      <div class="back" @click="$router.push('/')">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </div>
      <div :class="isMy ? 'active' : ''" @click="handleBar(true)">自建歌单</div>
      <div class="line"></div>
      <div :class="isMy ? '' : 'active'" @click="handleBar(false)">收藏歌单</div>
    </div>
    <div class="body">
      <div class='title'>
        <div>{{ length }} 张歌单</div>
        <div v-show="isMy" class="add" @click="showAdd = true">
          <mu-icon value="add"></mu-icon>
        </div>
      </div>
      <div>
        <mu-list v-show="isMy" textline="three-line" key="1">
          <mu-list-item v-for="item in myAlbum" :key="item.id" avatar button  @click="$router.push(`/album/${item.id}`)">
            <img :src="`https://www.zsp.cool${item.img || '/img/default.jpg'}`" class="album-img">
            <mu-list-item-content>
              <mu-list-item-title>{{ item.albumName }}</mu-list-item-title>
              <mu-list-item-sub-title>{{ item.length }}首</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon value="keyboard_arrow_right"></mu-icon>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
        <mu-list v-show="!isMy" textline="three-line" key="2">
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
    <mu-dialog title="创建歌单" width="360" :open.sync="showAdd">
      <mu-form :model="addForm" label-position="top" label-width="60">
        <mu-form-item prop="id" label="歌单名称">
          <mu-text-field v-model="addForm.albumName" ></mu-text-field>
        </mu-form-item>
      </mu-form>
      <mu-button slot="actions" flat color="primary" @click="cancelAdd">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="submitAdd">确定</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addForm: {
        albumName: ''
      },
      myAlbum: [],
      favAlbum: [],
      isMy: true,
      showAdd: false
    }
  },
  mounted () {
    this.$axios.get('/album-list').then((res) => {
      this.myAlbum = res.data
    })
  },
  computed: {
    length () {
      return this.isMy ? this.myAlbum.length : this.favAlbum.length
    }
  },
  methods: {
    handleBar (flag) {
      if (this.isMy === flag) return
      this.isMy = flag
    },
    cancelAdd () {
      this.addForm.albumName = ''
      this.showAdd = false
    },
    submitAdd () {
      this.$axios.post('/add-album', this.addForm).then(() => {
        this.$axios.get('/album-list').then((res) => {
          this.myAlbum = res.data
        })
      })
      this.showAdd = false
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/ .mu-item-content {
    padding-left: 10px;
    .mu-item-title {
      height: 40px;
    }
  }
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
  .add {
    border: 2px solid #2c3e50;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    .material-icons {
      font-size: 16px;
    }
  }
</style>
