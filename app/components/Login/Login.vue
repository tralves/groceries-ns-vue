<template>
  <grid-layout class='login'>
    <!-- background -->
    <grid-layout ref="background" scale-X="1.4" scale-Y="1.4" class="background" @loaded="startBackgroundAnimation()"></grid-layout>

    <!-- initial login button -->
    <login-initial ref="loginInitial" @login="showMainContent()" :visible="state === 'initial'"></login-initial>
    <login-main ref="loginMain" :visible="state === 'main'"></login-main>

    <!-- The fruit logo -->
    <absolute-layout margin-top="-260" ref="logoContainer" class="logo-container">
      <image translate-y="0" src="res://logo_login" stretch="none"></image>
    </absolute-layout>

  </grid-layout>
</template>
<script>
import * as platformModule from 'tns-core-modules/platform'
import LoginInitial from './LoginInitial.vue'
import LoginMain from './LoginMain.vue'
import enums from 'ui/enums'

export default {
  components: {
    LoginInitial,
    LoginMain
  },
  data() {
    return {
      state: 'initial'
    }
  },
  methods: {
    showMainContent: function() {
      console.log('showMainContent')
      this.$refs.logoContainer.nativeView
        .animate({
          translate: { x: 0, y: platformModule.isAndroid ? -70 : -90 },
          duration: 500,
          curve: enums.AnimationCurve.easeIn })
        .then(() => {
          console.log('switching from ' + this.state + ' to main')
          this.state = 'main'
        })
    },

    startBackgroundAnimation: function() {
      console.log('starting bg animation...')
      this.$refs.background.nativeView.animate({
        scale: { x: 1.0, y: 1.0 },
        duration: 10000
      });
    }
  },
  mounted() {
    console.log('LOGIN mounted')
  }
}
</script>

<style lang="scss">
.login {
  .background {
    background-image: url('res://bg_login');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .logo-container {
    horizontal-align: center;
    height: 80;
  }
}
</style>
