<template>
  <div class="page" style="text-align: left">
    <div class="top-bar">
      <div class="back" @click="$router.go(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </div>
    </div>
    <div v-if="user.url" class="background" :style="{ background: `url(https://www.zsp.cool${user.url})`, backgroundSize: 'cover' }">
      <div class="shadow"></div>
      <div>
        <img :src="`https://www.zsp.cool${user.url}`">
      </div>
      <h2>{{ user.name }}</h2>
      <div>
        <span>5 关注</span>
        <span>2 粉丝</span>
      </div>
    </div>
    <div class="main">
      <h3>我的乐库</h3>
    </div>
    <div id="print">
      <div class="zsp">hello zsp</div>
    </div>
    <!-- <button @click="onPrint">打印</button> -->
  </div>
</template>

<script>

export default {
  data: () => ({
    user: {
      name: '千昭'
    }
  }),
  created () {
    if (this.$route.query.id === 'self') {
      this.user = this.$store.state.user
    }
    console.log(this.user)
  },
  methods: {
    onPrint () {
      let iframe = document.getElementById('print-iframe')
      iframe && document.body.removeChild(iframe)

      iframe = document.createElement('iframe')
      iframe.setAttribute('id', 'print-iframe')
      iframe.setAttribute('style', 'display; none')
      document.body.appendChild(iframe)

      const str = document.getElementById('print').innerHTML
      const doc = iframe.contentDocument
      doc.body.innerHTML = str

      const link = document.createElement('link')
      link.href = '/static/css/print.css'
      link.rel = 'stylesheet'
      link.type = 'text/css'
      link.media = 'print'
      doc.head.appendChild(link)
      link.onload = () => {
        console.log(doc)
        iframe.contentWindow.print()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .top-bar {
    position: fixed;
    width: 100vw;
    display: flex;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    padding: 10px;
    z-index: 100;
  }
  .back {
    position: absolute;
    top: 8px;
    left: 0;
    .material-icons {
      color: #ffffff;
      font-size: 30px;
    }
  }
  .active {
    font-weight: 700;
  }
  .background {
    width: 100vw;
    height: 360px;
    padding: 16px;
    position: relative;
    color: #ffffff;
    border-radius: 0 0 28px 28px;
    background-repeat:no-repeat;
    z-index: 1;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 150px 20px 0 0px;
    }
  }
  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 360px;
    opacity: .2;
    background: #636363;
    border-radius: 0 0 28px 28px;
    z-index: -1;
  }
  .main {
    padding: 0 16px;
  }
</style>
