const express = require("express");
const router = express.Router();
const controller = require("../controllers/UserAccountController");
const { upload_avatar } = require("../utils/UploadFileMiddleware");
const TokenUtil = require("./../utils/TokenUtil");

router.use(TokenUtil.verifyToken);

router.route("/userInfo").post(controller.getUserInfo);

router
  .route("/avatar")
  .put(upload_avatar.single("avatar"), controller.updateAvatar);

router.route("/fullname").put(controller.updateFullname);

router.route("/password").put(controller.updatePassword);

module.exports = router;
