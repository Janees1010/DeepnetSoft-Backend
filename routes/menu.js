const express = require('express')
const router = express.Router()
const {
      fetchAllMenus,
      addNewMenu,
      fetchMenuItems
    } = require('../controllers/menu')

router.get('/menu/:menuId',fetchMenuItems)
router.post('/menu',addNewMenu)
router.get('/menu',fetchAllMenus)
 
  
module.exports = router             