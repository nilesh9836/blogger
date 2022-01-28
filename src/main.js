import Vue from 'vue'
import App from './App.vue'
import {router } from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import FlashMessage from '@smartweb/vue-flash-message';
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/compat/app";
//import { getAnalytics } from "firebase/compat/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBKqqwG_rqfo8ljn-y9RA2kOyNfFbh1bg",
  authDomain: "fir-65d55.firebaseapp.com",
  projectId: "fir-65d55",
  storageBucket: "fir-65d55.appspot.com",
  messagingSenderId: "456998568649",
  appId: "1:456998568649:web:01e20512034ecc5e590318",
  measurementId: "G-ZPD83DCJ0P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const analytics = firebase.getAnalytics(app)
const config = {
	name: 'flashMessage',
	tag: 'FlashMessage',
	time: 8000
};

Vue.use(FlashMessage, config);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

let db = firebase.firestore();
export default db;