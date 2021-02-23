import ZToast from './index.vue'

ZToast.install = function (Vue) {
  const Toast = Vue.extend(ZToast)
  const t = new Toast()
  ZToast.t = t
  t.$mount(document.createElement('div'))
  document.body.appendChild(t.$el)
  Vue.prototype.$Ztoast = (data) => {
    t.OnShow(data)
  }
}

export default ZToast
