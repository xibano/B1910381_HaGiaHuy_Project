import axios from "axios";
import UserAccountService from "./UserAccountService";

class AuthService {
  static setToken(token) {
    window.sessionStorage.setItem("token", token);
  }

  static getToken() {
    return window.sessionStorage.getItem("token");
  }

  static async isHavingValidToken() {
    if (AuthService.getToken() == null) {
      return false;
    }

    var result = await axios.post("http://localhost:8887/auth/validate/token", {
      token: AuthService.getToken(),
    });

    return result.data;
  }

  static async login(username, password) {
    var result = await axios.post("http://localhost:8887/auth/login", {
      username,
      password,
    });

    AuthService.setToken(result.data);

    return AuthService.getToken() != "null";
  }

  static async signup(userAcocunt) {
    var result = await axios.post("http://localhost:8887/auth/signup", {
      ...userAcocunt,
    });

    return result.data;
  }

  static async logout() {
    AuthService.setToken(null);
    UserAccountService.setUserInfo(null);
  }
}

export default AuthService;
