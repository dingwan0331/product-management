const express = require('express')
const router  = express.Router()
const user    = require('./users')
const menu = require('./menus')

router.use('/users', user)
router.use('/menus', menu)

module.exports = router