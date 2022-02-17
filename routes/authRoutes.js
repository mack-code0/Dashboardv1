const express = require('express')

const Router = express.Router()
const authController = require("../controllers/authController")

Router.get("/login", authController.getLogin)

Router.post("/login", authController.postLogin)

module.exports = Router