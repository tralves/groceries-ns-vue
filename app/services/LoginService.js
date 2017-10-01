import http from 'tns-core-modules/http'
import BackendService from './BackendService'

export default class LoginService {

  constructor() {
    this.backendService = new BackendService()
  }

  login(user) {
    return http.request({
      url: this.backendService.apiUrl + "oauth/token",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      content: JSON.stringify({
        username: user.email,
        password: user.password,
        grant_type: "password"
      }),
    })
    .then(this.backendService.validateCode)
    .then(this.backendService.getJson)
    .then(data => {
      console.info('User logged in with token: ' + data.Result.access_token)
      this.backendService.token = data.Result.access_token
    })
  }

  register(user) {
    return http.request({
      url: this.backendService.apiUrl + "Users",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      content: JSON.stringify({
        Username: user.email,
        Email: user.email,
        Password: user.password
      }),
    })
    .then(this.backendService.validateCode)
    .then(this.backendService.getJson)
    .then(data => {
      console.info('User registered: ' + data.Result.Id)
    })
  }

  resetPassword(email) {
    return http.request({
      url: this.backendService.apiUrl + "Users/resetpassword",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      content: JSON.stringify({
        Username: email,
      }),
    })
    .then(this.backendService.validateCode)
    .then(this.backendService.getJson)
    .then(data => {
      console.info('Reset password for email: ' + data.Result.Result)
    })
  }

  logout() {
    this.backendService.token = ""
  }

}