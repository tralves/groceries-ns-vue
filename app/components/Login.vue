<template>
  <stack-layout horizontal-alignment="center" class="m-b-20">
    <label style="text-align: center; color: #41b883; font-size: 30">Hi I'm Login2!</label>
    <button @tap="goToApp">Login</button>
  </stack-layout>
</template>
<script>
import TestComponent from './TestComponent.vue'

export default {
  components: {
  },
  methods: {
    goToApp: function() {
      this.$router.push('/app')
    }
  },
  mounted() {
    console.log('LOGIN ON CREATE')
  }
}
</script>
