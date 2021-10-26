
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Admin from '../components/core/Admin.vue'
import Administrators from '../views/Administrators.vue'
import Home from '../views/Home.vue'



Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/AdminPortal/' : '/',

  scrollBehavior() {
    return { x: 0, y: 0 }
  },

  routes: [
    {
      path: '/',
      name: 'login',
      breadcrumb: 'login',
      meta: { title: 'login' },
      component: Login,
    },
    {
      path: '/admin',
      component: Admin,
      text: 'Admin',
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '/Home',
          name: 'Home',
          component: Home,
          meta: {
            text: 'Home',
          },

        },
        {
          path: '/Administrators',
          name: 'Administrators',
          component: Administrators,
          meta: {
            text: 'Administrators',
          },

        },


      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  document.querySelector('body').classList.remove('full-page')

  // document.title = to.meta.title

  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (sessionStorage.getItem('token') === null) {
      document.title = 'login'
      next({ name: 'login' })
    } else {
      const activeRoles = []

      to.matched.forEach((route) => {
        if (route.meta.roles) {
          activeRoles.push(...route.meta.roles)
        }
      })

      if (to.meta.roles && to.meta.roles.length > 0) {
        if (activeRoles.includes(user.idRole)) {
          next()
        } else {
          if (to.name !== 'Home') {
            next({ name: 'Home' })
          }
        }
      } else {
        if (user.idRole === 'ROLE_MKT_EDITOR') {
          next({ name: 'content-manager' })
        } else if (user.idRole === 'ROLE_COM_METVIEW') {
          next({ name: 'metrics-list' })
        } else {
          next()
        }

        return
      }
    }

    if (to.name === 'admin' || to.name === 'login') {
      next({ name: 'Home' })
    }
  } else {
    next()
  }

  if (sessionStorage.getItem('token') !== null && to.name === 'login') {
    next({ name: 'Home' })
  }
})

export default router
