import Vue from 'vue'
import App from './App'
import router from './router'
import SocialSharing from 'vue-social-sharing'
import VueProgressBar from 'vue-progressbar'
import VueLocalStorage from 'vue-localstorage'
import VModal from 'vue-js-modal'
import {Tabs, Tab} from 'vue-tabs-component'

console.info('%c', 'line-height:48px;padding:18px 150px;background:url(\'https://lexmartinez.github.io/static/vue-snip-by.png\') center / contain no-repeat;')

Vue.use(SocialSharing)
Vue.use(VueLocalStorage)
Vue.use(VModal)
Vue.component('tabs', Tabs)
Vue.component('tab', Tab)
Vue.use(VueProgressBar, {
  color: '#26B9BF',
  failedColor: '#CA0303',
  thickness: '4px'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
