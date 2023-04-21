<template>
  <div class="note">
    <div class="d-flex justify-content-around">
      <i
        class="fa-solid fa-heart"
        @click="changeFavorite"
        v-if="note.favorite"
      ></i>
      <i class="fa-regular fa-heart" @click="changeFavorite" v-else></i>
      
      <span class="mt-2">{{ changeFormatDate(note.updatedAt) }}</span>
      <i class="fa-solid fa-x" @click="deleteNote"></i>
    </div>
    <div
      @click="
        showNoteDetail({
          id: note._id,
          title: note.title,
          content: note.content,
        })
      "
      data-bs-toggle="modal"
      data-bs-target="#boardNoteDetail"
      class="p-2"
      style="cursor: pointer"
    >
      <div class="title">
        {{ note.title }}
      </div>

      <div class="content mt-2">
        {{ note.content }}
      </div>
    </div>
  </div>
</template>

<script>
import BoardService from "../../services/BoardService";
export default {
  props: ["note"],
  emits: ["updateNotes", "showNoteDetail"],
  methods: {
    changeFormatDate: function (date) {
      date = new Date(date);
      var d = date.getDate();
      var m = date.getMonth() + 1;
      var y = date.getFullYear();
      if (d < 10) {
        d = "0" + d;
      }
      if (m < 10) {
        m = "0" + m;
      }

      return d + "/" + m + "/" + y;
    },

    changeFavorite: async function () {
      this.note.favorite = !this.note.favorite;
      await BoardService.changeNoteFavorite(this.note._id, this.note.favorite);
    },

    deleteNote: async function () {
      await BoardService.deleteNote(this.note._id);
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
.note {
  background-color: lawngreen;
  border: 2px solid black;
  height: 250px;
  margin-left: 40px;
  width: 200px;
  margin-top: 35px;
  border-radius: 10px;
  font-size: 20px;
  display: inline-block;
  overflow: hidden;
}

.content {
  font-size: 20px;
  height: 7em;
  width: 8em;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
}
.fa-solid,
.fa-heart {
  color: rgb(230, 89, 24);
}

.fa-x {
  margin-top: 15px;
  color: rgb(230, 89, 24);
}
.title {
  font-size: 25px;
  font-weight: bold;
  overflow: hidden;
  margin-top: 10px;
  text-overflow: ellipsis;
}
.fa-heart {
  margin-top: 15px;
}

i {
  cursor: pointer;
}
</style>
