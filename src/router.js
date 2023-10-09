import {createRouter,createWebHistory} from 'vue-router'

import Home from './views/home/Home.vue'
import Details from './views/details/Details.vue'
import Dashboard from './views/dashboard/Dashboard.vue'
import Introduct from './views/introduct/Introduct.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/details/:id', component: Details },
  {path:'/dashboard',component:Dashboard},
  {path:'/introduct',component:Introduct}
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router; 
