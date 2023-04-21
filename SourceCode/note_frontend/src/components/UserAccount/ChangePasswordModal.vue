<template>
  <div
    class="modal fade"
    id="changePasswordModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Đổi mật khẩu</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="oldPassword" class="form-label">Mật khẩu cũ:</label>
            <input
              type="password"
              class="form-control"
              id="oldPassword"
              v-model="oldPassword"
            />
          </div>

          <div class="mb-3">
            <label for="newPassword" class="form-label">Mật khẩu mới:</label>
            <input
              type="password"
              class="form-control"
              id="newPassword"
              v-model="newPassword"
            />
          </div>

          <div class="mb-3">
            <label for="confirmNewPassword" class="form-label"
              >Nhập lại mật khẩu mới:</label
            >
            <input
              type="password"
              class="form-control"
              id="confirmNewPassword"
              v-model="confirmNewPassword"
            />
          </div>
          <p class="change-password-failed text-center" v-if="message != ''">
            {{ message }}
          </p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-warning"
            @click="handleChangePassword"
          >
            Đổi mật khẩu
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Trở lại
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAccountService from "../../services/UserAccountService";
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      message: "",
    };
  },
  methods: {
    async handleChangePassword() {
      if (this.oldPassword == "") {
        this.message = "Mật khẩu cũ không được rỗng";
      } else if (this.newPassword == "") {
        this.message = "Mật khẩu mới không được rỗng";
      } else if (this.newPassword != this.confirmNewPassword) {
        this.message = "Mật khẩu mới không trùng";
      } else {
        var isSuccess = await UserAccountService.updateUserPassword(
          this.oldPassword,
          this.newPassword
        );
        if (!isSuccess) {
          this.message = "Mật khẩu cũ không đúng";
        } else {
          alert("Đổi mật khẩu thành công!");
          this.$router.go();
        }
      }
    },
  },
};
</script>

<style scoped>
.change-password-failed {
  color: red;
}
</style>
