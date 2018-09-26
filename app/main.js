import Vue from 'nativescript-vue';

import BackendService from './services/BackendService'
import Login from './components/Login/Login'
import Groceries from './components/Groceries/Groceries'
import VueDevtools from 'nativescript-vue-devtools'

import store from './store';

import './styles.scss';
const backendService = new BackendService()

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === 'production'

new Vue({

  render: h => {
    console.log("BackendService:", backendService.isLoggedIn())
    return h('frame', [h(backendService.isLoggedIn() ? Groceries : Login)])
  },

  store

}).$start();
