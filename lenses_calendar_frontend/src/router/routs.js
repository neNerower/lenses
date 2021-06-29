export default [
    {
      path: '/auth/signin',
      name: 'SignIn',
      component: () => import('@/views/auth/SignIn')
    },
    {
      path: '/auth/signup',
      name: 'SignUp',
      component: () => import('@/views/auth/SignUp')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home')
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/views/errors/NotFound')
    }

  ]