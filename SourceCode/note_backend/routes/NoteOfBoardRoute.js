const express = require("express");
const router = express.Router();
const controller = require("./../controllers/NoteOfBoardController");
const TokenUtil = require("./../utils/TokenUtil");

router.use(TokenUtil.verifyToken);

router.route("/").get(controller.getNotes).post(controller.createNote);

router.route("/:id").put(controller.updateById).delete(controller.deleteById);

router.route("/id/:id/favorite/:favorite").put(controller.changeFavorite);

module.exports = router;
