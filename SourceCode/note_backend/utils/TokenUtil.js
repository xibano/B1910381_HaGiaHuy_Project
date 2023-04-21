const jwt = require("jsonwebtoken");
require("dotenv").config();

class TokenUtil {
  static verifyToken = (req, res, next) => {
    var token = req.query.token || req.params.token || req.body.token;

    if (!token) {
      return res.status(401).json(null);
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);

      req.account_id = decoded.account_id;
    } catch (err) {
      return res.status(401).json(null);
    }

    return next();
  };
}

module.exports = TokenUtil;
