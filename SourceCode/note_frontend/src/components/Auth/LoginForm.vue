<template>
  <div
    id="form"
    class="mx-auto d-flex align-items-center justify-content-center"
  >
    <div class="text-center w-75">
      <div class="text-center">
        <img src="../../assets/logo1.png" id="logo" />
      </div>
      <h2 class="my-5 text-info">ĐĂNG NHẬP</h2>
      <div class="input-group mb-3 w-50 mx-auto">
        <span class="input-group-text"><i class="fa-solid fa-user-tie"></i> </span>
        <input
          type="text"
          class="form-control"
          placeholder="Enter username"
          v-model="username"
          required
        />
      </div>
      <div class="input-group mb-3 w-50 mx-auto">
        <span class="input-group-text"><i class="fa-solid fa-key"></i></span>
        <input
          type="password"
          class="form-control"
          placeholder="Enter password"
          v-model="password"
          required
        />
      </div>
      <div class="login-failed" v-if="!success">Đăng nhập thất bại!</div>
      <div class="my-3">
        <button
          type="button"
          class="btn btn-warning w-50 fw-bold text-light"
          @click="login"
        >
          Đăng nhập
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
      password: "",
      success: true,
    };
  },
  methods: {
    async login() {
      this.success = await AuthService.login(this.username, this.password);

      if (this.success) {
        this.$router.push({ name: "board" });
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
  width: 200px;
  height: 200px;
}

.login-failed {
  color: red;
}
</style>
