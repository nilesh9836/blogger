import Vue from 'vue'
import Vuex from 'vuex'
import { login,logout,storeBlog } from './login.module';
Vue.use(Vuex)

export default new Vuex.Store({
modules: {
	login,
	logout,
    storeBlog
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
