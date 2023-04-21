<template>
  <div class="modal fade" id="scheduleTimeDetail" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">
            <i class="fa-solid fa-calendar-week"></i>
            Buổi
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <textarea class="w-100 h-100" v-model="timeInModal.time"></textarea>
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
            @click="deleteTime"
            data-bs-dismiss="modal"
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
import ScheduleService from "../../services/ScheduleService";
export default {
  emits: ["updateNotes"],
  props: ["timeInModal"],
  methods: {
    async saveContent() {
      await ScheduleService.updateTimeById({
        timeId: this.timeInModal._id,
        newTime: this.timeInModal.time,
      });
      this.$emit("updateNotes");
    },

    async deleteTime() {
      await ScheduleService.updateTimeById({
        timeId: this.timeInModal._id,
        newTime: "",
      });
      this.$emit("updateNotes");
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
