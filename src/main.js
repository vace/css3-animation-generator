/*!
 * VueAnimation v0.0.1
 * (c) 2017-2017 Vace
 * Released under the MIT License.
 */

import 'iview/dist/styles/iview.css'
import './polyfill'

import Vue from 'vue'
import iView from 'iview'
import App from './App.vue'
import store from './store'
import shell from './shell'

Vue.use(iView)


export default new Vue({
  el:'#app',
  store,
  shell,
  render:h => h(App)
})