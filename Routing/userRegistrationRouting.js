const express = require('express')
const router = express.Router();
const { registration } = require('../Controller/userRegitrationController')

router.post('/', registration)
module.exports = router 