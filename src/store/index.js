import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/request'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    showBottom: false,
    song: {},
    songList: [],
    status: false,
    isReady: true,
    now: 0,
    max: 100,
    index: 0,
    isFavorite: false,
    favoriteId: ''
  },
  mutations: {
    setIsReady (state, isReady) {
      state.isReady = isReady
    },
    setMax (state, max) {
      state.max = max
    },
    setStatus (state, status) {
      state.status = status
    },
    setNow (state, now) {
      state.now = now
    },
    setIndex (state, index) {
      state.index = index
      state.status = false
      this.commit('setSong')
      this.commit('setNow', 0)
      this.commit('setMax', 0)
      this.commit('setLocalSong', state.songList[state.index])
      this.dispatch('getSongInfo')
      this.dispatch('getIsFavorite', 'song')
      localStorage.setItem('index', index)
    },
    setUser (state, user) {
      state.user = user
    },
    setBottom (state, flag) {
      state.showBottom = flag
    },
    setSongInfo (state, data) { // 切换歌单
      if (!data) { data = { songList: [{ artist: 'elijah who', id: 527, name: 'elijah who - so far away.mp3', title: 'so far away' }] } }
      state.songList = data.songList
      this.commit('setLocalData', {
        songList: data.songList
      })
    },
    setSong (state, song = state.songList[state.index]) { // 切换正在播放歌曲
      state.song = song
    },
    next (state) {
      const index = state.index === state.songList.length - 1 ? 0 : state.index + 1
      this.commit('setIndex', index)
    },
    prev (state) {
      const index = state.index === 0 ? state.songList.length - 1 : state.index - 1
      this.commit('setIndex', index)
    },
    setLocalData (state, data) { // 设置当前歌曲和列表
      localStorage.setItem('songInfo', JSON.stringify(data))
    },
    setLocalSong (state, data) { // 设置当前歌曲和列表
      localStorage.setItem('songInfo', JSON.stringify({
        song: data,
        songList: state.songList
      }))
    },
    setFavorite (state, isFavorite) {
      state.isFavorite = isFavorite
    },
    setFavoriteId (state, id) {
      state.favoriteId = id
    }
  },
  actions: {
    getUser (ctx) { // 获取当前用户信息
      axios.get('/user-info').then(res => {
        ctx.commit('setUser', res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
      })
    },
    getSongInfo (ctx) { // 获取当前歌曲信息
      axios.get(`/musicImg/${ctx.state.songList[ctx.state.index].id}`).then(res => {
        ctx.commit('setSong', res.data)
      })
    },
    setIsFavtite (ctx, isFavorite) { // 收藏/取消收藏
      if (isFavorite) {
        axios.post('/favorite', {
          songId: ctx.state.song.id,
          userId: ctx.state.user.id,
          type: 'song',
          albumId: ''
        }).then(() => {
          ctx.dispatch('getIsFavorite', 'song')
        })
      } else {
        axios.delete(`/favorite/${ctx.state.favoriteId}`).then(() => {
          ctx.dispatch('getIsFavorite', 'song')
        })
      }
    },
    getIsFavorite (ctx, type) { // 获取是否已收藏当前歌曲
      axios.get(`/favorite/${type}/${ctx.state.user.id}/${ctx.state.song.id}`).then(res => {
        if (res.data.data) {
          ctx.commit('setFavoriteId', res.data.data.id)
          ctx.commit('setFavorite', true)
        } else {
          ctx.commit('setFavorite', false)
        }
      })
    }
  },
  modules: {
  }
})
