import Vue from 'nativescript-vue';

import Login from './components/Login/Login';
import Groceries from './components/Groceries/Groceries';

import store from './store';

import './styles.scss';

// Uncommment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

new Vue({

  render: h => h(Login),

  store,

}).$start();
