const router = require("express").Router()
const  {getAllMessages, addMessage, getByRoomId} = require("../controllers/messages")


router.get("/", (req, res) => {
  res.send("messages")
})

router.get("/sync", getAllMessages)
router.post("/new", addMessage)
router.get("/get-by-room/:roomId", getByRoomId)

module.exports = router