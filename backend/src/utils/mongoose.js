const mongoose = require("mongoose");

const mongo = async () => {
  try {
    return await mongoose.connect(process.env.DB_URI);
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongo;
