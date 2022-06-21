import { createRouter, createWebHistory } from 'vue-router'

import LoginRegisterView from '../views/LoginRegisterView.vue'
import HomeView from '../views/HomeView.vue'
import profilView from '../views/profilView'
const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta:  {
      title: "Groupomania | Accueil"
      
    },
    
     
  },
  {
    path: '/login',
    name: 'loginRegister',
    component: LoginRegisterView,
    
     
  },
  {
    path: '/profil',
    name: 'profil',
    component: profilView,
    meta:  {
      title: "Groupomania | Profil"
      
    },
    
     
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
})
export default router
