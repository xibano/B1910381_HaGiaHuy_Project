<template>
  <router-link to="/board"
    ><i class="fa-solid fa-house-user float-start" id="icon_home"></i
  ></router-link>

  <h2
    class="d-inline d-flex justify-content-between align-items-center mx-auto"
  >
    <i class="fa-sharp fa-solid fa-arrow-left" @click="goToPreviousMonth"></i>
    Tháng {{ currentMonthIndex + 1 }}, Năm {{ currentYear }}
    <i class="fa-sharp fa-solid fa-arrow-right" @click="goToNextMonth"></i>
  </h2>
</template>

<script>
import AuthService from "../../services/AuthService";
import UserAccountService from "../../services/UserAccountService";
export default {
  props: ["currentMonthIndex", "currentYear", "menuFuncs"],
  data() {
    return {
      isLogin: false,
      userLogin: "",
    };
  },
  async created() {
    this.isLogin = await AuthService.isHavingValidToken();
    if (this.isLogin) {
      this.userLogin = (await UserAccountService.getUserInfo()) ?? {
        fullname: "",
      };
    }
  },
  methods: {
    goToPreviousMonth() {
      this.menuFuncs().goToPreviousMonth();
    },

    goToNextMonth() {
      this.menuFuncs().goToNextMonth();
    },

    async logout() {
      await AuthService.logout();
      this.$router.go();
    },
  },
};
</script>

<style scoped>
#icon_home {
  font-size: 30px;
  padding-top: 10px;
  padding-left: 15px;
  color: rgb(0, 64, 128);
}

@media screen and (min-width: 993px) {
  h2 {
    width: 40%;
    font-size: 22px;
  }
}

@media screen and (max-width: 992px) {
  h2 {
    width: 50%;
    font-size: 18px;
  }
}

@media screen and (max-width: 768px) {
  h2 {
    width: 70%;
    font-size: 14px;
  }
}

h2 {
  height: 35px;
  background-color: lightskyblue;
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
}

i {
  cursor: pointer;
}
</style>
