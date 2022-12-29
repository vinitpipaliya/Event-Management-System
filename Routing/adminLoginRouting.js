const express = require('express')
const router = express.Router()
const { viewRecord, adminLogin, updateRecord, deleteRecord, createEvent, viewEvent, updateEvent, deleteEvent } = require('../Controller/adminLoginController')
const { checkAdminLogin, checkUserDatabase, checkEventDatabase, } = require("../Middleware/adminLoginMiddleware")
router.post('/', adminLogin)
router.get('/', checkAdminLogin, checkUserDatabase, viewRecord)
router.put('/', checkAdminLogin, checkUserDatabase, updateRecord)
router.delete('/', checkAdminLogin, checkUserDatabase, deleteRecord)
router.post('/Event', checkAdminLogin, createEvent)
router.get('/Event', checkAdminLogin, viewEvent)
router.put('/Event', checkAdminLogin, updateEvent)
router.delete('/Event', checkAdminLogin, deleteEvent)

module.exports = router;