import Vue from 'nativescript-vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)

import * as platformModule from 'tns-core-modules/platform'
import BackendService from './services/BackendService'
import Groceries from './components/Groceries/Groceries.vue'
import Login from './components/Login/Login.vue'
import { setStatusBarColors } from './utils/statusBar'
import './app.css'

import storeConf from './store/store.js'

global.process = { env: { } } // hack! a build process should replace process.env's with static strings.
const backendService = new BackendService()
setStatusBarColors()

const store = new Vuex.Store(storeConf);

// Adding the vuex store to the main vue object does not work. See:
// https://github.com/rigor789/nativescript-vue/issues/46#issuecomment-331925815
Vue.prototype.$store = store

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login,
      meta: { hiddenActionBar: true }
    },
    {
      path: '/groceries',
      component: Groceries,
      meta: { requiresAuth: true }
    },
    { path: '*', redirect: '/login' }
  ]
})

new Vue({
  router,

  computed: {
    pageClasses: function () {
      return {
        // add top class so we can apply styles to specific platforms
        'platform-ios': platformModule.isIOS,
        'platform-android': platformModule.isAndroid
      }
    }
  },

  template: `
    <page ref="page" :class="pageClasses">
      <stack-layout>
        <router-view></router-view>
      </stack-layout>
    </page>
    `,

  methods: {
  },

  mounted() {
    console.log('MAIN ON MOUNTED')
    console.log(JSON.stringify(platformModule.isAndroid))
    this.$refs.page.nativeView.page.backgroundSpanUnderStatusBar = true
    this.$nextTick(() => {
      debugger;
      console.log('HEEEEERE!!!!!!!');
      this.$refs.page.nativeView.actionBarHidden = true
    })

    this.$router.beforeEach((to, from, next) => {
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
      router.replace('/groceries')
    }
    else {
      router.replace('/login')
    }

  }
}).$start()
