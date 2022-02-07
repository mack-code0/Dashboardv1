const express = require('express')
const app = express()
const path = require("path")

const mongoConnect = require("./util/database")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))

const GetRoutes = require("./routes/getRoutes")
const PostRoutes = require("./routes/postRoutes")


app.use("/admin", GetRoutes)
app.use("/admin", PostRoutes)


mongoConnect.mongoConnect(cb=>{
    console.log("connected");
    app.listen(9000)
})