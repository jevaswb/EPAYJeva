const { addAdmin, getAdmin, getAdminId, logOut } = require('../controller/admin_controller')

const router = require('express').Router()

router.post('/add',addAdmin)

router.post('/get',getAdmin)

router.post('/getKey', getAdminId)

module.exports =  router