// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import 'vue2-animate/dist/vue2-animate.min.css'
import storeFile from './store/'
import axios from 'axios'
import Notify from 'vue2-notify'
import axiosData from "@/axiosData"
import 'vue-loaders/dist/vue-loaders.css';
import * as VueLoaders from 'vue-loaders'

Vue.use(VueLoaders);
Vue.use(Notify)
Vue.use(Vuex)

const store = new Vuex.Store(storeFile)

const axiosInstance = axios.create(axiosData)



Vue.prototype.$http = axiosInstance

Vue.config.productionTip = false

Vue.use(BootstrapVue);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
