const express = require('express')
const router  = express.Router()
const user    = require('./users')
const menu    = require('./menus')
const admin   = require('./admin')
const auth    = require('../middlewares/auth')

router.use('/users', user)
router.use('/menus', menu)
router.use('/admin', auth.validateAdmin, admin)

module.exports = router