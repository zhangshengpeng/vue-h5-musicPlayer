<template>
  <div class="login-page">
    <mu-paper class="form-box">
      <mu-form :model="form" label-position="top" label-width="60">
        <mu-form-item prop="id" label="账号" :rules="rule.id">
          <mu-text-field v-model="form.id" ></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="password" label="密码" :rules="rule.password">
          <mu-text-field v-model="form.password"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submitLogin">登录</mu-button>
          <mu-button @click="sigin">注册</mu-button>
        </mu-form-item>
        <mu-form-item style="text-decoration: underline">
          忘记密码
        </mu-form-item>
      </mu-form>
    </mu-paper>
  </div>
</template>

<script>

export default {
  data: () => ({
    form: {
      id: '1',
      password: '1'
    },
    rule: {
      id: [
        { validate: val => !!val, message: '账号不能为空' },
        { validate: val => val.length >= 3, message: '账号长度不能小于3位' }
      ],
      password: [
        { validate: val => !!val, message: '密码不能为空' },
        { validate: val => val.length >= 3, message: '密码长度不能小于3位' }
      ]
    }
  }),
  mounted () {
    this.$store.commit('setBottom', false)
  },
  methods: {
    submitLogin () {
      this.$axios.post('login', this.form).then(res => {
        if (res.data.status === '1') {
          this.$Ztoast({
            msg: '登录成功',
            type: 'success'
          })
          this.$store.commit('setUser', res.data.userInfo)
          this.$router.push('/')
        }
      })
    },
    clear () {
      this.form = {
        id: '',
        password: ''
      }
    },
    sigin () {
      this.$Ztoast({
        msg: 'zzzzzzz',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .form-box {
    position: absolute;
    width: calc(100vw - 80px);
    top: 50%;
    left: 50%;
    margin-top: -30vh;
    margin-left: calc(( 80px - 100vw ) / 2);
    padding: 40px;
  }
  .login-page {
    width: 100vw;
    height: 100%;
    background-image: linear-gradient(to bottom right, rgb(32, 87, 170), rgb(128, 60, 168));
  }
</style>
