import { getString, setString } from 'tns-core-modules/application-settings'

const tokenKey = "token";

export default class BackendService {
  constructor() {
    this.apiUrl = "https://api.everlive.com/v1/GWfRtXi1Lwt4jcqK/"
  }

  isLoggedIn() {
    return !!getString(tokenKey);
  }

  get token() {
    return getString(tokenKey);
  }

  set token(newToken) {
    setString(tokenKey, newToken);
  }

  validateCode(response) {
    return new Promise((resolve, reject) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        resolve(response)
      }

      reject('Response with code: ' + response.statusCode +
        '\nContent: ' + response.content.toString())
    })
  }

  getJson(response) {
    return new Promise((resolve, reject) => {
      console.info('Content: ' + response.content.toString())
      resolve(response.content.toJSON())
    })
      .catch(e => {
        console.error('Error parsing JSON response: ' + e)
        throw 'Error parsing JSON response: ' + e
      })
  }
}