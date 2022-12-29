const express = require('express')
const router = express.Router()


const { userLogin, viewEvent, bookEvent, updateBooking, cancelBookig, updateRegistration, deleteRegistration } = require('../Controller/userLoginController')
const { checkStatus, checkUserLogin, findEvent, checkEventStatus, checkEventCapacity, checkBookingStatus, checkBookingSeat, changeEveentCapacity, changeBookingStatus, findEventforCancelBooking, changeEventCapacityAfterCancelBooking, checkStatusById } = require('../Middleware/userLoginMiddleware')

router.post('/', checkStatus, userLogin)
router.put('/', checkStatusById, updateRegistration)
router.delete('/', checkStatusById, deleteRegistration)
router.get('/Event', checkUserLogin, viewEvent)
router.post('/Event', findEvent, checkEventStatus, checkEventCapacity, bookEvent) //checkUserLogin
router.put('/Event', checkBookingStatus, checkBookingSeat, changeEveentCapacity, updateBooking)
router.delete('/Event', checkBookingStatus, changeBookingStatus, findEventforCancelBooking, changeEventCapacityAfterCancelBooking, cancelBookig)
module.exports = router