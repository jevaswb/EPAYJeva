const router = require('express').Router()
const participant_controller = require('../controller/participant_controller')

router.post('/getAllScreenNames', participant_controller.getAllParticipantScreenNames)
router.post('/add', participant_controller.createParticipant)
router.put('/edit/screenName', participant_controller.editParticipantScreenName)
router.put('/edit/email', participant_controller.editParticipantEmail)
router.delete('/delete', participant_controller.deleteParticpant)
router.post('/get', participant_controller.getParticipant)
router.post('/pay', participant_controller.participantPaysEvent)
router.post('/search', participant_controller.getInfoOfEventsFromParticipant)
router.post('/contain',participant_controller.contains)

module.exports = router 