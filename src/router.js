import {createRouter,createWebHistory} from 'vue-router'

import Home from './views/home/Home.vue'
import Details from './views/details/Details.vue'
import Dashboard from './views/dashboard/Dashboard.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/details', component: Details },
  {path:'/dashboard',component:Dashboard}
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router; 
