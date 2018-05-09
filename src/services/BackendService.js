import { getString, setString } from 'tns-core-modules/application-settings'

const tokenKey = "token";

/**
 * Parent service class. Has common configs and methods.
 */
export default class BackendService {
  constructor() {
    this.baseUrl = "https://baas.kinvey.com/"
    this.appKey = "kid_HyHoT_REf";
    this.appUserHeader = "Basic a2lkX0h5SG9UX1JFZjo1MTkxMDJlZWFhMzQ0MzMyODFjN2MyODM3MGQ5OTIzMQ";
    this.apiUrl = "";
  }

  isLoggedIn() {
    console.log('GETTING TOKEN LOGGED IN: ' + getString(tokenKey))
    return !!getString(tokenKey);
  }

  get token() {
    console.log('GETTING TOKEN: ' + getString(tokenKey))
    return getString(tokenKey);
  }

  set token(newToken) {
    setString(tokenKey, newToken);
    console.log('TOKEN SET TO: ' + newToken)
  }

  validateCode(response) {
    return new Promise((resolve, reject) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        resolve(response)
      }
      console.log('Response with code: ' + response.statusCode +
        '\nContent: ' + response.content.toString())
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