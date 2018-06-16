import Vue from 'nativescript-vue';

import BackendService from './services/BackendService'
import Login from './components/Login/Login'
import Groceries from './components/Groceries/Groceries'

import store from './store';

import './styles';
const backendService = new BackendService()

// Uncommment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

new Vue({

  render: h => {
    console.log("BackendService:", backendService.isLoggedIn())
    return h(backendService.isLoggedIn() ? Groceries : Login)
  },

  store

}).$start();
