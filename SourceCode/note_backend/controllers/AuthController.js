const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserAccount = require("./../models/UserAccount");

function validateToken(req, res) {
  if (!req.body.token) {
    return res.status(200).json(false);
  }

  try {
    jwt.verify(req.body.token, process.env.TOKEN_KEY);
    return res.status(200).json(true);
  } catch (error) {}
  return res.status(200).json(false);
}

async function login(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var account = await UserAccount.findOne({
    username: username,
    password: password,
  });

  if (account) {
    var token = jwt.sign(
      { account_id: account._id, username: account.username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    return res.status(200).json(token);
  }

  return res.status(200).json(null);
}

async function signup(req, res) {
  var account = await UserAccount.findOne({
    username: req.body.username,
  });

  if (account) {
    return res.json(null);
  }

  account = new UserAccount(req.body);
  account.save();

  return res.status(200).json(account);
}

module.exports = { validateToken, login, signup };
