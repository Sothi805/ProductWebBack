const mongoose = require("mongoose");

const UserAdmin = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  created: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("user_admin", UserAdmin);