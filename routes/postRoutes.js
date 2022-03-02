const express = require('express')
const { check } = require('express-validator')

const Router = express.Router()
const PostController = require("../controllers/postController")
const isAuth = require("../middleware/isAuth")

Router.post("/insertproduct", isAuth, PostController.insertProduct)

Router.post("/updateproduct",
    isAuth,
    check("prodId").custom((value, { req })=>{
        
    }),
    check("title").isLength({min: 3}).withMessage("Title must be more than 3 characters!"),
    PostController.updateProduct)

Router.post("/deleteproduct", isAuth, PostController.deleteProduct)


module.exports = Router