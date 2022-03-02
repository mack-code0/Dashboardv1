const express = require('express')
const { param } = require('express-validator')
const router = express.Router()

const getController = require("../controllers/getController")
const isAuth = require("../middleware/isAuth")


router.get('/', isAuth, getController.dashboard)

router.get("/insertproduct", isAuth, getController.add)

router.get("/updateproduct", isAuth, getController.updatePage)

router.get("/updateproduct/:prodId",
    isAuth,
    param("prodId", "Enter a valid Product Id!").isByteLength({min: 12}).isMongoId(),
    getController.updateWithId)


module.exports = router

