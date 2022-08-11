const express = require('express')
const router  = express.Router()
const menuController = require('../controllers/menuController')

router.post('/menus', menuController.createMenu)

router.delete('/menus', menuController.deleteMenus)

module.exports = router