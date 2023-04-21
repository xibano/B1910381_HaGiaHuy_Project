const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/noteOfDate", require("./routes/NoteOfDateRoute"));
app.use("/auth", require("./routes/AuthRoute"));
app.use("/userAccount", require("./routes/UserAccountRoute"));
app.use("/noteOfSchedule", require("./routes/NoteOfScheduleRoute"));
app.use("/assets/avatars", express.static("./assets/avatars"));
app.use("/noteOfBoard", require("./routes/NoteOfBoardRoute"));

app.listen(8887, () => {
  console.log("Server is running at port 8887");
});

mongoose.connect("mongodb://127.0.0.1:27017/your-note", () => {
  console.log("MongoDB connected");
});
