<template>
  <div>
    <div v-show="false">
      <input id="file" value="file" type="file" @change="handlefiles" v-show="false" accept="audio/mp3" multiple/>
    </div>
    <mu-dialog width="360" :open.sync="showPercent">
      <div class="progress">
        <mu-circular-progress
          class="circular-progress"
          mode="determinate"
          :value="percent"
          :max="100"
          :min="0"
          :size="40"
          :stroke-width="2"
          color="#2c3e50">
        </mu-circular-progress>
        {{ percent }}%
      </div>
    </mu-dialog>
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
      default: '/upload-chunck'
    },
    fileName: { // formData表单，字段名称
      type: String,
      default: 'music'
    }
  },
  name: 'FileUpload',
  data () {
    return {
      showPercent: false,
      value: '',
      file: null,
      fileList: null,
      chunckList: []
    }
  },
  created () {
  },
  computed: {
    percent () {
      let p = 0
      if (this.chunckList.length) {
        p = this.chunckList.reduce((total, item) => {
          return total + item.percent
        }, 0)
        p = Math.ceil(p / this.chunckList.length)
      }
      return p
    }
  },
  methods: {
    chooseFile () {
      document.getElementById('file').click()
    },
    handlefiles (e) {
      this.showPercent = true
      window.createWorker()
      window.worker.onmessage = ({ data }) => {
        const promiseList = []
        this.chunckList.forEach((item, index) => {
          promiseList.push(new Promise((resolve, reject) => {
            this.$axios.post('/chunckAlready', { name: data.hash, hash: `${data.hash}-${index}` }).then(res => {
              if (res.data.already === false) {
                const formData = new FormData()
                formData.append('hash', `${data.hash}-${index}`)
                formData.append('name', `${data.hash}`)
                formData.append(this.fileName, item.file)
                this.$upload.post(this.baseUrl, formData, {
                  onUploadProgress: progressEvent => {
                    this.chunckList[index].percent = (progressEvent.loaded / progressEvent.total * 100 | 0)
                  }
                }).then(res => { resolve(res) })
              } else {
                this.chunckList[index].percent = 100
                resolve()
              }
            })
          }))
        })
        Promise.all(promiseList).then(() => {
          this.$axios.post('/merge', { hash: data.hash, fileName: `${data.hash}-${this.file.name}` }).then((res) => {
            this.$emit('finish', res.data)
            if (this.fileList.length) {
              this.file = this.fileList[0]
              this.chunckList = this.createChunkList(this.fileList.shift())
              window.worker.postMessage(this.chunckList)
            } else {
              this.showPercent = false
              this.$nextTick(() => {
                this.chunckList = []
                window.worker.terminate()
              })
            }
          })
        })
      }
      this.fileList = Array.from(e.target.files)
      this.file = this.fileList[0]
      this.chunckList = this.createChunkList(this.fileList.shift())
      window.worker.postMessage(this.chunckList)
    },
    createChunkList (file) {
      const fileChunkList = []
      const chunkSize = 1024 * 1024 * 40
      let cur = 0
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + chunkSize), percent: 0 })
        cur += chunkSize
      }
      return fileChunkList
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
  .circular-progress {
    transform:rotate(-90deg);
  }
  .progress {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>
