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
    path: '/lenses',
    name: 'LensList',
    component: () => import('@/views/lists/LensList')
  },
  {
    path: '/lenses/:id',
    name: 'LensCard',
    component: () => import('@/views/models/LensCard')
  },
  {
    path: '/manufacturers',
    name: 'ManufacturerList',
    component: () => import('@/views/lists/ManufacturerList')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/errors/NotFound')
  }

]
