<template>
  <div class="input-group mt-3 w-75 mx-auto">
    <input
      type="text"
      class="form-control border-primary"
      placeholder="Tìm kiếm ghi chú"
      @keyup="handleChange"
      v-model="contentSearch"
    />
  </div>
</template>

<script>
export default {
  emits: ["contentSearchChange"],
  props: ["contentSearch"],
  methods: {
    handleChange: function () {
      this.$emit("contentSearchChange", this.contentSearch);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin-top: 10px;
  width: 80%;
}
button {
  height: 40px;
  margin-top: 10px;
}
</style>
