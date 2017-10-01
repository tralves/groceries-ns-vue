<template>
  <grid-layout ref='container' rows="auto, auto, *" class="list-page" @loaded="load()">
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
      <label col="1" text="Recent items" v-if="isShowingRecent" class="add-bar-recent-label"></label>
      <text-field ref='groceryTextField' col="1" v-model="grocery"
        @loaded="handleAndroidFocus()"
        :hint="isAndroid ? 'ADD A GROCERY' : 'Add a grocery'"
        returnKeyType="done" v-else @returnPress="add('textfield')"></text-field>

      <stack-layout col="2" class="add-bar-recent-container" @tap="toggleRecent()">
        <label class="add-bar-recent-toggle" :text="isShowingRecent ? 'Done' : 'Recent'"></label>
      </stack-layout>
    </grid-layout>

    <!-- Row 3: The grocery list -->
    <grocery-list :row="2"
      @loaded="hideActivityIndicator()"
      :listLoaded="listLoaded"
      :showDeleted="isShowingRecent"
      :items="items"></grocery-list>

    <activity-indicator :busy="isLoading" row="2"></activity-indicator>

  </grid-layout>

</template>

<script>
import * as platformModule from 'tns-core-modules/platform'
import { action } from 'ui/dialogs'
import * as SocialShare from 'nativescript-social-share'
import LoginService from '/services/LoginService'
import GroceryList from './GroceryList.vue'
import alert from '/utils/alert'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

const loginService = new LoginService()

export default {
  components: {
    GroceryList
  },
  data() {
    return {
      isShowingRecent: false,
      isLoading: false,
      isAndroid: platformModule.isAndroid,
      grocery: "",
      listLoaded: false
    }
  },
  computed: {
    ...mapGetters({
      items: 'itemList'
    })
  },
  mounted() {
    console.log('APP ON CREATE')
  },
  methods: {
    ...mapActions([
      'loadItems',
      'addItem'
    ]),
    load() {
      this
        .loadItems()
        .then(() => {
          this.listLoaded = true
        })
        .catch(error => {
          console.error(error)
          alert("An error occurred loading your grocery list.");
        })
    },
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

    showActivityIndicator() { this.isLoading = true; },
    hideActivityIndicator() { this.isLoading = false; },

    add(target) {
      // If showing recent groceries the add button should do nothing.
      if (this.isShowingRecent) {
        return
      }

      const textField = this.$refs.groceryTextField.nativeView

      if (this.grocery.trim() === '') {
        // If the user clicked the add button, and the textfield is empty,
        // focus the text field and return.
        if (target === 'button') {
            textField.focus();
          } else {
            // If the user clicked return with an empty text field show an error.
            alert('Enter a grocery item');
          }
        return
      }

      // Dismiss the keyboard
      textField.dismissSoftInput()

      this.showActivityIndicator()
      this
        .addItem(this.grocery)
        .then(() => {
          this.grocery = "";
          this.hideActivityIndicator();
        })
        .catch(() => {
            alert("An error occurred while adding an item to your list.");
            this.hideActivityIndicator();
          }
        )
    },

    toggleRecent() {
      if (!this.isShowingRecent) {
        this.isShowingRecent = true;
        return;
      }

      // if is showing recent, restore items before going back to the list
      this.isShowingRecent = false;
      // this.showActivityIndicator();
      // restore items???
      // this.store.restore()
      //   .subscribe(
      //   () => {
      //     this.isShowingRecent = false;
      //     this.hideActivityIndicator();
      //   },
      //   () => {
      //     alert("An error occurred while adding groceries to your list.");
      //     this.hideActivityIndicator();
      //   }
      //   );
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
      let list = this.itemList.map(item => item.name)

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