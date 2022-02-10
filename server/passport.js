// https://www.passportjs.org/packages/passport-google-oauth20/
const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()
// models
const Users = require("./models/userModel")


passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile.displayName, profile.emails[0].value)
    const username = profile.displayName
    const emailId = profile.id
    const email = profile.emails[0].value
    const avatar = profile.photos[0].value
    // console.log(avatar, typeof avatar)

    Users.create({username:username, email:email, avatar:avatar, emailId:emailId, admin:false})
      .then((data) => {
        console.log("user created: ", data)
        // done() - go on the next stage
        done(null, profile)
      })
      .catch((err) => {
        console.log(err)
        done(null, profile)
      })
  }
));

// using cookies for save user info
passport.serializeUser((user, done) => {
  console.log("serialize user: ", user)
  // sending only id for the cookies
  done(null, user)
})
passport.deserializeUser((user, done) => {
  // console.log("deser user: ", user.id)
  // done(null, user)
  const userEmailID = user.id
  Users.find({emailId: userEmailID}).then((foundUser) => {
    done(null, foundUser)
  })
})
