import * as types from './mutation-types'

const mutations = {
  [types.SET_ITEMS](state, items) {
    console.log('SET_ITEMS', items)
    state.items = items
  },
  [types.ADD_ITEM](state, item) {
    console.log('ADD_ITEM', item)
    state.items.push(item)
  },
  [types.UPDATE_ITEM](state, item) {
    console.log('UPDATE_ITEM', item)
    let itemToUpdate = state.items.find(i => i.id == item.id)
    Object.assign(itemToUpdate,item)
  }
}

export default mutations;