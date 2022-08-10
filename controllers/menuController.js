const menuService = require('../services/menuService')

const getMenus = async (req, res) => {
    try{
        let { offset, limit} = req.query

        const result = await menuService.getMenus(offset, limit)

        return res.status(200).json({'menus' : result})

    }catch(err){
        if(err.isCustom){
                return res.status(err.status).json({'message' : err.message})
            }
        return res.status(500).json({'message' : 'Server Error'})
    }
}
const getMenu = async (req, res) => {
    const { menuId } = req.params
    try{
        const result = await menuService.getMenu(menuId)
        
        return res.status(200).json({'menu' : result})

    }catch(err){
        if(err.isCustom){
                return res.status(err.status).json({'message' : err.message})
            }
        return res.status(500).json({'message' : 'Server Error'})
    }
}

module.exports = { getMenus, getMenu }
