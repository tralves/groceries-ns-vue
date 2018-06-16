import Vue from 'vue';

import Login from './components/Login/Login';


import './styles';

// Uncommment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

new Vue({
  el: '#app',
  render: h => h(Login),
});
