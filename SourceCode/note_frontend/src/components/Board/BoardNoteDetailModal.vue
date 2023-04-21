<template>
  <div class="modal fade" id="boardNoteDetail" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title fs-5">
            <input
              type="text"
              id="titleInput"
              class="form-control fw-bold"
              v-model="noteInModal.title"
              :placeholder="noteInModal.id ? '' : 'Nhập tên ghi chú'"
            />
          </div>
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
            v-model="noteInModal.content"
            :placeholder="noteInModal.id ? '' : 'Nội dung ghi chú'"
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
import BoardService from "../../services/BoardService";

export default {
  emits: ["updateNotes"],
  props: ["noteInModal"],
  methods: {
    async saveContent() {
      if (this.noteInModal.id) {
        await BoardService.updateNoteById({
          id: this.noteInModal.id,
          title: this.noteInModal.title,
          content: this.noteInModal.content,
        });
      } else {
        await BoardService.createNote({
          title: this.noteInModal.title,
          content: this.noteInModal.content,
        });
      }

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
