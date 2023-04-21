import axios from "axios";
import AuthService from "./AuthService";

class CalendarService {
  static async findNoteByDate(date, monthIndex, year) {
    try {
      var note = await axios.get(
        `http://localhost:8887/noteOfDate/date/${date}/${
          monthIndex + 1
        }/${year}`,
        { params: { token: AuthService.getToken() } }
      );

      if (note.data._id) {
        return note.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async createNoteByDate(note) {
    try {
      await axios.post("http://localhost:8887/noteOfDate", {
        token: AuthService.getToken(),
        ...note,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateNoteById({ _id, content }) {
    await axios.put(`http://localhost:8887/noteOfDate/${_id}`, {
      content: content,
      token: AuthService.getToken(),
    });
  }

  static async deleteNoteById(_id) {
    await axios.delete(`http://localhost:8887/noteOfDate/${_id}`, {
      data: { token: AuthService.getToken() },
    });
  }
}

export default CalendarService;
