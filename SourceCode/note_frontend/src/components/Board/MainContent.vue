<template>
  <div class="w-100">
    <board-search-bar
      :contentSearch="contentSearch"
      @contentSearchChange="handleSearch"
    ></board-search-bar>

    <div id="main-content" class="col">
      <note-add-of-board @showNoteDetail="showNoteDetail"></note-add-of-board>
      <note-of-board
        v-for="note in notes"
        :key="note._id"
        :note="note"
        @updateNotes="updateNotes"
        @showNoteDetail="showNoteDetail"
      ></note-of-board>
    </div>
  </div>
</template>

<script>
import BoardSearchBar from "./BoardSearchBar.vue";
import NoteAddOfBoard from "./NoteAddOfBoard.vue";
import NoteOfBoard from "./NoteOfBoard.vue";

export default {
  components: {
    NoteAddOfBoard,
    NoteOfBoard,
    BoardSearchBar,
  },
  props: ["contentSearch", "notes"],
  emits: ["contentSearchChange", "updateNotes", "showNoteDetail"],
  methods: {
    handleSearch: function (contentSearch) {
      this.$emit("contentSearchChange", contentSearch);
    },
    updateNotes: function () {
      this.$emit("updateNotes");
    },
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
#main-content {
  margin-top: 10px;
  width: 100%;
  height: 90%;
  background-image: url('../Auth/nen.jpg');
}
</style>
