const router = require('express').Router()
const allocation_controller = require('../controller/allocation_controller')

router.post('/add',allocation_controller.addAllocation)

module.exports =  router 