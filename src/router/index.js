import Vue from 'vue'
import VueRouter from 'vue-router'
const Home=()=>import('../views/Main')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home,
    name:'Home'
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
