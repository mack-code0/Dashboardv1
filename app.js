const express = require('express')
const path = require("path")
const session = require("express-session")
const mongoConnect = require("./util/database")
const MongoDbStore = require("connect-mongodb-session")(session)
const csrf = require("csurf")
const User = require("./models/user")
const getDb = require("./util/database").db

const Store = new MongoDbStore({
    collection: "admin_sessions",
    uri: "mongodb://127.0.0.1:27017/dashboard"
})
const csrfProtection = csrf()

const app = express()


app.set("view engine", "ejs")
app.use(session({
    secret: "My Secret",
    resave: false,
    saveUninitialized: false,
    store: Store
}))
app.use(csrfProtection)

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))
app.use((req, res, next)=>{
    res.locals.csrfToken = req.csrfToken()
    next()
})


const AuthRoutes = require("./routes/authRoutes")
const GetRoutes = require("./routes/getRoutes")
const PostRoutes = require("./routes/postRoutes")



app.use(AuthRoutes)
app.use(GetRoutes)
app.use(PostRoutes)


mongoConnect.mongoConnect(cb=>{
    app.listen(3000)
})