<template>
  <stack-layout ref="initialContainer" class="initial-container" :visibility="visible?'visible':'collapse'">
    <label text="GROCERIES" class="initial-label"></label>
    <stack-layout @tap="login()" class="initial-button">
      <label text="Login" class="initial-button-label"></label>
    </stack-layout>
  </stack-layout>
</template>

<script>
export default {
  name: 'login-initial',
  props: {
    visible: Boolean
  },
  methods: {
    login: function() {
      this.$refs.initialContainer.nativeView.animate({
        opacity: 0,
        duration: 500
      }).then( () => {
        console.log('emitting login')
        this.$emit('login');
      })
    }
  }
}
</script>

<style>

.initial-container {
  margin-top: 250;
}

.initial-label {
  color: white;
  horizontal-align: center;
  margin-bottom: 80;
  font-size: 36;
  letter-spacing: 0.2;

  font-size: 40;
  letter-spacing: 0.2;
}

.initial-button {
  background-color: white;
  color: #CB1D00;
  height: 45;
  width: 275;
  vertical-align: center;
}

.initial-button-label {
  horizontal-align: center;
  font-weight: bold;
}

</style>
