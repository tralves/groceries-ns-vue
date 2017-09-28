<template>
  <grid-layout>
    <!-- background -->
    <grid-layout ref="background" scaleX="1.4" scaleY="1.4" class="background" @loaded="startBackgroundAnimation()"></grid-layout>

    <!-- initial login button -->
    <login-initial ref="loginInitial" @login="showMainContent()" :visible="state === 'initial'"></login-initial>
    <login-main ref="loginMain" :visible="state === 'main'"></login-main>

    <!-- The fruit logo that appears within the container -->
    <absolute-layout marginTop="-250" ref="logoContainer" class="logo-container">
      <image translateY="0" src="res://logo_login" stretch="none"></image>
    </absolute-layout>

  </grid-layout>

</template>
<script>
import LoginInitial from './LoginInitial.vue'
import LoginMain from './LoginMain.vue'

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
        .animate({ translate: { x:0, y: -90 }, duration: 1000 })
        .then(() => {
          console.log('switching from ' + this.state + ' to main')
          this.state = 'main'
        })
    },
    startBackgroundAnimation: function() {
      console.log('starting bg animation!')
      this.$refs.background.nativeView.animate({
        scale: { x: 1.0, y: 1.0 },
        duration: 10000
      });
    }
  },
  mounted() {
    console.log('LOGIN mounted')
    this.$root.$refs.page.nativeView.actionBarHidden = true
  }
}
</script>

<style scoped>

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

</style>
