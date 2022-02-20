const express = require('express')

const Router = express.Router()
const PostController = require("../controllers/postController")
const isAuth = require("../middleware/isAuth")

Router.post("/insertproduct", isAuth, PostController.insertProduct)

Router.post("/updateproduct", isAuth, PostController.updateProduct)

Router.post("/deleteproduct", isAuth, PostController.deleteProduct)


module.exports = Router