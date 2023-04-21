import axios from "axios";
import AuthService from "./AuthService";

class BoardService {
  static async getNotes() {
    try {
      var notes = await axios.get("http://localhost:8887/NoteOfBoard/", {
        params: { token: AuthService.getToken() },
      });

      return notes.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async createNote(note) {
    try {
      await axios.post("http://localhost:8887/noteOfBoard", {
        token: AuthService.getToken(),
        ...note,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async changeNoteFavorite(id, favorite) {
    try {
      await axios.put(
        `http://localhost:8887/NoteOfBoard/id/${id}/favorite/${favorite}`,
        {
          token: AuthService.getToken(),
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async updateNoteById({ id, title, content }) {
    await axios.put(`http://localhost:8887/noteOfBoard/${id}`, {
      title,
      content,
      token: AuthService.getToken(),
    });
  }

  static async deleteNote(id) {
    try {
      await axios.delete(`http://localhost:8887/NoteOfBoard/${id}`, {
        data: { token: AuthService.getToken() },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default BoardService;
