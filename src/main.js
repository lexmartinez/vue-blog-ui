import Vue from 'vue'
import App from './App'
import router from './router'
import SocialSharing from 'vue-social-sharing'
import VueProgressBar from 'vue-progressbar'
import VueLocalStorage from 'vue-localstorage'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'

console.info('%c', 'line-height:48px;padding:18px 150px;background:url(\'https://lexmartinez.github.io/static/vue-snip-by.png\') center / contain no-repeat;')

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://lexmartinez.github.io', // Your API domain
  providers: {
    github: {
      clientId: 'f1f1d33a1af35bf8e43b',
      url: '/admin',
      redirectUri: 'http://lexmartinez.github.io/admin/callback' // Your client app URL
    }
  }
})
Vue.use(SocialSharing)
Vue.use(VueLocalStorage)
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
