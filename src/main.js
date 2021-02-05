import Vue from 'vue'
import App from './App.vue'

import VueHotkey from 'v-hotkey'
Vue.use(VueHotkey)

import Vuex from 'vuex'
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
