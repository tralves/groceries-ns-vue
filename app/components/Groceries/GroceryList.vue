<template>
  <list-view :items="items" :row="row" :class="{'visible': listLoaded}"
    @itemLoading="makeBackgroundTransparent(event)">
    <template scope="item">
      <grocery-item :item="item"></grocery-item>
    </template>
  </list-view>
</template>

<script>
import alert from '/utils/alert'
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
    console.debug('GROCERY LIST created')
  }
}
</script>

<style lang="scss">
.list-page list-view {
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
