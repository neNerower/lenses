export default [
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/auth/SignIn')
  },
  {
    path: '/signup',
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
