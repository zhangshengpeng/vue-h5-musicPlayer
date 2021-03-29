<template>
  <div class="page" style="text-align: left">
    <div class="top-bar" >
      <div class="back" @click="$router.go(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </div>
      <div style="font-weight: 600">浙江健康码</div>
      <div class="option" @click="showBottom = !showBottom">
        <mu-icon value="more_horiz"></mu-icon>
      </div>
    </div>
    <div class="bg-green"></div>
    <div class="main">
      <div class="clock">
        <div>{{month}}月{{day}}日</div>
        <div style="font-size: 56px">{{ time }}</div>
      </div>
      <div class="line"></div>
      <div class="title-bar">
        <div style="display: flex; align-items: center">
          <span style="font-size: 18px;font-weight:700">{{name}}</span>
          <div style="display: inline-blick" @click="isAllName = !isAllName">
            <span v-if="isAllName" class="op-font">隐藏</span>
            <span v-else class="op-font">显示</span>
          </div>
        </div>
        <div >
          <span class="op-font">修改</span>
          <div class="shu-line"></div>
          <span class="op-font">代办</span>
        </div>
      </div>
      <div style="display: inline-block;height: 48vw;border: solid 5px #47A45F;padding: 1px">
        <img id="code"/>
      </div>
      <div style="padding: 8px 0;font-size: 16px;color:rgb(42,108,60);font-weight: 700">杭州健康码</div>
      <div style="color:#47A45F;padding: 8px 20px;font-size: 15px;font-weight: 700">支持在杭医疗机构挂号、就诊及医保结算，直接出示扫码使用</div>
      <div style="font-size:14px;zoom:.9;padding: 20px 10px;">绿码: 凭此码可在浙江省范围内通行，请主动出示，配合检查;并做好自身防护工作，码颜色将根据您的申报由当地政府按照相关政策动态更新，出行前请仔细检查您的健康码</div>
      <div>
        <span class="op-font">网络申诉</span>
        <span class="shu-line"/>
        <span class="op-font">我去就医</span>
        <span class="shu-line"/>
        <span class="op-font">核酸报告</span>
        <span class="shu-line"/>
        <span class="op-font">核酸检测预约</span>
      </div>
    </div>
    <div class="button">健康应用</div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  data: () => ({
    month: '00',
    day: '00',
    time: '00',
    timer: '',
    // name: '王鹏',
    isAllName: true
  }),
  computed: {
    name () {
      return this.isAllName ? '王鹏' : '王*'
    }
  },
  mounted () {
    const d = new Date()
    this.day = d.getDate()
    this.month = d.getMonth() + 1
    const h = d.getHours() > 9 ? d.getHours() : `0${d.getHours()}`
    const m = d.getMinutes() > 9 ? d.getMinutes() : `0${d.getMinutes()}`
    const s = d.getSeconds() > 9 ? d.getSeconds() : `0${d.getSeconds()}`
    this.time = `${h}:${m}:${s}`

    this.$store.commit('setBottom', false)
    this.timer = setInterval(() => {
      const d = new Date()
      this.day = d.getDate()
      this.month = d.getMonth() + 1
      const h = d.getHours() > 9 ? d.getHours() : `0${d.getHours()}`
      const m = d.getMinutes() > 9 ? d.getMinutes() : `0${d.getMinutes()}`
      const s = d.getSeconds() > 9 ? d.getSeconds() : `0${d.getSeconds()}`
      this.time = `${h}:${m}:${s}`
    }, 1000)
    const img = document.getElementById('code')
    const opt = {
      margin: 1,
      color: {
        dark: '#47A45F',
        light: '#ffffff'
      }
    }
    const url = 'https://h5.dingtalk.com/healthAct/index.html?qrCode=V0dingce3a8ba106ba95e7f5bf40eda33b7ba0&stateCouncilBarCode=b07828d645c518b7ff8264fda90c0187&cityCode=&jk=2769AFE1B5993170C760E54CF2381937BA7B97EB37CC496E4F76A24F67A37598:0:E8BE98FEA952213559AE2BF3402A34EB:3300A0001APPA0051#/result'
    QRCode.toDataURL(url, opt).then((data) => {
      img.src = data
    })
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
  #code {
    width: 45vw;
    height: 45vw;
  }
  .op-font {
    display: inline-block;
    padding: 0 6px;
    color: rgb(68, 143, 247);
  }
  .title-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 6px;
    padding-bottom: 6px;
  }
  .clock {
    text-align: center;
    font-size: 50px;
    font-weight: 600;
    color: rgb(54, 64, 74);
  }
  .page {
    height: 100%;
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
    color: #000000;
    background: #ffffff;
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
  .bg-green {
    width: 100vw;
    height: 200px;
    background: rgb(81, 158, 77);
  }
  .button {
    position: fixed;
    bottom: 18px;
    left: 16px;
    width: calc(100vw - 32px);
    text-align: center;
    font-size: 700;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #ffffff;
    background: rgb(68, 143, 247);
    border-radius: 25px;
  }
  .main {
    margin-top: -140px;
    padding: 20px;
    width: calc(100vw - 32px);
    margin-left: 16px;
    height: calc(100vh - 140px);
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 4px #d6d6d6;
    text-align: center;
  }
  .line {
    width: 100%;
    height: 1px;
    background: #cecece;
    transform: scaleY(.7);
  }
  .shu-line {
    display: inline-block;
    height:10px;width:1px;
    background: #cecece;
    transform:scaleX(.8)
  }
</style>
