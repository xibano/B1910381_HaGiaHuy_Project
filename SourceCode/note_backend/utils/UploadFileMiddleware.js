const path = require("path");
const multer = require("multer");

var storage_avatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../assets/avatars/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "avatar_user_id_" + req.account_id + path.extname(file.originalname)
    );

    req.user_account_avatar =
      "avatar_user_id_" + req.account_id + path.extname(file.originalname);
  },
});

const upload_avatar = multer({
  storage: storage_avatar,
  limits: { fileSize: 1000000 },
});

module.exports = {
  upload_avatar,
};
