const express = require('express')
const router  = express.Router()
const menuController = require('../controllers/menuController')

router.get('', menuController.getMenus)
router.get('/:menuId', menuController.getMenu)

module.exports = router