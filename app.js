const express = require('express')
const path = require("path")
const session = require("express-session")
const mongoConnect = require("./util/database")
const MongoDbStore = require("connect-mongodb-session")(session)
const csrf = require("csurf")
const flash = require("connect-flash")
const multer = require('multer')

require("dotenv").config()

const Store = new MongoDbStore({
    collection: "admin_sessions",
    uri: "mongodb://127.0.0.1:27017/dashboard"
})
const csrfProtection = csrf()
// multer.diskStorage({
//     destination: (req, file, cb)=>{
//         file.size
//     }
// })

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const app = express()


app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))
app.use(multer({ fileFilter: fileFilter }).single("image"))
app.use(express.static(path.join(__dirname, "public")))
app.use(session({
    secret: "My Secret",
    resave: false,
    saveUninitialized: false,
    store: Store
}))
app.use(flash())
app.use(csrfProtection)


app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn
    res.locals.csrfToken = req.csrfToken()
    next()
})

const AuthRoutes = require("./routes/authRoutes")
const GetRoutes = require("./routes/getRoutes")
const PostRoutes = require("./routes/postRoutes")



app.use(AuthRoutes)
app.use(GetRoutes)
app.use(PostRoutes)

app.use((req, res, next) => {
    res.render("errors/404", {
        path: "/404",
        pageTitle: "Page Not Found"
    })
})

app.use((error, req, res, next) => {
    console.log(error);
    res.render("errors/500", {
        path: "/500",
        pageTitle: "An error Occured"
    })
})

mongoConnect.mongoConnect(cb => {
    app.listen(4000)
})