<template>
  <div class="row justify-content-evenly">
    <div
      class="date date_outside_month"
      v-for="note in notesOfPreviousMonth"
      :key="note.date"
      data-bs-toggle="modal"
      data-bs-target="#calendarDateDetail"
      @click="
        seeDateDetail({
          _id: note._id,
          date: note.date,
          ...getPreviousMonthAndYear(),
          content: note.content,
        })
      "
    >
      <div class="date_number">{{ note.date }}</div>
      <div class="date_content">{{ note.content }}</div>
    </div>

    <div
      class="date"
      v-for="note in notesOfCurrentMonth"
      :key="note.date"
      :class="{ current_date: getCurrentDate() == note.date }"
      data-bs-toggle="modal"
      data-bs-target="#calendarDateDetail"
      @click="
        seeDateDetail({
          _id: note._id,
          date: note.date,
          monthIndex: this.currentMonthIndex,
          year: this.currentYear,
          content: note.content,
        })
      "
    >
      <div class="date_number">{{ note.date }}</div>
      <div class="date_content">{{ note.content }}</div>
    </div>

    <div
      class="date date_outside_month"
      v-for="note in notesOfNextMonth"
      :key="note.date"
      data-bs-toggle="modal"
      data-bs-target="#calendarDateDetail"
      @click="
        seeDateDetail({
          _id: _id,
          date: note.date,
          ...getNextMonthAndYear(),
          content: note.content,
        })
      "
    >
      <div class="date_number">{{ note.date }}</div>
      <div class="date_content">{{ note.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["seeDateDetail"],
  props: [
    "currentMonthIndex",
    "currentYear",
    "notesOfPreviousMonth",
    "notesOfCurrentMonth",
    "notesOfNextMonth",
    "getPreviousMonthAndYear",
    "getNextMonthAndYear",
  ],
  methods: {
    getCurrentDate() {
      return this.currentMonthIndex == new Date().getMonth() &&
        this.currentYear == new Date().getFullYear()
        ? new Date().getDate()
        : 0;
    },

    seeDateDetail(dateValue) {
      this.$emit("seeDateDetail", dateValue);
    },
  },
};
</script>

<style scoped>
.date {
  width: 14%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
  background-color: lightsteelblue;
  margin-bottom: 5px;
  border: 0.3px solid lightsteelblue;
}

.date_outside_month {
  background-color: grey;
  border-color: grey;
}

.current_date {
  background-color: greenyellow;
}

.date_number {
  font-weight: solid;
}

@media screen and (min-width: 993px) {
  .date_number,
  .date_content {
    font-size: 20px;
  }

  .date_number {
    margin: 6px 0;
  }
}

@media screen and (max-width: 992px) {
  .date_number,
  .date_content {
    font-size: 16px;
  }

  .date_number {
    margin: 4px 0;
  }
}

@media screen and (max-width: 768px) {
  .date_number,
  .date_content {
    font-size: 12px;
  }

  .date_number {
    margin: 2px 0;
  }
}
</style>
