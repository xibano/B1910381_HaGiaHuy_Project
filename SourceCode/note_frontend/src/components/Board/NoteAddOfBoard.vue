<template>
  <div class="note note_add">
    <div
      class="w-100 h-100 d-flex justify-content-center align-items-center"
      @click="
        showNoteDetail({
          id: '',
          title: '',
          content: '',
        })
      "
      data-bs-toggle="modal"
      data-bs-target="#boardNoteDetail"
    >
      + Tạo ghi chú
    </div>
  </div>
</template>

<script>
export default {
  emits: ["showNoteDetail"],
  methods: {
    showNoteDetail: function ({ id, title, content }) {
      this.$emit("showNoteDetail", {
        id,
        title,
        content,
      });
    },
  },
};
</script>

<style scoped>
.note {
  background-color: #ffe9ab;
  border: 2px solid black;
  height: 250px;
  margin-left: 40px;
  width: 200px;
  margin-top: 35px;
  border-radius: 10px;
  font-size: 20px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
}

.note_add {
  background-color: #eee;
  border-style: dashed;
  font-size: 25px;
}
</style>
