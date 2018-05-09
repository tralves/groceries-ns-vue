<template>
  <ListView :items="items" :row="row" :class="{'visible': listLoaded}"
    @item-loading="makeBackgroundTransparent(event)">
    <v-template>
      <GroceryItem :item="item"></GroceryItem>
    </v-template>
  </ListView>
</template>

<script>
import alert from '@/utils/alert'
import GroceryItem from './GroceryItem.vue'

export default {
  name: 'grocery-list',

  components: {
    GroceryItem
  },

  props: {
    row: {
      type: Number,
      required: true
    },
    listLoaded: {
      type: Boolean
    },
    items: {
      type: Array
    }
  },

  created() {
    console.log('GROCERY LIST created')
  }
}
</script>

<style lang="scss">
.list-page ListView {
  background-color: transparent;
  opacity: 0;

  &.visible {
    animation-name: show;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
