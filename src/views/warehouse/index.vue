<template>
  <div class="page">
    <div class="top-bar">
      <div class="back" @click="$router.push('/')">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </div>
      <div>曲库</div>
      <div class="option" @click="showBottom = !showBottom">
        <img src="../../assets/img/search.png">
      </div>
    </div>
    <div class="content">
      <div v-if="banners.length" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" style="width: 120px" v-for="banner in banners"  :key="banner">
            <div class="s-item">
              <img :src="`https://www.zsp.cool/${banner.img}`">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="s-list">
      <div v-for="album in albums" :key="album.id" @click="$router.push(`/album/${album.id}`)">
        <img :src="`https://www.zsp.cool/${album.img}`" alt="">
        <div class="s-name">{{ album.albumName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  directives: {
    swiper: directive
  },
  data () {
    return {
      name: '',
      banners: [],
      albums: [],
      swiperOption: {
        slidesPerView: 'auto',
        centeredSlides: true,
        watchSlidesProgress: true,
        loop: true,
        loopedSlides: 4,
        on: {
          progress: function (swiper, progress) {
            for (let i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i)
              var slideProgress = this.slides[i].progress
              let modify = 1
              if (Math.abs(slideProgress) > 1) {
                modify = (Math.abs(slideProgress) - 1) * 0.3 + 1
              }
              const translate = slideProgress * modify * 56 + 'px'
              const scale = 1 - Math.abs(slideProgress) / 5
              const zIndex = 999 - Math.abs(Math.round(10 * slideProgress))
              slide.transform('translateX(' + translate + ') scale(' + scale + ')')
              slide.css('zIndex', zIndex)
              slide.css('opacity', 1)
              if (Math.abs(slideProgress) > 3) {
                slide.css('opacity', 0)
              }
            }
          },
          setTransition: function (transition, s) {
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i)
              slide.transition(s)
            }
          },
          click: (s, e) => {
            let to = 'slidePrev'
            for (let i = 0; i < s.slides.length; i++) {
              var slideProgress = s.slides[i].progress
              const scale = 1 - Math.abs(slideProgress) / 5
              if (scale === 1) {
                if (e.target.currentSrc === s.slides[i].getElementsByTagName('img')[0].currentSrc) {
                  const id = this.albums.filter(a => encodeURI(a.img) === e.target.currentSrc.split('www.zsp.cool/')[1])[0].id
                  this.$router.push(`/album/${id}`)
                  return
                }
                to = 'slideNext'
              }
              if (scale === 0.8 && e.target.currentSrc === s.slides[i].getElementsByTagName('img')[0].currentSrc) {
                s[to]()
                return
              }
            }
          },
          slideChangeTransitionStart: (s) => {
            // const src = s.slides[s.activeIndex].getElementsByTagName('img')[0].currentSrc
            // const [n] = this.banners.filter(n => `https://www.zsp.cool/${n.img}` === src)
            // this.name = n.albumName
            // console.log(s.activeIndex)
          }
        }
      },
      acitveIndex: 0
    }
  },
  created () {
    this.$axios.get('/recommend/5').then(res => {
      this.banners = res.data
    })
    this.$axios.get('/new/30').then(res => {
      this.albums = res.data
    })
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .s-item {
    img {
      width: 120px;
      height: 120px;
      border-radius: 8px;
    }
  }
  .s-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 16px 10px;
    div {
      padding: 0 6px
    }
    img {
      width: calc((100vw - 56px) / 3);
      height: calc((100vw - 56px) / 3);
      border-radius: 8px;
    }
  }
  .s-name {
      width: calc((100vw - 56px) / 3);
      height: 24px;
      line-height: 24px;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  .content {
    padding-top: 54px;
    position: relative;
    width: 100vw;
    margin: 0 auto
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
    // box-shadow: 0 0 8px #e4e4e4;
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
    top: 12px;
    right: 16px;
    img {
      width: 20px;
      height: 20px;
    }
  }
</style>
