<template>
  <stack-layout ref="mainContainer" class="main-container" :visibility="visible?'visible':'collapse'">
    <label class="main-label" text="GROCERIES" :color="isLoggingIn? 'black' : 'white'"></label>

    <!-- form controls -->
    <grid-layout ref="formControls" class="form-controls" rows="auto, auto" translate-y="50">
      <text-field
        hint="Email Address"
        keyboard-type="email"
        return-key-type="next"
        @return-press="focusPassword()"
        v-model="user.email"
        :is-enabled="!isAuthenticating"
        autocorrect="false"
        autocapitalization-type="none"
        :class="{ light: !isLoggingIn}"
        row="0"></text-field>
      <text-field ref="password"
        hint="Password"
        secure="true"
        return-key-type="done"
        @return-press="submit()"
        v-model="user.password"
        :is-enabled="!isAuthenticating"
        :class="{ light: !isLoggingIn }"
        row="1"></text-field>

      <activity-indicator :busy="isAuthenticating" row-span="2"></activity-indicator>
    </grid-layout>

    <!-- login / sign up button -->
    <button
      :text="isLoggingIn ? 'Login' : 'Sign up'"
      :is-enabled="!isAuthenticating"
      class="submit-button"
      @tap="submit()"></button>

    <!-- forgot password button -->
    <label
      class="forgot-password-label"
      text="Forgot password?"
      @tap="forgotPassword()"
      :opacity="isLoggingIn ? 1 : 0"></label>

    <!-- forgot password button -->
    <stack-layout ref="signUpStack" class="sign-up-stack" @tap="toggleDisplay()" translate-y="50">
      <label :text="isLoggingIn ? 'Sign up here' : 'Back to login'"></label>
    </stack-layout>
  </stack-layout>
</template>

<script>
import { Animation } from 'ui/animation'
import { prompt } from "ui/dialogs"
import { Color } from 'tns-core-modules/color'
import { connectionType, getConnectionType } from 'tns-core-modules/connectivity'

import User from '@/models/User'
import LoginService from '@/services/LoginService'
import alert from '@/utils/alert'

const loginService = new LoginService()

export default {
  name: 'login-main',

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
      // when element turns visible, start animations
      if (val) {
        const animations = []

        animations.push({ target: this.$refs.mainContainer.nativeView, opacity: 1, duration: 500 })

        // Slide up the form controls and sign up container.
        animations.push({ target: this.$refs.signUpStack.nativeView, translate: { x: 0, y: 0 }, opacity: 1, delay: 500, duration: 150 })
        animations.push({ target: this.$refs.formControls.nativeView, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 })

        // Kick off the animation queue
        new Animation(animations, false).play()
      }
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
      console.log('submit', this.user)
      if (!this.user.isValidEmail()) {
        alert("Enter a valid email address.")
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
        alert("Groceries requires an internet connection to log in.")
        return;
      }

      return loginService
        .login(this.user)
        .then(() => {
          this.isAuthenticating = false;
          this.$router.push('/groceries')
        })
        .catch((error) => {
          console.error(error)
          alert("Unfortunately we could not find your account.")
          this.isAuthenticating = false;
        });
    },

    signUp() {
      if (getConnectionType() === connectionType.none) {
        alert("Groceries requires an internet connection to register.")
        return;
      }

      loginService
        .register(this.user)
        .then(() => {
          alert("Your account was successfully created.")
          this.isAuthenticating = false;
          this.toggleDisplay();
        })
        .catch(error => {
          // TODO: Verify if this works
          if (error.match(/same user/)) {
            alert("This email address is already in use.")
          } else {
            alert("Unfortunately we were unable to create your account.")
          }
          this.isAuthenticating = false;
        });
    },

    forgotPassword() {
      prompt({
        title: "Forgot Password",
        message: "Enter the email address you used to register for Groceries to reset your password.",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
      }).then((data) => {
        if (data.result) {
          this.isAuthenticating = true
          loginService
            .resetPassword(data.text.trim())
            .then(() => {
              this.isAuthenticating = false
              alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.")
            })
            .catch((error) => {
              this.isAuthenticating = false
              console.log('Error resetting password: ' + error)
              alert("Unfortunately, an error occurred resetting your password.");
            })
        }
      });
    }
  },

  mounted() {
    console.log('LoginOrSignup mounted')
  }
}
</script>

<style lang="scss">
.login {
  .main-container {
    height: 425;
    margin-left: 30;
    margin-right: 30;
    background-color: white;
  }

  .main-label {
    horizontal-align: center;
    color: black;
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
    margin-bottom: 10;

    &.light {
      color: #C4AFB4;
      placeholder-color: #C4AFB4;
    }
  }

  .submit-button {
    background-color: #CB1D00;
    color: white;
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

    label {
      width: 100%;
      color: white;
      horizontal-align: center;
      text-align: center;
      font-size: 15;
      height: 48;
    }
  }
}

.platform-ios .login {
  .main-container {
    width: 300;
  }

  .main-label {
    color: #311217;
    font-size: 32;
    margin-top: 45;
    margin-bottom: 52;
    letter-spacing: 0.2;
  }

  text-field {
    border-width: 1;
    border-color: #6E595C;
    margin-bottom: 20;

    &.light {
      border-color: #C4AFB4;
    }
  }

  .submit-button {
    height: 40;
  }
}

.platform-android .login {
  .main-container {
    width: 275;
    height: 394;
  }

  .main-label {
    font-size: 28;
    margin-top: 42;
    margin-bottom: 32;
    letter-spacing: 0.3;
  }

  .sign-up-stack label {
    margin-top: 15;
    text-transform: uppercase;
  }

  .forgot-password-label {
    font-size: 13;
    text-transform: uppercase;
  }
}

</style>
