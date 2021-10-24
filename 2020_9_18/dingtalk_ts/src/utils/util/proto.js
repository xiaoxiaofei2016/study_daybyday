export default {
  install: (Vue) => {
    Vue.prototype.$_info_alert = function ({ title, content, className }) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$dialog.alert({
          title: title,
          message: content,
          confirmButtonText: '确定',
          className: className
        }).then((action) => {
          if (action === 'confirm') resolve()
          else reject(action)
        }).catch()
      })
    }
    Vue.prototype.$_confirm_alert = function ({ title, content, className, cancelText, confirmText }) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$dialog.alert({
          title: title,
          message: content,
          cancelButtonText: cancelText,
          confirmButtonText: confirmText,
          className: className,
          showCancelButton: true,
          confirmButtonColor: '#1ea4ff',
          cancelButtonColor: '#919199'
        }).then((action) => {
          if (action === 'confirm') resolve()
          else reject(action)
        }).catch()
      })
    }
    Vue.prototype.$goto = function (path) {
      this.$router.push({ path: path })
    }
  }
}
