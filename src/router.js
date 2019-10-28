import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './components/SignInSignUp/SignIn'
import SignUp from './components/SignInSignUp/SignUp'
import Home from './components/Home/home'
import Deliver from './components/Delivery/Delivery'
import Orders from './components/Orders/Order'
import config from './services/config'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [
    {
        path: '/',
        name: 'Home',
        component: SignIn
      },
      {
        path: '/signin',
        name: 'Home',
        component: SignIn
      },
      {
        path: '/signup',
        name: 'Home',
        component: SignUp
      },
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/deliver',
        name: 'Home',
        component: Deliver
      },
      {
        path: '/orders',
        name: 'Home',
        component: Orders
      },
    {
      path: '*',
      redirect: {
        name: "Home"
      }
    },
  ]
})
router.beforeEach((to, from, next) => {
  console.log(config.checkUser())
  if (to.fullPath === '/') {
    if (config.checkUser()) {
      next('/home');
    }
  }

  if (to.fullPath === '/signin') {
    if (config.checkUser()) {
      next('/home');
    }
  }

  if (to.fullPath === '/signup') {
    if (config.checkUser()) {
      next('/home');
    }
  }

  if (to.fullPath === '/home') {
    if (!config.checkUser()) {
      next('/');
    }
  }

  if (to.fullPath === '/orders') {
    if (!config.checkUser()) {
      next('/');
    }
  }

  if (to.fullPath === '/deliver') {
    if (!config.checkUser()) {
      next('/');
    }
  }
  

  next()


});

export default router