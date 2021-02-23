<template>
  <mu-snackbar position="top" :open="showTips" :color="type">
    <mu-icon left :value="icon"></mu-icon>
    {{ msg }}
    <!-- <mu-button flat slot="action" color="secondary">x</mu-button> -->
  </mu-snackbar>
</template>

<script>
export default {
  name: 'ZToast',
  data: () => ({
    showTips: false,
    msg: '',
    type: 'info',
    time: 2000,
    timer: null
  }),
  computed: {
    icon () {
      return {
        success: 'check_circle',
        info: 'info',
        warning: 'priority_high',
        error: 'warning'
      }[this.type]
    }
  },
  methods: {
    OnShow (options) {
      const { msg, type, time } = options
      this.msg = msg || ''
      this.type = type || 'info'
      this.time = time || 2000
      if (this.timer) {
        this.timer = clearTimeout(this.timer)
      }
      this.showTips = true
      this.timer = setTimeout(() => {
        this.showTips = false
      }, this.time)
    }
  }
}
</script>
