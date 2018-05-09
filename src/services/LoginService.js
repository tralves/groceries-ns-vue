import * as http from 'tns-core-modules/http'
import BackendService from './BackendService'

export default class LoginService extends BackendService {

  login(user) {
    return http.request({
      url: this.baseUrl + "user/" + this.appKey + "/login",
      method: "POST",
      headers: this.getCommonHeaders(),
      content: JSON.stringify({
        username: user.email,
        password: user.password
      }),
    })
    .then(this.validateCode)
    .then(this.getJson)
    .then(data => {
      console.info('User logged in with token: ' + data._kmd.authtoken)
      this.token = data._kmd.authtoken
    })
  }

  register(user) {
    return http.request({
      url: this.baseUrl + "user/" + this.appKey,
      method: "POST",
      headers: this.getCommonHeaders(),
      content: JSON.stringify({
        username: user.email,
        email: user.email,
        password: user.password
      }),
    })
    .then(this.validateCode)
    .then(this.getJson)
    .then(data => {
      console.info('User registered: ', data)
    })
  }

  resetPassword(email) {
    return http.request({
      url: this.baseUrl + "rpc/" + this.appKey + "/" + email + "/user-password-reset-initiate",
      method: "POST",
      headers:this.getCommonHeaders()
    })
    .then(this.validateCode)
    .then(this.getJson)
    .then(data => {
      console.info('Reset password for email: ' + data.Result.Result)
    })
  }

  logout() {
    this.token = ""
  }

  getCommonHeaders() {
    return {
      "Content-Type": "application/json",
      "Authorization": this.appUserHeader,
    }
  }
}
