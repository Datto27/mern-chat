const Rooms = require("../models/roomModel")


exports.createRoom = (req, res) => {
  Rooms.create(req.body).then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json({error: err})
  }) 
}

exports.getRooms =(req, res) => {
  Rooms.find().then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json({error: err})
  })
}

exports.getSpecificRoom = (req, res) => {
  // console.log(req.params)
  const roomId = req.params.id
  Rooms.find({_id:roomId}).then(data => {
    res.json(data)
  })
  .catch(err => {
    console.log(err)
  })
}

exports.deleteRoom = (req, res) => {
  const roomId = req.params.roomId
  // res.json(roomId)
  Rooms.findOneAndDelete({_id:roomId}).then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json({error: err})
  })
}
