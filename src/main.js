import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import store from './store'
// fastclick: 解决移动端点击延迟的问题
import 'common/js/pinyin_dict_firstletter'
import 'common/js/pinyinUtil'
import 'common/stylus/index.styl'
Vue.config.productionTip = false
fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png'),
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
