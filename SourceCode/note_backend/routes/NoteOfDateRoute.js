const express = require("express");
const router = express.Router();
const controller = require("./../controllers/NoteOfDateController");
const TokenUtil = require("./../utils/TokenUtil");

router.use(TokenUtil.verifyToken);

router.route("/").post(controller.createByDate);

router.route("/:id").put(controller.updateById).delete(controller.deleteById);

router.route("/date/:date/:month/:year").get(controller.findByDate);

module.exports = router;
