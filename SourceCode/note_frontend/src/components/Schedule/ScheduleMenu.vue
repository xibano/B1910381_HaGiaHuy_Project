<template>
  <div class="row notes-at-a-time justify-content-center">
    <div class="time">Buổi</div>
    <div class="day">Thứ 2</div>
    <div class="day">Thứ 3</div>
    <div class="day">Thứ 4</div>
    <div class="day">Thứ 5</div>
    <div class="day">Thứ 6</div>
    <div class="day">Thứ 7</div>
    <div class="day">Chủ nhật</div>
    <div class="options"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.notes-at-a-time {
  min-width: 1100px;
  margin-top: 10px;
}

.time,
.day,
.options {
  margin: 3px;
  padding: 8px;
  font-size: 20px;
  text-align: center;
  background-color: rgb(50, 174, 205);
}

.time {
  width: 65px;
}

.day {
  width: 12%;
  min-width: 90px;
  height: 50px;
}

.options {
  width: 30px;
  border: none;
}
</style>
