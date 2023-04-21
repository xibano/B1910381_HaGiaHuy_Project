const express = require("express");
const router = express.Router();
const controller = require("../controllers/NoteOfScheduleController");
const TokenUtil = require("./../utils/TokenUtil");

router.use(TokenUtil.verifyToken);

router.route("/").get(controller.getNotes);

router
  .route("/createEmpty/notesAtATime")
  .post(controller.createEmptyNotesAtATime);

router.route("/ofAnAccount").delete(controller.deleteAllNotesAtATimeByAccount);

router.route("/timeId/:timeId").delete(controller.deleteNotesAtATimeById);

router.route("/update/time/timeId/:timeId").put(controller.updateTimeById);

router
  .route("/timeId/:timeId/noteId/:noteId")
  .put(controller.updateById)
  .delete(controller.deleteById);

module.exports = router;
