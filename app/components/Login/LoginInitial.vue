<template>
  <StackLayout ref="initialContainer" class="initial-container" :visibility="visible?'visible':'collapse'">
    <Label text="GROCERIES" class="initial-label"></Label>
    <StackLayout @tap="login()" class="initial-button">
      <Label text="Login" class="initial-button-label"></Label>
    </StackLayout>
  </StackLayout>
</template>

<script>
export default {
  name: 'login-initial',
  props: {
    visible: Boolean
  },
  methods: {
    login: function() {
      // fadeout and notify parent element when finished
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

<style lang="scss">
// vue scoped styles are not working with this rollup config, and
// that's why we scope with this '.login' class
.login {
  .initial-container {
    margin-top: 250;
  }

  .initial-label {
    color: white;
    horizontal-align: center;
    margin-bottom: 80;
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
}

.platform-ios .login {
  .initial-label {
    font-size: 40;
    letter-spacing: 0.2;
  }
}

.platform-android .login {
  .initial-container {
    margin-top: 290;
  }

  .initial-label {
    font-size: 36;
    letter-spacing: 0.35;
  }
}

</style>
