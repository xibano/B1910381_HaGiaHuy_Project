<template>
  <div id="user_info">
    <div id="user_avatar">
      <img
        :src="
          'http://localhost:8887/assets/avatars/' +
          (userLogin.avatar ? userLogin.avatar : 'avatar_user_unknow.png')
        "
      />
      <br />
      <br />
      <label for="upload_avatar_input" id="upload_avatar_label">
        Cập nhật avatar
      </label>
      <input
        id="upload_avatar_input"
        type="file"
        @change="handleChangeAvatar"
      />
      <label id="delete_avatar_label" @click="handleRemoveAvatar"
        >Xóa avatar</label
      >
    </div>
    <table>
      <tr>
        <th>Tài khoản:</th>
        <td>{{ userLogin.username }}</td>
        <td class="user_info_option"></td>
      </tr>
      <tr>
        <th>Họ và tên:</th>
        <td v-if="isEditFullname">
          <input
            type="text"
            class="form-control"
            v-model="userLogin.fullname"
          />
        </td>
        <td v-else>{{ userLogin.fullname }}</td>
        <td class="user_info_option">
          <i
            class="fa-solid fa-floppy-disk"
            v-if="isEditFullname"
            @click="handleChangeFullname"
          ></i>
          <i
            class="fa-sharp fa-solid fa-xmark"
            v-if="isEditFullname"
            @click="handleCancelChangeFullname"
          ></i>
          <i
            class="fa-sharp fa-solid fa-pen"
            v-else
            @click="handleChangeFullname"
          ></i>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="text-center">
          <button
            type="button"
            class="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#changePasswordModal"
          >
            Đổi mật khẩu
          </button>
        </td>
      </tr>
    </table>

    <change-password-modal></change-password-modal>
  </div>
</template>

<script>
import ChangePasswordModal from "./ChangePasswordModal.vue";
import AuthService from "../../services/AuthService";
import UserAccountService from "../../services/UserAccountService";

export default {
  components: {
    ChangePasswordModal,
  },
  data() {
    return {
      isLogin: false,
      userLogin: "",
      avatar_file: null,
      isEditFullname: false,
    };
  },
  async created() {
    this.isLogin = await AuthService.isHavingValidToken();

    if (this.isLogin) {
      this.userLogin = (await UserAccountService.getUserInfo()) ?? {
        username: "",
        fullname: "",
        avatar: "",
      };
    } else {
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    handleChangeAvatar: async function (e) {
      var files = e.target.files;
      if (files.length == 1) {
        this.avatar_file = files[0];
      }

      if (this.avatar_file) {
        await UserAccountService.updateUserAvatar(this.avatar_file);
      } else {
        await UserAccountService.setUserInfo(null);
      }

      this.$router.go();
    },
    handleRemoveAvatar: async function () {
      await UserAccountService.updateUserAvatar(null);

      this.$router.go();
    },
    handleChangeFullname: function () {
      if (this.isEditFullname) {
        UserAccountService.updateUserFullname(this.userLogin.fullname);
      }
      this.isEditFullname = !this.isEditFullname;
    },
    handleCancelChangeFullname: function () {
      this.isEditFullname = !this.isEditFullname;

      this.$router.go();
    },
  },
};
</script>

<style scoped>
#user_info {
  width: 500px;
  border-radius: 10px;
  margin: 15px auto;
  padding: 20px;
  font-size: 18px;
}

#user_avatar {
  padding: 20px;
  aspect-ratio: 1 / 1;
  text-align: center;
}

#user_avatar img {
  width: 80%;
  height: 80%;
  border: 1px solid black;
  border-radius: 50%;
}

#upload_avatar_label {
  background-color: lightgreen;
}

#upload_avatar_label:hover {
  background-color: yellow;
}

#upload_avatar_input {
  display: none;
}

#delete_avatar_label {
  background-color: lightslategrey;
}

#delete_avatar_label:hover {
  background-color: lightseagreen;
}

#upload_avatar_label,
#delete_avatar_label {
  padding: 10px 20px;
  margin: 0px 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid black;
}

#user_info table {
  width: 100%;
}

#user_info th {
  text-align: left;
  width: 100px;
}

#user_info th,
#user_info td {
  padding: 10px 5px;
}

.user_info_option {
  width: 70px;
  text-align: center;
  color: yellowgreen;
}

.fa-solid {
  padding: 0 8px;
}
</style>
