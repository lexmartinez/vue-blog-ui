import Vue from 'vue'
import App from './App'
import router from './router'
import Pace from 'pace-progress'
import SocialSharing from 'vue-social-sharing'

Pace.start()
Pace.once('hide', () => {
  window.prerenderReady = true
})

console.info('%c', 'line-height:48px;padding:18px 150px;background:url(\'https://lexmartinez.github.io/static/vue-snip-by.png\') center / contain no-repeat;')

Vue.use(SocialSharing)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
