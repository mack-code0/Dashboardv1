const express = require('express')

const Router = express.Router()
const PostController = require("../controllers/postController")

Router.post("/insertproduct", PostController.insertProduct)

Router.post("/updateproduct", PostController.updateProduct)

Router.post("/deleteproduct", PostController.deleteProduct)


module.exports = Router