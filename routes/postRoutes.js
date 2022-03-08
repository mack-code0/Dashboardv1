const express = require('express')
const { check } = require('express-validator')

const Router = express.Router()
const PostController = require("../controllers/postController")
const isAuth = require("../middleware/isAuth")

Router.post("/insertproduct",
    isAuth,
    check("title").isLength({ min: 3 }).withMessage("Title must be more than 3 characters!"),
    check("quantity")
        .isLength({ min: 1 }).withMessage("Quantity Field cannot be empty!")
        .isNumeric().withMessage("Quantity must be numbers!"),
    check("unitprice")
    .isNumeric().withMessage("Unit Price must be numbers!")
    .isLength({ min: 1 }).withMessage("Unit Price Field cannot be empty!")
    .custom((value, { req }) => {
        if (value <= 0) {
            throw new Error("Unit Price must be a number higher than 0")
        }
        return true
    }),
    check("imageurl").isLength({ min: 2 }).withMessage("Product Image url must be at least 2 characters long!"),
    check("description").isLength({ min: 10 }).withMessage("Product Description must be at least 10 characters long!"),
    check("tag").isLength({ min: 2 }).withMessage("Product Tag must be at least 2 characters long!"),
    check("category").isLength({ min: 2 }).withMessage("Product Category must be at least 2 characters long!"),
    PostController.insertProduct)


Router.post("/updateproduct",
    isAuth,
    check("prodId", "Invalid Credentials").isByteLength({ min: 12 }).isMongoId(),
    check("title").isLength({ min: 3 }).withMessage("Title must be more than 3 characters!"),
    check("unitprice")
        .isNumeric().withMessage("Unit Price must be numbers!")
        .isLength({ min: 1 }).withMessage("Unit Price Field cannot be empty!")
        .custom((value, { req }) => {
            if (value <= 0) {
                throw new Error("Unit Price must be a number higher than 0")
            }
            return true
        }),
    check("oldprice").isLength({ min: 1 }).withMessage("Check your entries!"),
    check("quantity")
        .isLength({ min: 1 }).withMessage("Quantity Field cannot be empty!")
        .isNumeric().withMessage("Quantity must be numbers!"),
    check("imageurl").isLength({ min: 2 }).withMessage("Product Image url must be at least 2 characters long!"),
    check("tag").isLength({ min: 2 }).withMessage("Product Tag must be at least 2 characters long!"),
    check("category").isLength({ min: 2 }).withMessage("Product Category must be at least 2 characters long!"),
    check("description").isLength({ min: 10 }).withMessage("Product Description must be at least 10 characters long!"),
    PostController.updateProduct)

Router.post("/deleteproduct", isAuth,
check("prodId", "Invalid Credentials").isByteLength({ min: 12 }).isMongoId(),
PostController.deleteProduct)


module.exports = Router