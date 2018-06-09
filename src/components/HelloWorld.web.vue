<template>
  <div class="page">
    <div class="action-bar" title="Hello world">
    </div>

    <div class="hello-world">
      <span class="body">This is a hello world scomponent, tap the button if you dare</span>

      <button class="btn btn-primary" @click="surprise = !surprise">Tap me!</button>
      <img v-show="surprise" src="images/NativeScript-Vue.png"/>

    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        surprise: false,
        asdsd: 89
      };
    },
  };
</script>

<style scoped>
  .hello-world {
    margin: 20;
  }

  Label {
    color: red;
  }
</style>
