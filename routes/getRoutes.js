const express = require('express')
const router = express.Router()

const getController = require("../controllers/getController")
const isAuth = require("../middleware/isAuth")


router.get('/', isAuth, getController.dashboard)

router.get("/insertproduct", isAuth, getController.add)

router.get("/updateproduct", isAuth, getController.updatePage)

router.get("/updateproduct/:prodId", isAuth, getController.updateWithId)


module.exports  = router

