<template>
<Page ref="page" :class="pageClasses" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
  <GridLayout class='login'>
    <!-- background -->
    <GridLayout ref="background" scaleX="1.4" scaleY="1.4" class="background" @loaded="startBackgroundAnimation()"></GridLayout>

    <!-- initial login button -->
    <LoginInitial ref="loginInitial" @login="showMainContent()" :visible="state === 'initial'"></LoginInitial>
    <LoginMain ref="loginMain" :visible="state === 'main'"></LoginMain>

    <!-- The fruit logo -->
    <AbsoluteLayout marginTop="-260" ref="logoContainer" class="logo-container">
      <Image translateY="0" src="res://logo_login" stretch="none"></Image>
    </AbsoluteLayout>

  </GridLayout>
</Page>
</template>
<script>
import * as platformModule from 'tns-core-modules/platform'
import LoginInitial from './LoginInitial.vue'
import LoginMain from './LoginMain.vue'
import * as enums from 'ui/enums'

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
  computed: {
    pageClasses: function () {
      return {
        // add top class so we can apply styles to specific platforms
        'platform-ios': platformModule.isIOS,
        'platform-android': platformModule.isAndroid
      }
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
