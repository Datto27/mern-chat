const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  emailId: String,
  username: String,
  avatar: String,
  admin: Boolean,
})

module.exports = mongoose.model("user", UserSchema)