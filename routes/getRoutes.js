const express = require('express')
const router = express.Router()

const getController = require("../controllers/getController")


router.get('/', getController.dashboard)

router.get("/insertproduct", getController.add)

router.get("/updateproduct", getController.updatePage)

router.get("/updateproduct/:prodId", getController.updateWithId)


module.exports  = router

