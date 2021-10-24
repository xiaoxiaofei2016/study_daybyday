import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import '@/api/sdk/sdk';
import Vant, { Lazyload } from 'vant';
import 'vant/lib/index.css';
import './assets/css/index.less';
import * as dd from 'dingtalk-jsapi';

Vue.config.productionTip = false;
Vue.use(Vant);
Vue.use(Lazyload);

// 设置标题
router.afterEach((to) => {
  dd.ready(function () {
    dd.biz.navigation.setTitle({
      title: to.meta.title || '内聘系统'
    })
  })
})

const showConsole = process.env.NODE_ENV !== 'production'
if (showConsole) {
  const VConsole = require('vconsole')
  /* eslint-disable no-new */
  new VConsole()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
