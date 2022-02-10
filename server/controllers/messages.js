// models
const Messages = require("../models/messageModel")

exports.getAllMessages = (req, res) => {
  Messages.find().then((data) => {
    // console.log(data)
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
}

exports.addMessage = (req, res) => {
  const message = req.body.newMsg
  // console.log("added message: ", message)
  Messages.create(message).then(data => {
    res.json({"message created": data})
  })
  .catch(err => {
    res.json(err)
  })
}

exports.getByRoomId = (req, res) => {
  const roomId = req.params.roomId
  // res.json(roomId)
  Messages.find({"room": {_id:roomId}})
  // .populate("room")
  .then(data => {
    res.json(data)
  })
}
