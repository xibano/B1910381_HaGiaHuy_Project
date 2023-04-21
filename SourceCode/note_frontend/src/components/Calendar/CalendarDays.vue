<template>
  <div class="row justify-content-evenly mb-1">
    <div class="day" v-for="day in days" :key="day">{{ day }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
    };
  },
};
</script>

<style scoped>
.day {
  width: 14%;
  background-color: lightskyblue;
  padding: 10px 0;
  font-size: 14px;
  text-align: center;
  border-width: 0.3px;
}

@media screen and (min-width: 993px) {
  .day {
    font-size: 20px;
  }
}

@media screen and (max-width: 992px) {
  .day {
    font-size: 18px;
  }
}

@media screen and (max-width: 768px) {
  .day {
    font-size: 14px;
  }
}
</style>
