import * as types from './mutation-types'
import GroceryService from '/services/GroceryService'

const groceryService = new GroceryService()

export const loadItems = ({ commit }) => {
  console.log('action loadItems')
  return new Promise((resolve, reject) => {

    groceryService
      .load()
      .then(items => {
        commit(types.SET_ITEMS, items)
        resolve()
      })
      .catch(error => {
        console.error(`Error loading items from the backend: ${error}.`)
        reject(error)
      })
  })
}

export const addItem = ({ commit }, itemName) => {
  console.log('action addItem')
  return new Promise((resolve, reject) => {
    groceryService
      .add(itemName)
      .then(item => {
        commit(types.ADD_ITEM, item)
        resolve()
      })
      .catch(error => {
        console.error(`Error adding item to the backend: ${error}.`)
        reject(error)
      })
  })
}

export const setDoneItem = ({ commit }, item) => {
  console.log('action setDoneItem')
  return new Promise((resolve, reject) => {
    groceryService
      .update(item)
      .then(item => {
        commit(types.UPDATE_ITEM, item)
        resolve(item)
      })
      .catch(error => {
        console.error(`Error setting done in the backend: ${error}.`)
        reject(error)
      })
  })
}

export const deleteItem = ({ commit }, item) => {
  console.log('action deleteItem')
  return new Promise((resolve, reject) => {
    groceryService
      .update(item)
      .then(item => {
        commit(types.DELETE_ITEM, item)
        resolve(item)
      })
      .catch(error => {
        console.error(`Error setting done in the backend: ${error}.`)
        reject(error)
      })
  })
}