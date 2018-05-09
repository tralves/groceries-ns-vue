<template>
    <GridLayout columns="*, auto" class="item-container" :opacity="item.done ? '0.8' : '1'">
      <!-- Wrap in containers for bigger tap targets -->
      <GridLayout columns="auto, *" col="0" orientation="horizontal" class="tap-target" @tap="toggleDoneItem()">
        <Image col="0" :src="imageSource(item)" class="check-box"></Image>
        <Label col="1" :text="item.name" :class="{'line-through': item.done && !item.deleted}"></Label>
      </GridLayout>
      <GridLayout col="1" class="delete-container" @tap="deleteItem()">
        <StackLayout>
          <Image src="res://delete"></Image>
        </StackLayout>
      </GridLayout>
    </GridLayout>
</template>

<script>
export default {
  name: "grocery-item",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleDoneItem() {
      if (this.item.deleted) {
        this.$store.dispatch('toggleDeleteItem', this.item)
        .catch( () => {
          alert("An error occurred managing your grocery list.");
        });
      }
      else {
        this.$store.dispatch('toggleDoneItem', this.item)
          .catch( () => {
            alert("An error occurred managing your grocery list.");
          });
      }
    },

    deleteItem() {
      this.$store.dispatch('deleteItem', this.item)
        .catch(() => {
          alert("An error occurred managing your grocery list.");
        });
    },

    imageSource(grocery) {
      if (grocery.deleted) {
        return "res://add";
      }
      return grocery.done ? "res://checked" : "res://unchecked";
    }
  }
}
</script>

<style lang="scss">
.platform-android .item-container {
  margin-top: 1;
}

.item-container {
  background-color: white;
  .visible {
    animation-name: show;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  .tap-target {
    padding-top: 13;
    padding-bottom: 13;
    padding-left: 16;
    label {
      min-width: 200;
    }
  }

  .check-box {
    margin-right: 10;
    height: 20;
  }

  .delete-container {
    padding: 10 15;
    vertical-align: middle;
    image {
      height: 20;
    }
    StackLayout {
      padding: 5;
    }
  }

}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>
