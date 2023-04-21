import axios from "axios";
import AuthService from "./AuthService";

class ScheduleService {
  static async getNotes() {
    try {
      var notes = await axios.get("http://localhost:8887/noteOfSchedule", {
        params: { token: AuthService.getToken() },
      });
      return notes.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async createEmptyNotesAtATime() {
    await axios.post(
      "http://localhost:8887/noteOfSchedule/createEmpty/notesAtATime",
      {
        token: AuthService.getToken(),
      }
    );
  }

  static async updateTimeById({ timeId, newTime }) {
    await axios.put(
      `http://localhost:8887/noteOfSchedule/update/time/timeId/${timeId}`,
      {
        newTime,
        token: AuthService.getToken(),
      }
    );
  }

  static async updateNoteById({ timeId, noteId, content }) {
    await axios.put(
      `http://localhost:8887/noteOfSchedule/timeId/${timeId}/noteId/${noteId}`,
      {
        content,
        token: AuthService.getToken(),
      }
    );
  }

  static async deleteNoteById({ timeId, noteId }) {
    await axios.delete(
      `http://localhost:8887/noteOfSchedule/timeId/${timeId}/noteId/${noteId}`,
      {
        data: { token: AuthService.getToken() },
      }
    );
  }

  static async deleteNotesAtATimeById(timeId) {
    await axios.delete(
      `http://localhost:8887/noteOfSchedule/timeId/${timeId}`,
      {
        data: { token: AuthService.getToken() },
      }
    );
  }

  static async deleteAllNotesAtATimeByAccount() {
    await axios.delete("http://localhost:8887/noteOfSchedule/ofAnAccount", {
      data: { token: AuthService.getToken() },
    });
  }
}

export default ScheduleService;
