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
    path: '/Marca-form',
    name: 'Marca-form-new',
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
  },
  {
    path: '/carro-form/',
    name: 'carro-form-new',
    
    component: () => import('../views/CarrosFormView.vue')
  },
  {
    path: '/Cor',
    name: 'Cor',
    
    component: () => import('../views/CorView.vue')
  },
  {
    path: '/Cor-form/:id',
    name: 'cor-form',
    
    component: () => import('../views/CorFormView.vue')
  },
  {
    path: '/Cor-form/',
    name: 'cor-form-NEW',
    
    component: () => import('../views/CorFormView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
