const jwt = require("jsonwebtoken");

const sign = (payload) =>
  jwt.sign(payload, "SECRET_KEY_Boladi", {
    expiresIn: 66600,
  });
module.exports = {
  sign,
};
