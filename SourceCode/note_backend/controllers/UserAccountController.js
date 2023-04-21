const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserAccount = require("./../models/UserAccount");
const fs = require("fs");

async function getUserInfo(req, res) {
  try {
    var account = await UserAccount.findById(req.account_id);

    if (account) {
      return res.status(200).json({
        username: account.username,
        fullname: account.fullname,
        avatar: account.avatar,
      });
    }
  } catch (error) {}
  return res.status(200).json(null);
}

async function updateAvatar(req, res) {
  await UserAccount.updateOne(
    { _id: req.account_id },
    { $set: { avatar: req.user_account_avatar ?? "" } }
  );

  if (!req.user_account_avatar) {
    var avatarPath =
      __dirname + "/../assets/avatars/avatar_user_id_" + req.account_id;

    try {
      fs.unlinkSync(avatarPath + ".jpeg");
    } catch (e) {}
    try {
      fs.unlinkSync(avatarPath + ".jpg");
    } catch (e) {}
    try {
      fs.unlinkSync(avatarPath + ".png");
    } catch (e) {}
  }

  res.status(200).json("Update avatar success!");
}

async function updateFullname(req, res) {
  await UserAccount.updateOne(
    { _id: req.account_id },
    { $set: { fullname: req.body.fullname } }
  );

  res.status(200).json("Update fullname success!");
}

async function updatePassword(req, res) {
  var account = await UserAccount.findOne({
    _id: req.account_id,
    password: req.body.oldPassword,
  });

  if (!account) {
    return res.status(200).json(false);
  }

  await UserAccount.updateOne(
    { _id: req.account_id },
    { $set: { password: req.body.newPassword } }
  );
  res.status(200).json(true);
}

module.exports = { getUserInfo, updateAvatar, updateFullname, updatePassword };
