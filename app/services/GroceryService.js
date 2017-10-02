import http from 'tns-core-modules/http'
import BackendService from './BackendService'

export default class GroceryService {

  constructor() {
    this.backendService = new BackendService()
  }

  load() {
    return http.request({
      url: this.backendService.apiUrl + 'Groceries',
      method: 'GET',
      headers: this.getHeaders({ 'X-Everlive-Sort': JSON.stringify({ ModifiedAt: -1 }) }),
    })
    .then(this.backendService.validateCode)
    .then(this.backendService.getJson)
      .then(data => {
        console.info(data);
        console.info(`Received ${data.Result.length} items from the backend.`)
        return data.Result.map(item => {
          return {
            id: item.Id,
            name: item.Name,
            done: item.Done || false,
            deleted: item.Deleted || false
          }
        })
    })
  }

  add(itemName) {
    return http
      .request({
        url: this.backendService.apiUrl + 'Groceries',
        method: 'POST',
        headers: this.getHeaders(),
        content: JSON.stringify({
          Name: itemName
        })
      })
      .then(this.backendService.validateCode)
      .then(this.backendService.getJson)
      .then(data => {
        console.info(`Added item with id ${data.Result.Id}.`)
        return {
          id: data.Result.Id,
          name: itemName,
          done: false,
          deleted: false
        }
      })
  }

  update(item) {
    console.log('putting', item, JSON.stringify({
      Name: item.name,
      Done: item.done,
      Deleted: item.deleted
    }))
    return http
      .request({
        url: this.backendService.apiUrl + 'Groceries/' + item.id,
        method: 'PUT',
        headers: this.getHeaders(),
        content: JSON.stringify({
          Name: item.name,
          Done: item.done,
          Deleted: item.deleted
        })
      })
      .then(this.backendService.validateCode)
      .then(this.backendService.getJson)
      .then(data => {
        console.info(data)
        console.info(`Updated item with id ${item.id}.`)
        return item
      })
  }

  delete(item) {
    console.log('deleting ', item)
    return http
      .request({
        url: this.backendService.apiUrl + 'Groceries/' + item.id,
        method: 'DELETE',
        headers: this.getHeaders()
      })
      .then(this.backendService.validateCode)
      .then(this.backendService.getJson)
      .then(data => {
        console.info(data)
        console.info(`Updated item with id ${item.id}.`)
        return item
      })
  }

  restore(items) {
    console.log('restoring', items)
    const itemIndeces = items.map(item => item.id)
    const headers = this.getHeaders({
      "X-Everlive-Filter": JSON.stringify({
        "Id": {
          "$in": itemIndeces
        }
      })})

    return http
      .request({
        url: this.backendService.apiUrl + 'Groceries',
        method: 'PUT',
        headers: headers,
        content: JSON.stringify({
          Deleted: false,
          Done: false
        }),
      })
      .then(this.backendService.validateCode)
      .then(this.backendService.getJson)
      .then(data => {
        console.info(data)
        console.info(`Restored items with ids ${itemIndeces}.`)
      })
  }

  getHeaders(toAppend = {}) {
    return Object.assign({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.backendService.token,
    },
    toAppend)
  }
}