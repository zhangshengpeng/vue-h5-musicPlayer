<template>
  <div class="page">
    <div class="top-bar">
      <div class="back" @click="$router.go(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </div>
      <div class="active">编辑歌单</div>
      <div class="option" @click="submit">
        保存
      </div>
    </div>
    <div class="form">
      <mu-form label-position="left">
        <mu-form-item label="标题">
          <mu-text-field v-model="form.albumName" ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="封面">
          <img-upload v-model="form.img" />
        </mu-form-item>
        <mu-form-item label="介绍">
          <mu-text-field v-model="form.intro" multi-line :rows="3"></mu-text-field>
        </mu-form-item>
      </mu-form>
    </div>
  </div>
</template>

<script>
import ImgUpload from '../../../components/uploadImg'
export default {
  components: { ImgUpload },
  data () {
    return {
      file: null,
      id: '',
      form: {
        albumName: '',
        intro: '',
        img: ''
      }
    }
  },
  mounted () {
    this.$axios.get(`/album/${this.$route.params.id}`).then(res => {
      this.form = res.data
    })
  },
  methods: {
    submit () {
      this.$axios.put(`/album-edit/${this.$route.params.id}`, this.form).then(res => {
        this.Notify({ type: 'success', message: `${res.data}` })
        this.$router.push(`/album/${this.$route.params.id}`)
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .mu-text-field-input {
  font-size: 14px;
  color: #2c3e50;
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
.form {
  padding: 60px 20px 0 20px;
}
.upload {
  width: 50px;
  height: 50px;
}
</style>
