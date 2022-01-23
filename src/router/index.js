import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/webrtc-test',
    name: 'WebrtcTest',
    component: () => import('@/views/WebrtcTest.vue')
  },
  {
    path: '/register',
    name: 'RegisterUsername',
    component: () => import('@/views/RegisterUsername.vue')
  },
  {
    path: '/conference/:id',
    name: 'Conference',
    component: () => import('@/views/Conference.vue')
  },
  {
    path: '/call',
    name: 'Call',
    component: () => import('@/views/Conference.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
