const express = require('express')

const Router = express.Router()
const authController = require("../controllers/authController")
const { check } = require("express-validator")
const User = require("../models/user")

Router.get("/login", authController.getLogin)

Router.get("/signup", authController.getSignup)

Router.post("/login",
    check("email").isEmail().withMessage("Enter a valid email"),
    check("password").isLength({ min: 1 }).withMessage("Enter your  Password!"),
    authController.postLogin)

Router.post("/signup",
    check("email").isEmail().withMessage("Enter a valid email!").custom((value, { req }) => {
        return User.getUser(value)
            .then(user => {
                if (user) {
                    // User already exists
                    return Promise.reject("Email already exists!")
                }
            })
    }),
    check("password", "Passwords must contain letters and numbers and must have at least 5 characters!").isAlphanumeric().isLength({ min: 5 }),
    check("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords must match!")
        }
        return true
    }),
    authController.postSignup)

Router.post("/logout", authController.logout)

module.exports = Router