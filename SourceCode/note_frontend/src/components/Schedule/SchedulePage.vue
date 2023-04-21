<template>
  <div class="schedule-page container-fluid p-10">
    <router-link to="/board"
      ><i class="fa-solid fa-house-user float-start" id="icon_home"></i
    ></router-link>

    <h2 class="text-center">THỜI KHÓA BIỂU</h2>

    <schedule-menu></schedule-menu>

    <div class="notes-at-a-time text-center">
      <button class="btn btn-success" @click="createEmptyNotesAtATime">
        Thêm 1 hàng mới
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-danger" @click="deleteAllNotesAtATime">
        Xóa tất cả
      </button>
    </div>

    <div
      class="row notes-at-a-time justify-content-center"
      v-for="notesAtATime in notesSchedule"
      :key="notesAtATime._id"
    >
      <schedule-notes-at-a-time
        :notesAtATime="notesAtATime"
        @updateNotes="updateNotes"
        @seeScheduleTimeDetail="seeScheduleTimeDetail"
        @seeScheduleNoteDetail="seeScheduleNoteDetail"
      ></schedule-notes-at-a-time>
    </div>

    <schedule-note-detail-modal
      :contentInModal="contentInModal"
      @updateNotes="updateNotes"
    ></schedule-note-detail-modal>

    <schedule-time-detail-modal
      :timeInModal="timeInModal"
      @updateNotes="updateNotes"
    ></schedule-time-detail-modal>
  </div>
</template>

<script>
import ScheduleMenu from "./ScheduleMenu.vue";
import ScheduleNotesAtATime from "./ScheduleNotesAtATime.vue";
import ScheduleNoteDetailModal from "./ScheduleNoteDetailModal.vue";
import ScheduleTimeDetailModal from "./ScheduleTimeDetailModal.vue";
import ScheduleService from "./../../services/ScheduleService";
import AuthService from "../../services/AuthService";

export default {
  components: {
    ScheduleMenu,
    ScheduleNotesAtATime,
    ScheduleNoteDetailModal,
    ScheduleTimeDetailModal,
  },
  data() {
    return {
      notesSchedule: [],
      contentInModal: "",
      timeInModal: "",
    };
  },
  async created() {
    var isLogin = await AuthService.isHavingValidToken();

    if (isLogin) {
      this.updateNotes();
    } else {
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    async updateNotes() {
      this.notesSchedule = await ScheduleService.getNotes();
    },

    async createEmptyNotesAtATime() {
      await ScheduleService.createEmptyNotesAtATime();
      this.updateNotes();
    },

    async deleteAllNotesAtATime() {
      await ScheduleService.deleteAllNotesAtATimeByAccount();
      this.notesSchedule = [];
    },

    seeScheduleTimeDetail({ notesAtATimeId, noteTime }) {
      this.timeInModal = {
        _id: notesAtATimeId,
        time: noteTime,
      };
    },

    seeScheduleNoteDetail({
      notesAtATimeId,
      noteTime,
      noteId,
      noteDay,
      noteContent,
    }) {
      this.contentInModal = {
        notesAtATimeId,
        noteTime,
        noteId,
        noteDay,
        noteContent,
      };
    },
  },
};
</script>

<style scoped>
.schedule-page {
  background-color: rgb(224, 255, 255);
  padding: 15px;
  min-height: 100vh;
}

#icon_home {
  font-size: 20px;
  padding-top: 10px;
  padding-left: 15px;
  color: rgb(0, 64, 128);
}

.notes-at-a-time {
  min-width: 1100px;
  margin-top: 20px;
}
</style>
