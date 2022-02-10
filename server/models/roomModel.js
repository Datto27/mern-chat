const mongoose = require("mongoose")


const RoomSchema = new mongoose.Schema({
  name: String,
  imageUrl: String
})

module.exports = mongoose.model("room", RoomSchema)