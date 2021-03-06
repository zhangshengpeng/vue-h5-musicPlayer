import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login')
  },
  {
    path: '/album',
    name: 'AlbumList',
    component: () => import('../views/albumList')
  },
  {
    path: '/album/:id',
    name: 'AlbumItem',
    component: () => import('../views/albumList/albumItem')
  },
  {
    path: '/album/edit/:id',
    name: 'albumEdit',
    component: () => import('../views/albumList/albumEdit')
  },
  {
    path: '/favorite',
    component: () => import('../views/favoriteList'),
    children: [
      {
        path: '/'
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/warehouse',
    name: 'warehouse',
    component: () => import('../views/warehouse/index.vue')
  },
  {
    path: '/personInfo',
    name: 'person',
    component: () => import('../views/personInfo.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue')
  }
  // {
  //   path: '/healthCode',
  //   name: 'healthCode',
  //   component: () => import('../views/healthCode.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // ...
  if (to.name === from.name) {
    next(false)
  } else {
    next()
  }
})

export default router
