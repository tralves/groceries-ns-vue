import Vue from 'nativescript-vue'
// const VueRouter = require('vue-router')
import VueRouter from 'vue-router'
Vue.use(VueRouter)
global.process = { env: {} } // hack! a build process should replace process.env's with static strings.

import * as platformModule from "tns-core-modules/platform"
import BackendService from './services/BackendService'
import App from './components/App.vue'
import Login from './components/Login.vue'
// import './app.css'
import { setStatusBarColors } from './utils/statusBar'

const backendService = new BackendService()
setStatusBarColors()

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login,
      meta: { hidenActionBar: true }
    },
    {
      path: '/app',
      component: App,
      meta: { requiresAuth: true }
    },
    { path: '*', redirect: '/login' }
  ]
})

new Vue({
  router,
  data() {
    return {
      pageTitle: 'Current route2: /login',
      actionBarHidden: true
    }
  },

  computed: {
    pageClasses: function () {
      return {
        'hidden-action-bar': this.actionBarHidden,
        'platform-ios': platformModule.device.os === 'iOS',
        'platform-android': platformModule.device.os === 'Android'
      }
    }
  },

  template: `
    <page ref="page" :class="pageClasses">
      <action-bar :title="pageTitle"></action-bar>
      <stack-layout>
        <router-view></router-view>
      </stack-layout>
    </page>
    `,

  methods: {
  },

  mounted() {
    console.log('MAIN ON MOUNTED')
    console.log(JSON.stringify(platformModule.device))
    this.actionBarHidden = true
    this.$refs.page.nativeView.page.backgroundSpanUnderStatusBar = this.actionBarHidden
    this.$nextTick(() => {
      this.$refs.page.nativeView.actionBarHidden = this.actionBarHidden
    })

    this.$router.beforeEach((to, from, next) => {
      // show/hide action bar accordingly
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!backendService.isLoggedIn()) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } else {
        next()
      }
    })

    // force first redirect
    if (backendService.isLoggedIn()) {
      router.replace('/app')
    }
    else {
      router.replace('/login')
    }

  }
}).$start()
