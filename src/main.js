import Vue from 'vue'
import App from './App.vue'
import VueFlashMessage from 'vue-flash-message';
import VTooltip from 'v-tooltip'

require('vue-flash-message/dist/vue-flash-message.min.css');

Vue.use(VTooltip);
Vue.use(VueFlashMessage);
new Vue({
  el: '#app',
  render: h => h(App)
})
