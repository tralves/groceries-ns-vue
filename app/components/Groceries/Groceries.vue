<template>
  <grid-layout ref='container' rows="auto, auto, *" class="list-page">
    <!-- Row 1: The custom action bar -->
    <grid-layout row="0" columns="44, *, auto" class="action-bar-custom">
      <label col="1" text="Groceries"></label>

      <!-- Wrap the image in a stack-layout to give it a bigger tap target -->
      <stack-layout col="2" @tap="showMenu()" class='menu-button-container'>
        <image src="res://menu" stretch="none"></image>
      </stack-layout>
    </grid-layout>

    <!-- Row 2: The text field to add groceries, and recent button -->
    <grid-layout row="1" columns="auto, *, auto" class="add-bar"
      :backgroundColor="isShowingRecent ? '#BBC169' : '#CB1D00'" >
      <stack-layout col="0" class="add-bar-image-container"  @tap="add('button')" orientation="vertical">
        <image :src="isShowingRecent ? 'res://recent' : 'res://add'"></image>
      </stack-layout>
      <text-field ref='groceryTextField' col="1" v-model="grocery"
        @loaded="handleAndroidFocus()"
        :hint="isAndroid ? 'ADD A GROCERY' : 'Add a grocery'"
        returnKeyType="done" v-if="!isShowingRecent" @returnPress="add('textfield')"></text-field>
      <label col="1" text="Recent items" v-if="isShowingRecent" class="add-bar-recent-label"></label>
      <stack-layout col="2" class="add-bar-recent-container" @tap="toggleRecent()">
        <label class="add-bar-recent-toggle" :text="isShowingRecent ? 'Done' : 'Recent'"></label>
      </stack-layout>
    </grid-layout>

    <!-- Row 3: The grocery list -->
    <!-- <gr-grocery-list row="2"
      @loading="showActivityIndicator()"
      @loaded="hideActivityIndicator()"
      :showDeleted="isShowingRecent"></gr-grocery-list> -->

    <activity-indicator :busy="isLoading" row="2"></activity-indicator>

  </grid-layout>

</template>

<script>
import * as platformModule from 'tns-core-modules/platform'
import { action } from 'ui/dialogs'
import * as SocialShare from 'nativescript-social-share'
import LoginService from '/services/LoginService'

const loginService = new LoginService()

export default {
  components: {
  },
  data() {
    return {
      isShowingRecent: false,
      isLoading: false,
      isAndroid: platformModule.isAndroid,
      grocery: "",
      store: {
        items: []
      }
    }
  },
  mounted() {
    console.log('APP ON CREATE')
  },
  methods: {
      // Prevent the first textfield from receiving focus on Android
    // See http://stackoverflow.com/questions/5056734/android-force-edittext-to-remove-focus
    handleAndroidFocus() {
      const textField = this.$refs.groceryTextField
      const container = this.$refs.container
      if (container.android) {
        container.android.setFocusableInTouchMode(true);
        container.android.setFocusable(true);
        textField.android.clearFocus();
      }
    },
    showMenu() {
      action({
        message: "What would you like to do?",
        actions: ["Share", "Log Off"],
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result === "Share") {
          this.share();
        } else if (result === "Log Off") {
          this.logout();
        }
      });
    },
    logout: function() {
      loginService.logout()
      this.$router.push('/login')
    },
    share() {
      const items = this.store.items
      let list = []
      for (let i = 0, size = items.length; i < size; i++) {
        list.push(items[i].name)
      }
      SocialShare.shareText("Groceries list:" + list.join(", ").trim())
    }
  }
}
</script>

<style lang="scss">
.list-page {
  background-image: url("res://bg_inner");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .action-bar-custom {
    color: white;
    margin-top: 20;
    padding-top: 12;

    label {
      font-size: 21;
      font-weight: bold;
    }
    stack-layout {
      height: 40;
      padding-left: 15;
      padding-right: 15;
      vertical-align: center;
      horizontal-align: center;
    }
  }

  .add-bar {
    background-color: #CB1D00;
    padding-left: 16;
    padding-right: 16;
    height: 50;
    text-field {
      height: 20;
    }
  }

  .add-bar-image-container {
    height: 50;
    vertical-align: center;
    margin-left: -15;
    padding-left: 15;
    padding-right: 13;
    image {
      height: 20;
    }
  }

  text-field {
    color: white;
    placeholder-color: white;
    background-color: transparent;
    font-size: 15;
    border-width: 0;
    padding: 0;
    margin-left: 1;
  }

  .add-bar-recent-label {
    vertical-align: center;
    color: #311217;
  }

  .add-bar-recent-container {
    height: 50;
    padding-left: 10;
    padding-right: 10;
    margin-right: -10;
    vertical-align: center;
  }

  .add-bar-recent-toggle {
    color: #311217;
  }

  activity-indicator {
    horizontal-align: center;
    vertical-align: center;
  }
}
</style>