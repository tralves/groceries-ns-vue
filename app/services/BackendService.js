import { getString, setString } from 'application-settings'

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
}