const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Pusher = require("pusher")
const cookieSession = require("cookie-session")
const passport = require("passport")
require("dotenv").config()
// routes
const MessageRoute = require("./routes/messageRoute")
const RoomRoute = require("./routes/roomRoute")
const AuthRoute = require("./routes/authRoute")

// app config
const app = express()
const port = process.env.PORT || 4000
const pusher = new Pusher({
  appId: process.env.PUSHER_ID,
  key: process.env.PUSHER_KEY,
  secret: "2252112512c429577906",
  cluster: "eu",
  useTLS: true
});

// -------------- db config ---------------
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log("db connected")
  })
  .catch(err => {
    console.error("db connection error:  ", err)
  })

// -------------- middleware --------------
app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000", // allow to server to accept request from different origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // allow session cookie from browser to pass through
}));
// use cookies for save google user
app.use(cookieSession({
  maxAge: 24*60*60*1000, // one day
  keys: ["adiosmortalcombat"]  // encrypt_id
}))
// initialize passport
app.use(passport.initialize())
app.use(passport.session())


// axlad sheqmnili msg-s aghsaqmelad
const db = mongoose.connection
// rodesac db connection gaxsnilia -> ()=>{}
db.once("open", () => {
  // db.collection(sheqmnili collection -- messages)
  const msgCollection = db.collection("messages")
  const changeStream = msgCollection.watch()
  // collection-is cvlilebaze amoqmeddeba
  changeStream.on("change", (change) => {
    // console.log("change occured ==> ", change)
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument
      console.log("pusher message details: ", messageDetails)
      pusher.trigger("messages", "inserted", {
        user: messageDetails.user,
        userEmail: messageDetails.userEmail,
        text: messageDetails.text,
        timestamp: messageDetails.createdAt
      })
    } else {
      console.log("error on triggered pusher")
    }
  })
})

// ------------- routes ---------------
app.get("/", (req, res) => {
  res.status(200).send("hello here")
})
app.use("/api/messages", MessageRoute)
app.use("/api/rooms", RoomRoute)
app.use("/auth", AuthRoute)

// listener
app.listen(process.env.PORT || port, () => {
  console.log(`server started on ${port}`)
})