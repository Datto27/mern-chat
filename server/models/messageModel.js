const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
  user: String,
  text: String,
  userEmail: String,
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room"
  }
}, {timestamps:true})

// collection
module.exports = mongoose.model("message", MessageSchema)