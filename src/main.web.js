import Vue from 'vue';

import HelloWorld from './components/HelloWorld';


import './styles';

// Uncommment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

new Vue({
  el: '#app',
  render: h => h(HelloWorld),
});
