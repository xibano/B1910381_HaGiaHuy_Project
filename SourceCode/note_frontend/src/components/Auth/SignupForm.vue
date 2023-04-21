<template>
  <div
    id="form"
    class="mx-auto d-flex align-items-center justify-content-center"
  >
    <div class="text-center w-75">
      <div><img src="../../assets/logo1.png" id="logo" /></div>
      <h2 class="my-5 text-info">ĐĂNG KÝ</h2>
      <div class="input-group mb-3 w-50 mx-auto">
        <span class="input-group-text"
          ><i class="fa-sharp fa-solid fa-signature"></i
        ></span>
        <input
          type="text"
          class="form-control"
          placeholder="Nhập họ tên"
          v-model="fullname"
        />
      </div>
      <div class="input-group mb-3 w-50 mx-auto">
        <span class="input-group-text"><i class="fa-solid fa-user-tie"></i></span>
        <input
          type="text"
          class="form-control"
          placeholder="Nhập username"
          v-model="username"
        />
      </div>
      <div class="input-group mb-3 w-50 mx-auto">
        <span class="input-group-text"><i class="fa-solid fa-key"></i></span>
        <input
          type="password"
          class="form-control"
          placeholder="Nhập mật khẩu"
          v-model="password"
        />
      </div>
      <div class="input-group mb-3 w-50 mx-auto">
        <span class="input-group-text"
          ><i class="fa-sharp fa-solid fa-key"></i
        ></span>
        <input
          type="password"
          class="form-control"
          placeholder="Nhập lại mật khẩu"
          v-model="confirmPassword"
        />
      </div>
      <div class="signup-failed">{{ message }}</div>
      <div class="my-3">
        <button
          type="button"
          class="btn btn-warning w-50 fw-bold text-light"
          @click="signup"
        >
          Đăng ký
        </button>
      </div>
      <router-link to="/" class="text-dark text-decoration-none">
        <i class="fa-sharp fa-solid fa-arrow-left"></i> Trở về trang
        chủ</router-link
      >
    </div>
  </div>
</template>

<script>
import AuthService from "../../services/AuthService";
export default {
  data() {
    return {
      username: "",
      fullname: "",
      password: "",
      confirmPassword: "",
      message: "",
    };
  },
  methods: {
    async signup() {
      if (this.username == "") {
        this.message = "Username không được rỗng";
      } else if (this.fullname == "") {
        this.message = "Họ tên không được rỗng";
      } else if (this.password == "") {
        this.message = "Mật khẩu không được rỗng";
      } else if (this.password != this.confirmPassword) {
        this.message = "Mật khẩu không trùng khớp";
      } else {
        var result = await AuthService.signup({
          username: this.username,
          password: this.password,
          fullname: this.fullname,
          avatar: "",
        });

        if (result) {
          this.message = "";
          this.username = "";
          this.fullname = "";
          this.password = "";
          this.confirmPassword = "";

          alert("Đăng ký thành công!");
        } else {
          this.message = "Đăng ký thất bại!";
        }
      }
    },
  },
};
</script>

<style scoped>
#form {
  width: 93%;
  background-image: url('../Auth/nen.jpg');
  min-height: 100vh;
}

#logo {
  height: 200px;
  width: 200px;
}

.signup-failed {
  color: red;
}
</style>
