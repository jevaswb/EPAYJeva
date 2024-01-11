const router = require('express').Router()
const event_controller = require(`../controller/event_controller`)

router.post('/getAllNames', event_controller.getAllEventNames)
router.post('/add', event_controller.createEvent)
router.put('/edit/name', event_controller.editName)
router.put('/edit/date', event_controller.editDate)
router.put('/edit/startTime', event_controller.editStartTime)
router.put('/edit/price', event_controller.editPrice)
router.put('/edit/currency', event_controller.editCurrency)
router.delete('/delete', event_controller.deleteEvent)
router.post('/get', event_controller.getEvent)
router.post('/search', event_controller.getInfoOfParticipantsFromEvent)
router.post('/contain', event_controller.contains)


module.exports = router 