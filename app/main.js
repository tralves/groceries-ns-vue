import Vue from 'nativescript-vue'
// const VueRouter = require('vue-router')
import VueRouter from 'vue-router'
Vue.use(VueRouter)
global.process = { env: {} } // hack! a build process should replace process.env's with static strings.

import App from './components/App.vue'
import Login from './components/Login.vue'
import './app.css'
import { setStatusBarColors } from './utils/statusBar'

setStatusBarColors()

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/app',
      component: App
    },
    { path: '*', redirect: '/login' }
  ]
})

router.replace('/login')

new Vue({
  router,

  data: {
    pageTitle: 'Current route2: /login'
  },

  template: `
    <page ref="page">
      <action-bar :title="pageTitle"></action-bar>
      <stack-layout>
        <router-view></router-view>
      </stack-layout>
    </page>
    `,

  methods: {
    changeRoute(to) {
      this.pageTitle = 'Current route: ' + to
      router.replace(to)
    }
  },
  mounted() {
    console.log('MAIN ON MOUNTED')
    this.$root.$refs.page.nativeView.page.backgroundSpanUnderStatusBar = true;
    this.$nextTick(() => {
      this.$refs.page.nativeView.actionBarHidden = true
    })
  }
}).$start()
