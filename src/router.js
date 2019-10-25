import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './components/SignInSignUp/SignIn'
import SignUp from './components/SignInSignUp/SignUp'
import Home from './components/Home/home'

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
      path: '*',
      redirect: {
        name: "Home"
      }
    },
  ]
})
// router.beforeEach((to, from, next) => {
//   console.log(config.checkUser())
//   if (to.fullPath === '/success') {
//     if (config.checkUser()) {
//       next('/');
//     }
//   }
//   if (to.fullPath === '/Createproperty') {
//     if (!config.checkUser()) {
//       next('/');
//     }
//   }

//   if (to.fullPath === '/TenantProperties') {
//     if (config.checkUser()) {
//       next('/');
//     }
//   }

//   if (to.fullPath === '/LandlordProperties') {

//     if (!config.checkUser()) {
//       next('/');
//     }
//   }

//   if (to.fullPath === '/Favourite') {
//     if (config.checkUser()) {
//       next('/');
//     }
//   }

//   if (to.fullPath === '/PropertyHome') {
//     if (!config.checkUser()) {
//       next('/');
//     }
//   }

//   if (to.fullPath === '/saleproperty') {
//     if (!config.checkUser()) {
//       next('/');
//     }
//   }

//   if (to.fullPath === '/wantedproperty') {
//     if (!config.checkUser()) {
//       next('/');
//     }
//   }

  

//   if (to.fullPath === '/Contract') {
//     next('/');
//   }



//   if (to.fullPath === '/adminopen') {
//     next('/adminopen');
//   }


//   next()


// });

export default router