import Vue from 'vue'
import App from './App.vue'
import Schedule from 'vue-schedule'

Vue.use(Schedule)
new Vue({
  el: '#app',
  render: h => h(App)
})
