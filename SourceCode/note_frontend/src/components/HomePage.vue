<template>
  <div id="home" class="mx-auto">
    <div class="text-center"><img src="../assets/logo1.png" id="logo" /></div>
    <div id="title" class="text-center text-info">Destiny Note</div>
    <div id="subtitle" class="text-center text-info">Hãy note theo cách của bạn ^^</div>

    <div class="w-75 mx-auto mt-5 mb-3" style="text-align: center;">
      <router-link to="/login">
        <button type="button" class="btn btn-warning w-50 fw-bold text-light">
          Đăng nhập
        </button>
      </router-link>
    </div>

    <div class="text-center text-dark">
      Bạn có tài khoản chưa?
      <router-link to="/signup" class="text-info-emphasis text-decoration-none fw-bold"
        >Đăng ký ngay tại đây
      </router-link>
    </div>
  </div>
</template>

<script></script>

<style scoped>
#home {
  width: 93%;
  background-image: url(../assets/nen.jpg);
  min-height: 100vh;
}

#logo {
  height: 250px;
  width: 250px;
}

#title {
  margin-top: 15px;
  font-size: 70px;
  font-weight: bold;
  color: blue;
}

#subtitle {
  font-size: 35px;
  font-weight: bold;
  color: white;
}


</style>
