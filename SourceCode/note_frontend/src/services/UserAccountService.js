import AuthService from "./AuthService";
import axios from "axios";

class UserAccountService {
  static async setUserInfo(userInfo) {
    window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  }

  static async getUserInfo() {
    if (AuthService.getToken() == null) {
      return "";
    }

    if (JSON.parse(window.sessionStorage.getItem("userInfo")) != null) {
      return JSON.parse(window.sessionStorage.getItem("userInfo"));
    }

    var result = await axios.post(
      "http://localhost:8887/userAccount/userInfo",
      {
        token: AuthService.getToken(),
      }
    );

    UserAccountService.setUserInfo(result.data);
    return result.data;
  }

  static async updateUserAvatar(file) {
    if (AuthService.getToken() == null) {
      return "";
    }

    var userInfo = await UserAccountService.getUserInfo();

    var result = await axios.put(
      `http://localhost:8887/userAccount/avatar?token=${AuthService.getToken()}`,
      {
        avatar: file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    UserAccountService.setUserInfo(null);

    return result.data;
  }

  static async updateUserFullname(fullname) {
    if (AuthService.getToken() == null) {
      return "";
    }

    var result = await axios.put(
      `http://localhost:8887/userAccount/fullname?token=${AuthService.getToken()}`,
      {
        fullname: fullname,
      }
    );

    UserAccountService.setUserInfo(null);

    return result.data;
  }

  static async updateUserPassword(oldPassword, newPassword) {
    if (AuthService.getToken() == null) {
      return "";
    }

    var result = await axios.put(
      `http://localhost:8887/userAccount/password?token=${AuthService.getToken()}`,
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      }
    );

    return result.data;
  }
}

export default UserAccountService;
