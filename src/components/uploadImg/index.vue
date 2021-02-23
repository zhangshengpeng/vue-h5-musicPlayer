<template>
  <div>
    <div class="box preview" v-if="value" @click="chooseFile">
      <img :src="`https://www.zsp.cool${value}`" alt="">
    </div>
    <div class="box upload" v-else @click="chooseFile">
      <mu-icon value="add"></mu-icon>
    </div>
    <input id="file" value="file" type="file" @change="handlefiles($event)" v-show="false" accept="image/*" />
    <div class="cut"></div>
  </div>
</template>

<script>
export default {
  props: {
    size: { // 大小
      type: String,
      default: '80px'
    },
    isHead: { // 样式是否为头像
      type: Boolean,
      default: false
    },
    baseUrl: { // 上传地址
      type: String,
      default: '/img'
    },
    fileName: { // formData表单，字段名称
      type: String,
      default: 'img'
    }
  },
  name: 'ImgUpload',
  data () {
    return {
      value: '',
      file: ''
    }
  },
  methods: {
    chooseFile () {
      document.getElementById('file').click()
    },
    handlefiles (e) {
      this.file = e.target.files[0]
      const formData = new FormData()
      formData.append(this.fileName, this.file)
      this.$axios.post(this.baseUrl, formData).then(res => {
        this.value = res.data.imgUrl
        this.$emit('input', this.value)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .box {
    width: 60px;
    height: 60px;
    border-radius: 10px;
  }
  .upload {
    border: 1px solid #969696;
    padding: 15px;
    .material-icons {
      font-size: 30px;
    }
  }
  .preview {
    img {
      width: 60px;
      height: 60px;
      border-radius: 8px;
    }
  }
</style>
