import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/views/auth/SignIn'
import SignUp from '@/views/auth/SignUp'

import Main from '@/views/Main'

import NotFound from '@/views/errors/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/auth/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }

  ]
})
