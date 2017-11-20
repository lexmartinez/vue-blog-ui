import Vue from 'vue'
import App from './App'
import router from './router'
import Pace from 'pace-progress'

Pace.start()
Pace.once('hide', () => {
  window.prerenderReady = true
})

console.info('%c', 'line-height:48px;padding:18px 150px;background:url(\'https://nerdist.com/wp-content/uploads/2017/04/deadpool-2-featured-image-04222017-322x268.jpg\') center / contain no-repeat;')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
