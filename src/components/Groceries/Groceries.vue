<template>
<Page ref="page" :class="pageClasses" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
  <GridLayout ref='container' rows="auto, auto, *" class="list-page" @loaded="load()">
    <!-- Row 1: The custom action bar -->
    <GridLayout row="0" columns="44, *, auto" class="action-bar-custom">
      <Label col="1" text="Groceries"></Label>

      <!-- Wrap the image in a StackLayout to give it a bigger tap target -->
      <StackLayout col="2" @tap="showMenu()" class='menu-button-container'>
        <Image src="res://menu" stretch="none"></Image>
      </StackLayout>
    </GridLayout>

    <!-- Row 2: The text field to add groceries, and recent button -->
    <GridLayout row="1" columns="auto, *, auto" class="add-bar"
      :backgroundColor="isShowingRecent ? '#BBC169' : '#CB1D00'" >
      <StackLayout col="0" class="add-bar-image-container"  @tap="add('button')" orientation="vertical">
        <Image :src="isShowingRecent ? 'res://recent' : 'res://add'"></Image>
      </StackLayout>
      <Label col="1" text="Recent items" v-if="isShowingRecent" class="add-bar-recent-label"></Label>
      <TextField ref='groceryTextField' col="1" v-model="grocery"
        @loaded="handleAndroidFocus()"
        :hint="isAndroid ? 'ADD A GROCERY' : 'Add a grocery'"
        returnKeyType="done" v-else @returnPress="add('textfield')"></TextField>

      <StackLayout col="2" class="add-bar-recent-container" @tap="toggleRecent()">
        <Label class="add-bar-recent-toggle" :text="isShowingRecent ? 'Done' : 'Recent'"></Label>
      </StackLayout>
    </GridLayout>

    <!-- Row 3: The grocery list -->
    <GroceryList row="2"
      :listLoaded="listLoaded"
      :showDeleted="isShowingRecent"
      :items="items"></GroceryList>

    <ActivityIndicator :busy="isLoading" row="2"></ActivityIndicator>
  </GridLayout>
</Page>
</template>

<script>
import * as platformModule from 'tns-core-modules/platform'
import { action } from 'ui/dialogs'
import * as SocialShare from 'nativescript-social-share'
import LoginService from '@/services/LoginService'
import GroceryList from './GroceryList.vue'
import Login from '@/components/Login/Login'
import alert from '@/utils/alert'
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
      isAndroid: platformModule.isAndroid,
      grocery: "",
      listLoaded: false
    }
  },

  computed: {
    ...mapGetters({
      itemList: 'itemList',
      deletedItemList: 'deletedItemList',
      isLoading: 'isProcessing'
    }),

    items: function() {
      // set item lists according to the list mode (using the defined vuex getters)
      return this.isShowingRecent ? this.deletedItemList : this.itemList
    },

    pageClasses: function () {
      return {
        // add top class so we can apply styles to specific platforms
        'platform-ios': platformModule.isIOS,
        'platform-android': platformModule.isAndroid
      }
    }
  },

  mounted() {
    console.log('GROCERIES mounted')
  },

  methods: {
    ...mapActions([
      'loadItems',
      'restoreItems',
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

    handleAndroidFocus() {
      // Prevent the first textfield from receiving focus on Android
      // See http://stackoverflow.com/questions/5056734/android-force-edittext-to-remove-focus
      const textField = this.$refs.groceryTextField
      const container = this.$refs.container
      if (container.android) {
        container.android.setFocusableInTouchMode(true);
        container.android.setFocusable(true);
        textField.android.clearFocus();
      }
    },

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

      // adds the item
      this
        .addItem(this.grocery)
        .then(() => {
          this.grocery = "";
        })
        .catch(() => {
            alert("An error occurred while adding an item to your list.");
          }
        )
    },

    toggleRecent() {
      this.isShowingRecent = !this.isShowingRecent
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
      this.$navigateTo(Login)
    },

    share() {
      const list = this.itemList.map(item => item.name)
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
    padding-bottom: 12;

    Label {
      font-size: 21;
      font-weight: bold;
    }

    StackLayout {
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

    TextField {
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

  TextField {
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
    min-width: 70;
    padding-left: 10;
    padding-right: 10;
    margin-right: -10;
    vertical-align: center;
  }

  .add-bar-recent-toggle {
    color: #311217;
    horizontal-align: center;
  }

  activity-indicator {
    horizontal-align: center;
    vertical-align: center;
  }
}

.platform-android .list-page {
  .action-bar-custom {
    color: white;
    margin-top: 32;
  }

  .add-bar-recent-toggle {
    text-transform: uppercase;
  }
}
</style>
