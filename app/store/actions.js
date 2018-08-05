import * as types from './mutation-types'
import GroceryService from '@/services/GroceryService'

const groceryService = new GroceryService()

export const loadItems = ({ commit }) => {
  const task = 'action loadItems'
  console.log(task)
  return new Promise((resolve, reject) => {
    commit(types.ADD_PROCESSING_TASK, task)
    groceryService
      .load()
      .then(items => {
        commit(types.SET_ITEMS, items)
        commit(types.REMOVE_PROCESSING_TASK, task)
        resolve()
      })
      .catch(error => {
        console.error(`Error loading items from the backend: ${error}.`)
        commit(types.REMOVE_PROCESSING_TASK, task)
        reject(error)
      })
  })
}

export const addItem = ({ commit }, itemName) => {
  const task = 'action addItem'
  console.log(task)
  return new Promise((resolve, reject) => {
    commit(types.ADD_PROCESSING_TASK, task)
    groceryService
      .add(itemName)
      .then(item => {
        commit(types.ADD_ITEM, item)
        commit(types.REMOVE_PROCESSING_TASK, task)
        resolve()
      })
      .catch(error => {
        console.error(`Error adding item to the backend: ${error}.`)
        commit(types.REMOVE_PROCESSING_TASK, task)
        reject(error)
      })
  })
}

export const updateItem = ({ commit }, item) => {
  const task = 'action updateItem'
  console.log(task)
  return new Promise((resolve, reject) => {
    commit(types.ADD_PROCESSING_TASK, task)
    groceryService
      .update(item)
      .then(item => {
        commit(types.UPDATE_ITEM, item)
        commit(types.REMOVE_PROCESSING_TASK, task)
        resolve(item)
      })
      .catch(error => {
        console.error(`Error setting updating Item in the backend: ${error}.`)
        commit(types.REMOVE_PROCESSING_TASK, task)
        reject(error)
      })
  })
}

export const toggleDoneItem = ({ commit }, item) => {
  console.log('action toggleDoneItem')
  return updateItem({ commit }, {...item, done: !item.done})
}

export const toggleDeleteItem = ({ commit }, item) => {
  console.log('action toggleDoneItem')
  return updateItem({ commit }, {...item, deleted: !item.deleted})
}

export const deleteItem = ({ commit }, item) => {
  const task = 'action deleteItem'
  console.log(task)
  if (item.deleted) {
    // if soft deleted, delete permanently from backend
    commit(types.ADD_PROCESSING_TASK, task)
    return new Promise((resolve, reject) => {
      groceryService
        .delete(item)
        .then(item => {
          commit(types.DELETE_ITEM, item)
          commit(types.REMOVE_PROCESSING_TASK, task)
          resolve(item)
        })
        .catch(error => {
          console.error(`Error deleting Itempermanently in the backend: ${error}.`)
          commit(types.REMOVE_PROCESSING_TASK, task)
          reject(error)
        })
    })
  } else {
    // 'soft' delete
    return updateItem({ commit }, { ...item, deleted: true })
  }
}
