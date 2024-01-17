const { sendRequest, sendInformations} = require('../controller/email_controller')

const router = require('express').Router()

router.post('/request',sendRequest)
router.post('/infromations',sendInformations)

module.exports = router