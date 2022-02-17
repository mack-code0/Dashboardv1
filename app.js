const express = require('express')
const path = require("path")
const session = require("express-session")
const mongoConnect = require("./util/database")
const MongoDbStore = require("connect-mongodb-session")(session)
const User = require("./models/user")
const getDb = require("./util/database").db

const Store = new MongoDbStore({
    collection: "admin_sessions",
    uri: "mongodb://127.0.0.1:27017/dashboard"
})

const app = express()

app.set("view engine", "ejs")
app.use(session({
    secret: "My Secret",
    resave: false,
    saveUninitialized: false,
    store: Store
}))
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))


const AuthRoutes = require("./routes/authRoutes")
const GetRoutes = require("./routes/getRoutes")
const PostRoutes = require("./routes/postRoutes")



app.use(AuthRoutes)
app.use(GetRoutes)
app.use(PostRoutes)


mongoConnect.mongoConnect(cb=>{
    let db = getDb()
    db.collection("admin_users").findOne()
    .then(result=>{
        if(!result){
            const newUser = new User("Macaulay", "mac@email.com")
            newUser.save()
        }
        app.listen(3000)
    })
})