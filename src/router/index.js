import Vue from 'vue'
import VueRouter from 'vue-router'
import BlogLandingPage from "@/components/BlogLandingPage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: BlogLandingPage
  },
  {
    path: '/login',
    name: 'Login',
    component: BlogLandingPage
  }
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

