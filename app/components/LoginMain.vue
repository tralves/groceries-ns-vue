<template>
  <stack-layout ref="mainContainer" class="main-container" :visibility="visible?'visible':'collapse'">
    <label class="main-label" text="GROCERIES" :color="isLoggingIn? 'black' : 'white'"></label>

    <grid-layout ref="formControls" class="form-controls" rows="auto, auto" translateY="50">
      <text-field
        hint="Email Address"
        keyboardType="email"
        returnKeyType="next"
        @returnPress="focusPassword()"
        v-model="user.email"
        :isEnabled="!isAuthenticating"
        autocorrect="false"
        autocapitalizationType="none"
        :class="{ light: !isLoggingIn}"
        row="0"></text-field>
      <text-field ref="password"
        hint="Password"
        secure="true"
        returnKeyType="done"
        @returnPress="submit()"
        v-model="user.password"
        :isEnabled="!isAuthenticating"
        :class="{ light: !isLoggingIn}"
        row="1"></text-field>

      <activity-indicator :busy="isAuthenticating" rowSpan="2"></activity-indicator>
    </grid-layout>

    <button
      :text="isLoggingIn ? 'Login' : 'Sign up'"
      :isEnabled="!isAuthenticating"
      class="submit-button"
      @tap="submit()"></button>

    <label
      class="forgot-password-label"
      text="Forgot password?"
      @tap="forgotPassword()"
      :opacity="isLoggingIn ? 1 : 0"></label>

    <stack-layout ref="signUpStack" class="sign-up-stack" @tap="toggleDisplay()" translateY="50">
      <label :text="isLoggingIn ? 'Sign up here' : 'Back to login'"></label>
    </stack-layout>
  </stack-layout>
</template>

<script>
import { Animation } from 'ui/animation'
import { Color } from 'color'
import { connectionType, getConnectionType } from "connectivity";

import User from '../models/User'
import alert from '../utils/alert'

export default {
  name: 'login-main',
  components: {
  },
  props: {
    visible: Boolean
  },
  data() {
    return {
      isLoggingIn: true,
      isAuthenticating: false,
      user: new User()
    }
  },
  watch: {
    visible: function(val) {
      console.log('visible changed to  ' + val)
      let animations = []

      animations.push({ target: this.$refs.mainContainer.nativeView, opacity: 1, duration: 500 });

      // Slide up the form controls and sign up container.
      animations.push({ target: this.$refs.signUpStack.nativeView, translate: { x: 0, y: 0 }, opacity: 1, delay: 500, duration: 150 });
      animations.push({ target: this.$refs.formControls.nativeView, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 });

      // Kick off the animation queue
      new Animation(animations, false).play();
    }
  },
  methods: {
    toggleDisplay() {
      this.isLoggingIn = !this.isLoggingIn;
      let mainContainer = this.$refs.mainContainer.nativeView
      mainContainer.animate({
          backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
          duration: 200
      });
    },
    focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    submit() {
      console.log(this.user)
      if (!this.user.isValidEmail()) {
        alert("Enter a valid email address.");
        return;
      }

      this.isAuthenticating = true;
      if (this.isLoggingIn) {
        this.login();
      } else {
        this.signUp();
      }
    },
    login() {
      if (getConnectionType() === connectionType.none) {
        alert("Groceries requires an internet connection to log in.");
        return;
      }

      this.userService.login(this.user)
        .subscribe(
          () => {
            this.isAuthenticating = false;
            this.$router.push('/app')
          },
          (error) => {
            alert("Unfortunately we could not find your account.");
            this.isAuthenticating = false;
          });
    }
  },
  mounted() {
    console.log('LoginOrSignup mounted')
  }
}
</script>

<style scoped>

.main-container {
  margin-left: 30;
  margin-right: 30;
  background-color: white;
  opacity: 0;

  height: 425;
  width: 300;
}

.main-label {
  horizontal-align: center;
  color: black;

  color: #311217;
  font-size: 32;
  margin-top: 45;
  margin-bottom: 52;
  letter-spacing: 0.2;
}

/* Hide a bunch of things to setup the initial animations */
.form-controls,
.sign-up-stack {
  opacity: 0;
}

image {
  margin-top: 5;
  margin-bottom: 20;
}

button,
text-field {
  margin-left: 16;
  margin-right: 16;
  margin-bottom: 10;
}

text-field {
  color: black;
  placeholder-color: #ACA6A7;

  border-width: 1;
  border-color: #6E595C;
  margin-bottom: 20;
}

text-field.light {
  color: #C4AFB4;
  placeholder-color: #C4AFB4;

  border-color: #C4AFB4;
}

.submit-button {
  background-color: #CB1D00;
  color: white;

  height: 40;
  margin-top: 15;
}

.forgot-password-label {
  font-size: 13;
  margin-left: 20;
  margin-bottom: 45;
  color: black;
}

.sign-up-stack {
  background-color: #311217;
}

.sign-up-stack Label {
  color: white;
  horizontal-align: center;
  font-size: 15;

  height: 48;
}
</style>
