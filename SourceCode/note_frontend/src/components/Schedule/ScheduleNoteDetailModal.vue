<template>
  <div class="modal fade" id="scheduleNoteDetail" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">
            <i class="fa-solid fa-calendar-days"></i>
            {{ contentInModal.noteDay }} - {{ contentInModal.noteTime }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <textarea
            class="w-100 h-100"
            v-model="contentInModal.noteContent"
          ></textarea>
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
            v-if="contentInModal.noteContent != ''"
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
  props: ["contentInModal"],
  methods: {
    async saveContent() {
      await ScheduleService.updateNoteById({
        timeId: this.contentInModal.notesAtATimeId,
        noteId: this.contentInModal.noteId,
        content: this.contentInModal.noteContent,
      });
      this.$emit("updateNotes");
    },

    async deleteNote() {
      await ScheduleService.deleteNoteById({
        timeId: this.contentInModal.notesAtATimeId,
        noteId: this.contentInModal.noteId,
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
