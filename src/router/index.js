import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name:'login',
      component: resolve=>require(['@/public/login'],resolve)
    },
    {
      path: '/',
      name: 'home',
      component: resolve=>require(['@/components/home'],resolve),
      redirect: 'control',
      children:[
        {
          path: '/control',
          name:'control',
          component: resolve=>require(['@/components/control'],resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/message',
          name:'message',
          component: resolve=>require(['@/components/message'],resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/admin',
          name:'admin',
          component: resolve=>require(['@/components/admin'],resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/authLog',
          name:'authLog',
          component: resolve=>require(['@/components/authLog'],resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/Character',
          name:'Character',
          component: resolve=>require(['@/components/Character'],resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/ruler',
          name:'ruler',
          component: resolve=>require(['@/components/ruler'],resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/person',
          name:'person',
          component: resolve=>require(['@/components/person'],resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/other',
          name:'other',
          component: resolve=>require(['@/components/other'],resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/setting',
          name:'setting',
          component: resolve=>require(['@/components/setting'],resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/shopping',
          component: resolve=>require(['@/components/shop/shopping'],resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/casCard',
          component: resolve => require(['@/public/casCard'],resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/fenlei',
          component: resolve => require(['@/components/fenlei'],resolve),
          meta:{
            requireAuth:true
          }
        }
      ]
    },

  ]
})
