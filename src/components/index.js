import Vue from 'vue'
import VueNotifications from 'vue-notifications'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

function toast ({title, message, type, timeout, cb}) {
  if (type === VueNotifications.types.warn) type = 'warning'
  return iziToast[type]({title, message, timeout, theme: 'light', backgroundColor: 'rgba(256,256,256,0.7)', progressBarColor: '#0099AA'})
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)

export { default } from './Blog'
