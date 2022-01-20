import Vue from 'vue'
import Vuex from 'vuex'
import * as photo from './modules/photo'
import { login,logout,storeBlog } from './login.module';
Vue.use(Vuex)

export default new Vuex.Store({
modules: {
    photo,
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
