<template>
  <div id="calender-page">
    <calendar-menu
      :currentMonthIndex="currentMonthIndex"
      :currentYear="currentYear"
      :menuFuncs="menuFuncs"
    />
    <div class="container-fluid">
      <calendar-days />
      <calendar-dates
        :currentMonthIndex="currentMonthIndex"
        :currentYear="currentYear"
        :notesOfPreviousMonth="notesOfPreviousMonth"
        :notesOfCurrentMonth="notesOfCurrentMonth"
        :notesOfNextMonth="notesOfNextMonth"
        :getPreviousMonthAndYear="getPreviousMonthAndYear"
        :getNextMonthAndYear="getNextMonthAndYear"
        @seeDateDetail="seeDateDetail"
      />
    </div>

    <calendar-date-detail-modal
      :dateInModal="dateInModal"
      :contentInModal="contentInModal"
      @updateDates="updateDates"
    />
  </div>
</template>

<script>
import CalendarDates from "./CalendarDates.vue";
import CalendarDays from "./CalendarDays.vue";
import CalendarMenu from "./CalendarMenu.vue";
import CalendarDateDetailModal from "./CalendarDateDetailModal.vue";
import CalendarService from "./../../services/CalendarService";
import AuthService from "../../services/AuthService";

export default {
  components: {
    CalendarDates,
    CalendarDays,
    CalendarMenu,
    CalendarDateDetailModal,
  },
  data() {
    return {
      currentMonthIndex: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      dateInModal: {},
      contentInModal: "",
      notesOfPreviousMonth: [],
      notesOfCurrentMonth: [],
      notesOfNextMonth: [],
    };
  },
  created() {
    this.updateDates();
  },
  methods: {
    menuFuncs() {
      return {
        goToPreviousMonth: () => {
          this.currentMonthIndex--;
          if (this.currentMonthIndex == -1) {
            this.currentMonthIndex = 11;
            this.currentYear--;
          }
          this.updateDates();
        },

        goToNextMonth: () => {
          this.currentMonthIndex++;
          if (this.currentMonthIndex == 12) {
            this.currentMonthIndex = 0;
            this.currentYear++;
          }
          this.updateDates();
        },
      };
    },

    getLastDateOfCurrentMonth() {
      return new Date(
        this.currentYear,
        this.currentMonthIndex + 1,
        0
      ).getDate();
    },

    getFirstDayIndexOfCurrentMonth() {
      return new Date(this.currentYear, this.currentMonthIndex, 1).getDay();
    },

    getLastDayIndexOfCurrentMonth() {
      return new Date(this.currentYear, this.currentMonthIndex + 1, 0).getDay();
    },

    getLastDateOfPreviousMonth() {
      return new Date(this.currentYear, this.currentMonthIndex, 0).getDate();
    },

    getPreviousMonthAndYear() {
      var previousMonth = this.currentMonthIndex - 1;
      var previousYear = this.currentYear;
      if (previousMonth == -1) {
        previousMonth = 11;
        previousYear--;
      }

      return {
        monthIndex: previousMonth,
        year: previousYear,
      };
    },

    getNextMonthAndYear() {
      var nextMonth = this.currentMonthIndex + 1;
      var nextYear = this.currentYear;
      if (nextMonth == 12) {
        nextMonth = 0;
        nextYear++;
      }

      return {
        monthIndex: nextMonth,
        year: nextYear,
      };
    },

    async updateDates() {
      await this.getPreviousNotesOfPreviousMonth();
      await this.getNotesOfCurrentMonth();
      await this.getNextNotesOfNextMonth();
    },

    async getPreviousNotesOfPreviousMonth() {
      var lastDateOfPreviousMonth = this.getLastDateOfPreviousMonth();
      var numOfPreviousDates = this.getFirstDayIndexOfCurrentMonth() - 1;

      // First day is Sunday
      if (numOfPreviousDates == -1) {
        numOfPreviousDates = 6;
      }

      var previousDates = [];
      var { monthIndex, year } = this.getPreviousMonthAndYear();

      for (var i = numOfPreviousDates - 1; i >= 0; i--) {
        var date = lastDateOfPreviousMonth - i;
        var note = null;
        var isLogin = await AuthService.isHavingValidToken();
        if (isLogin) {
          note = await CalendarService.findNoteByDate(date, monthIndex, year);
        }

        previousDates.push(
          note == null
            ? {
                _id: undefined,
                date: date,
                content: "",
              }
            : {
                _id: note._id,
                date: note.date,
                content: note.content,
              }
        );
      }

      this.notesOfPreviousMonth = previousDates;
    },

    async getNotesOfCurrentMonth() {
      var lastDateOfCurrentMonth = this.getLastDateOfCurrentMonth();
      var dates = [];

      for (var date = 1; date <= lastDateOfCurrentMonth; date++) {
        var note = null;
        var isLogin = await AuthService.isHavingValidToken();
        if (isLogin) {
          note = await CalendarService.findNoteByDate(
            date,
            this.currentMonthIndex,
            this.currentYear
          );
        }

        dates.push(
          note == null
            ? {
                _id: undefined,
                date: date,
                content: "",
              }
            : {
                _id: note._id,
                date: note.date,
                content: note.content,
              }
        );
      }
      this.notesOfCurrentMonth = dates;
    },

    async getNextNotesOfNextMonth() {
      var numOfNextDates = 7 - this.getLastDayIndexOfCurrentMonth();

      // Last day is Sunday
      if (numOfNextDates == 7) {
        numOfNextDates = 0;
      }

      var nextDates = [];
      var { monthIndex, year } = this.getNextMonthAndYear();

      for (var date = 1; date <= numOfNextDates; date++) {
        var note = null;
        var isLogin = await AuthService.isHavingValidToken();
        if (isLogin) {
          note = await CalendarService.findNoteByDate(date, monthIndex, year);
        }
        nextDates.push(
          note == null
            ? {
                _id: undefined,
                date: date,
                content: "",
              }
            : {
                _id: note._id,
                date: note.date,
                content: note.content,
              }
        );
      }

      this.notesOfNextMonth = nextDates;
    },

    seeDateDetail(noteOfDate) {
      this.dateInModal = noteOfDate;
      this.contentInModal = noteOfDate.content;
    },
  },
};
</script>

<style scoped>
#calender-page {
  background-color: white;
  padding: 15px;
  min-height: 100vh;
}
</style>
