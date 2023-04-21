<template>
  <div class="container-fluid p-0">
    <div class="d-flex">
      <side-bar activeTab="board"></side-bar>
      <main-content
        :contentSearch="contentSearch"
        :notes="notesFiltered"
        @contentSearchChange="handleSearch"
        @updateNotes="updateNotes"
        @showNoteDetail="showNoteDetail"
      ></main-content>
    </div>

    <board-note-detail-modal
      :noteInModal="noteInModal"
      @updateNotes="updateNotes"
    ></board-note-detail-modal>
  </div>
</template>

<script>
import SideBar from "../layouts/SideBar.vue";
import MainContent from "./MainContent.vue";
import BoardNoteDetailModal from "./BoardNoteDetailModal.vue";
import BoardService from "../../services/BoardService";
import AuthService from "../../services/AuthService";

export default {
  components: {
    SideBar,
    MainContent,
    BoardNoteDetailModal,
  },
  data() {
    return {
      contentSearch: "",
      notes: [],
      noteInModal: { id: "", title: "", content: "" },
    };
  },
  computed: {
    notesFiltered() {
      return this.notes.filter((note) =>
        note.content.includes(this.contentSearch)
      );
    },
  },
  async created() {
    if (await AuthService.isHavingValidToken()) {
      this.updateNotes();
    } else {
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    updateNotes: async function () {
      this.notes = await BoardService.getNotes();
    },

    handleSearch: function (contentSearch) {
      this.contentSearch = contentSearch;
    },

    showNoteDetail: function ({ id, title, content }) {
      this.noteInModal = { id, title, content };
    },
  },
};
</script>
