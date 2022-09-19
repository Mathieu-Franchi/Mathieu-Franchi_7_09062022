import { createRouter, createWebHistory } from 'vue-router'

import NotFoundView from '../views/NotFoundView.vue'
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
    path: '/authentification',
    name: 'loginRegister',
    component: LoginRegisterView,
    meta: {
      title:"Groupomania | Authentification"
    }
     
  },
  {
    path: '/profil',
    name: 'profil',
    component: profilView,
    meta:  {
      title: "Groupomania | Profil"
      
    },
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: NotFoundView,
    meta:  {
      title: "Groupomania | 404 Not Found"
      
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
