import Vue from 'vue'
import App from './App.vue'
// import './myServiceWorker'
import router from './router'
import store from './store'
import axios from './utils/request'
import upload from './utils/requestFile'
import ZToast from './components/ZToast/install'
import { Notify } from 'vant'

import 'muse-ui/lib/styles/base.less'
import 'muse-ui/lib/styles/theme.less'
import { Button, Select, Form, TextField, Paper, Snackbar, Icon, Progress, List, BottomSheet, Dialog, Slider } from 'muse-ui'
import Helpers from 'muse-ui/lib/Helpers'

const arr = [ZToast, Button, Select, Form, TextField, Paper, Snackbar, Icon, Helpers, Progress, List, BottomSheet, Dialog, Slider]
arr.forEach(comp => { Vue.use(comp) })

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$upload = upload
Vue.prototype.Notify = Notify

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
