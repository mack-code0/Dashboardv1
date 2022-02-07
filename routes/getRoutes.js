const express = require('express')
const router = express.Router()

const getController = require("./../controllers/getControllers")


router.get('/', getController.dashboard)

router.get("/insertproduct", getController.add)


router.get("/updateproduct/", getController.update_1)
router.get("/updateproduct/:prodId", getController.update)


module.exports  = router

