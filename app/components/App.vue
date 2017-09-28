<template>
    <stack-layout>
        <label>Count: {{ count }}</label>
        <button @tap="count--">-1</button>
        <button @tap="logout()">Logout</button>
        <test-component style="margin-top: 40;"></test-component>
    </stack-layout>
</template>

<script>
  import TestComponent from './TestComponent.vue'

  export default {
    components: {
      TestComponent
    },
    data() {
      return {
        count: 10
      }
    },
    mounted() {
      console.log('APP ON CREATE')
      this.$root.$refs.page.nativeView.actionBarHidden = false
    },
    methods: {
      logout: function() {
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>

  label {
      text-align: center;
      font-size: 25;
  }

  Button {
      background-color: #00caab;
  }


</style>