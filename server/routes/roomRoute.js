const router = require('express').Router()
const {createRoom, getRooms, deleteRoom, getSpecificRoom} = require("../controllers/room")


router.post("/create", createRoom)
router.get("/get-all", getRooms)
router.get("/specific-room/:id", getSpecificRoom)
router.delete("/delete/:roomId", deleteRoom)
router.get("/specific-room/default-message", (req, res) => {
  res.json([
    {user: "test", userEmail:"", text: "abcd"}
  ])
})

module.exports = router