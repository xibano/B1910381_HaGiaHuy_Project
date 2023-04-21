<template>
  <div class="modal fade" id="calendarDateDetail" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">
            <i class="fa-solid fa-calendar-days"></i>
            {{ dateFormatedInModal }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <textarea class="w-100 h-100" v-model="contentInModal"></textarea>
        </div>
        <div class="modal-footer justify-content-center">
          <button
            type="button"
            class="btn btn-success"
            @click="saveContent"
            data-bs-dismiss="modal"
          >
            Lưu
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteNote"
            data-bs-dismiss="modal"
            v-if="dateInModal._id != null"
          >
            Xóa
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Trở lại
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarService from "../../services/CalendarService";

export default {
  emits: ["updateDates"],
  props: ["dateInModal", "contentInModal"],
  computed: {
    dateFormatedInModal() {
      return (
        this.dateInModal.date +
        "/" +
        (this.dateInModal.monthIndex + 1) +
        "/" +
        this.dateInModal.year
      );
    },
  },
  methods: {
    async saveContent() {
      if (this.dateInModal._id) {
        await CalendarService.updateNoteById({
          _id: this.dateInModal._id,
          content: this.contentInModal,
        });
      } else {
        await CalendarService.createNoteByDate({
          date: this.dateInModal.date,
          month: this.dateInModal.monthIndex + 1,
          year: this.dateInModal.year,
          content: this.contentInModal,
        });
      }

      this.$emit("updateDates");
    },

    async deleteNote() {
      await CalendarService.deleteNoteById(this.dateInModal._id);
      this.$emit("updateDates");
    },
  },
};
</script>

<style scoped>
.modal-body {
  height: 300px;
  background: white;
}

.modal-body textarea {
  background: white;
  border: none;
}

.modal-body textarea:focus {
  outline: 0 none;
  background: white;
}
</style>
