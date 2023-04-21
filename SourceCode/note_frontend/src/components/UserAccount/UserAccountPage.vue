<template>
  <div class="container-fluid p-0">
    <div class="d-flex">
      <side-bar activeTab="user_account"></side-bar>
      <main-content></main-content>
    </div>
  </div>
</template>

<script>
import SideBar from "../layouts/SideBar.vue";
import MainContent from "./MainContent.vue";

export default {
  components: {
    SideBar,
    MainContent,
  },
};
</script>
