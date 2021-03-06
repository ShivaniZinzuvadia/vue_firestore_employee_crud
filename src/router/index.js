import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import {auth} from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path:'*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/EmployeeList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import('../components/EmployeeCreate.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import('../components/EmployeeEdit.vue'),
    meta: {
      requiresAuth: true
    }
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(requiresAuth && !currentUser) next('login');
  else if(!requiresAuth && currentUser) next('home');
  else next();
})

export default router
