import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/Marca',
    name: 'Marca',
    
    component: () => import('../views/MarcaView.vue')
  },
  {
    path: '/Marca-form/:id',
    name: 'Marca-form',
    
    component: () => import('../views/MarcaFormView.vue')
  },
  {
    path: '/Carro',
    name: 'Carro',
    
    component: () => import('../views/CarroView.vue')
  },
  {
    path: '/carro-form/:id',
    name: 'carro-form',
    
    component: () => import('../views/CarrosFormView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
