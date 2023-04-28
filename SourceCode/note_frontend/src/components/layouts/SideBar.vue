<template>
  <div id="sidebar">
    <div class="text-center">
      <img src="../../assets/logo1.png" id="logo" />
    </div>
    <ul id="nav">
      <li><i class="fa-solid fa-user-tie"></i> Chào {{ userLogin.fullname }}</li>
      <hr class="my-2" />
      <li>
        <router-link
          to="/board"
          :class="{ 'text-light': activeTab == 'board' }"
          ><i class="fa-sharp fa-solid fa-clipboard"></i> Note</router-link
        >
      </li>
      <li>
        <router-link to="/schedule"
          ><i class="fa-solid fa-table-list"></i> Thời khóa biểu</router-link
        >
      </li>
      <li>
        <router-link to="/calendar"
          ><i class="fa-sharp fa-solid fa-calendar"></i> Lịch</router-link
        >
      </li>
      <li>
        <router-link to="/quizes"
          ><i class="fa-solid fa-book"></i> Thi thử</router-link
        >
      </li>
      <li>
        <router-link
          to="/user_account"
          :class="{ 'text-light': activeTab == 'user_account' }"
          ><i class="fa-solid fa-user-tie"></i> Thông tin tài
          khoản</router-link
        >
      </li>
      <li>
        <span @click="logout" style="cursor: pointer">
          <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
import AuthService from "../../services/AuthService";
import UserAccountService from "../../services/UserAccountService";
export default {
  props: ["activeTab"],
  async created() {
    if (await AuthService.isHavingValidToken()) {
      this.userLogin = (await UserAccountService.getUserInfo()) ?? {
        fullname: "",
      };
    }
  },
  data() {
    return {
      userLogin: "",
    };
  },
  methods: {
    logout: async function () {
      await AuthService.logout();
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style>
#sidebar {
  min-height: 100vh;
  max-width: 250px;
  min-width: 250px;
  background-color: rgba(0, 229, 255, 0.886);
}

#logo {
  width: 150px;
  height: 150px;
}

#nav {
  list-style: none;
  padding: 0;
}

#nav li {
  padding-left: 15px;
  margin-bottom: 20px;
  font-weight: bold;
  margin-top: 20px;
}

#nav li i {
  width: 20px;
  margin: 0 10px;
}

#nav li a {
  color: black;
  text-decoration: none;
}
</style>
