<template>
  <div class="home">
    <div class="card user">
      <div class="info">
        <div style="height: 60px; width: 60px">
          <img class="head" v-if="user.url" :src="`https://www.zsp.cool${user.url || '/img/default.jpg'}`">
        </div>
        <span>{{ user.name }}</span>
      </div>
      <div class="detail">关注 <span class="follw"> 5 </span> <div class="line" /> 粉丝 <span class="follw">2</span></div>
    </div>
    <div class="menu">
      <div @click="handleType('/warehouse')">
        <mu-icon value="home"></mu-icon>
        <div>曲库</div>
      </div>
      <div @click="handleType('/favorite')">
        <mu-icon value="favorite"></mu-icon>
        <div>收藏</div>
      </div>
      <div @click="handleType('/album')">
        <mu-icon value="work"></mu-icon>
        <div>我的歌单</div>
      </div>
      <div>
        <mu-icon value="check_circle"></mu-icon>
        <div>关注</div>
      </div>
      <div>
        <mu-icon value="contacts"></mu-icon>
        <div>粉丝</div>
      </div>
    </div>
    <div>
      <div class="type">
        <div class="type-title">
          <span>自建歌单</span>
          <div style="display: flex; align-items: center" @click="handleType('/album')">更多 <mu-icon value="keyboard_arrow_right"/></div>
        </div>
        <div class="type-box">
          <div class="type-item" v-for="item in myAlbum" :key="item.id" @click="$router.push(`/album/${item.id}`)">
            <div><img :src="`https://www.zsp.cool${item.img || '/img/default.jpg'}`"></div>
            <div>{{ item.albumName }}</div>
          </div>
          <div class="type-item" @click="handleType('/album')">
            <div class="clear-box">
              <div><mu-icon value="add"></mu-icon></div>
            </div>
          </div>
        </div>
      </div>
      <div class="type">
        <div class="type-title">
          <span>我的收藏</span>
          <div style="display: flex; align-items: center" @click="handleType('/favorite')">更多 <mu-icon value="keyboard_arrow_right"/></div>
        </div>
        <div class="type-box">
          <div class="type-item" v-for="item in favorites" :key="item.id" @click="$router.push(`/album/${item.id}`)">
            <div><img :src="`https://www.zsp.cool${item.img || '/img/default.jpg'}`"></div>
            <div>{{ item.albumName }}</div>
          </div>
          <div class="type-item" @click="handleType('/album')">
            <div class="clear-box">
              <div><mu-icon value="add"></mu-icon></div>
            </div>
          </div>
        </div>
      </div>
      <div class="type">
        <div class="type-title">
          <span>推荐</span>
          <div style="display: flex; align-items: center"  @click="handleType('/warehouse')">更多 <mu-icon value="keyboard_arrow_right"/></div>
        </div>
        <div class="type-box">
          <div class="type-item" v-for="item in recommends" :key="item.id" @click="$router.push(`/album/${item.id}`)">
            <div><img :src="`https://www.zsp.cool${item.img || '/img/default.jpg'}`"></div>
            <div>{{ item.albumName }}</div>
          </div>
        </div>
      </div>
      <div class="type">
        <div class="type-title">
          <span>最新</span>
          <div style="display: flex; align-items: center">更多 <mu-icon value="keyboard_arrow_right"/></div>
        </div>
        <div class="type-box">
          <div class="type-item" v-for="item in news" :key="item.id">
            <div><img :src="`https://www.zsp.cool${item.img || '/img/default.jpg'}`"></div>
            <div>{{ item.albumName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vant/lib/button/style'

export default {
  data () {
    return {
      myAlbum: [],
      favorites: [],
      recommends: [],
      news: []
    }
  },
  created () {
    this.$axios.get('/album-list').then((res) => {
      this.myAlbum = res.data
    })
    this.$axios.get(`/favoriteList/${this.$store.state.user.id}/album`).then(res => {
      this.favorites = res.data
    })
    this.$axios.get('/recommend/20').then(res => {
      this.recommends = res.data
    })
    this.$axios.get('/new/20').then(res => {
      this.news = res.data
    })
  },
  computed: {
    user () { // 从vuex获取用户信息
      return this.$store.state.user
    }
  },
  methods: {
    handleType (type) {
      this.$router.push(type)
    }
  }
}
</script>

<style lang="less" scoped>
  .clear-box {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    background: #e0e0e0;
    text-align: center;
    .material-icons {
      font-size: 40px;
      color: rgb(201, 201, 201);
    }
  }
  .home {
    background: #f5f5f5;
    padding: 20px 12px 70px 12px;
    min-height: 100%;
    text-align: left;
  }
  .user {
    position: relative;
    height: 100px;
    .info {
      margin-top: -20px;
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 700;
      span {
        margin-left: 10px;
      }
    }
  }
  .head {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .detail {
    padding: 10px 0;
    .follw {
      color: #626670;
    }
    .line {
      display: inline-block;
      height: 10px;
      width: 1px;
      margin: 0 4px;
      background: rgb(146, 146, 146);
    }
  }
  .menu {
    display: flex;
    justify-content: space-between;
    padding: 20px 8px;
  }
  .menu > div {
    // margin-right: 40px;
    text-align: center;
  }
  .type {
    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 16px;
        font-weight: 700;
      }
    }
    &-box {
      display: flex;
      width: calc(100vw - 12px);
      overflow: auto;
      img {
        width: 100px;
        height: 100px;
        border-radius: 8px;
      }
    }
    &-item {
      margin: 10px 10px 10px 0;
      text-align: center;
    }
  }
</style>
