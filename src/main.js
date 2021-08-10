// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



//引入echarts组件
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//引入element组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import '../static/css/public.css'



//引入post方法
import {post,dele,get} from './axios/axios.js'

Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$dele = dele

Vue.config.productionTip = false

import baseUrl from '@/axios/api.js'
Vue.prototype.GLOBAL = baseUrl

import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

var name = localStorage.getItem('name')
if(name){
  Vue.prototype.$name = name
}



router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth){
      if(name){

        next()
      }else{
        next({
          path: '/login'
        })
      }
  }else{
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
