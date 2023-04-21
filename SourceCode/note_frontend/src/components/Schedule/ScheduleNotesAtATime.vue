<template>
  <div
    class="note-time center-div"
    @click="seeScheduleTimeDetail(notesAtATime._id, notesAtATime.time)"
    data-bs-toggle="modal"
    data-bs-target="#scheduleTimeDetail"
  >
    {{ notesAtATime.time }}
  </div>
  <div
    class="note"
    v-for="note in notesAtATime.notes"
    :key="note._id"
    :class="{ 'empty-note': note.content.length == 0 }"
    @click="
      seeScheduleNoteDetail(
        notesAtATime._id,
        notesAtATime.time,
        note._id,
        note.day,
        note.content
      )
    "
    data-bs-toggle="modal"
    data-bs-target="#scheduleNoteDetail"
  >
    {{ note.content }}
  </div>
  <div class="note-options center-div" @click="deleteNotesAtATime">
    <i class="fa-solid fa-x"></i>
  </div>
</template>

<script>
import ScheduleService from "../../services/ScheduleService";

export default {
  emits: ["updateNotes", "seeScheduleTimeDetail", "seeScheduleNoteDetail"],
  props: ["notesAtATime"],
  methods: {
    deleteNotesAtATime: async function () {
      await ScheduleService.deleteNotesAtATimeById(this.notesAtATime._id);
      this.$emit("updateNotes");
    },

    seeScheduleTimeDetail: function (notesAtATimeId, noteTime) {
      this.$emit("seeScheduleTimeDetail", {
        notesAtATimeId,
        noteTime,
      });
    },

    seeScheduleNoteDetail: function (
      notesAtATimeId,
      noteTime,
      noteId,
      noteDay,
      noteContent
    ) {
      this.$emit("seeScheduleNoteDetail", {
        notesAtATimeId,
        noteTime,
        noteId,
        noteDay,
        noteContent,
      });
    },
  },
};
</script>

<style scoped>
.note-time,
.note,
.note-options {
  margin: 3px;
  padding: 5px;
  height: 100px;
  white-space: nowrap;
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
  cursor: pointer;
}

.note-time {
  width: 65px;
  background-color:lightgreen;
}

.note {
  width: 12%;
  min-width: 90px;
  background-color: lightgreen;
}

.note-options {
  width: 30px;
  text-align: center;
  border: none;
  background-color: red;
}

.empty-note {
  background-color: lightsteelblue;
  border-color: lightcyan;
}

.center-div {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
