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

const createMenu = async (req, res) => {
    try{
        const KEYS  = ['categoryId', 'name', 'description', 'badgeId', 'items', 'tagIds']

        KEYS.forEach(element => {
            if(!Object.keys(req.body).includes(element)){
                return res.status(400).json({'message' : 'Key Error'})
            }
        })

        await menuService.createMenu(req.body)

        return res.status(201).json({'message':'Created'})

    }catch(err){
        if(err.isCustom){
                return res.status(err.status).json({'message' : err.message})
            }
        return res.status(500).json({'message' : 'Server Error'})
    }
}

const deleteMenus = async (req, res) => {
    try{
        let { menuIds } = req.query
        menuIds = JSON.parse(menuIds)

        if ( menuIds == undefined || !menuIds.length || !Array.isArray(menuIds))
            { return res.status(400).json({'message' : 'Invalid menuIds'}) }
        
        await menuService.deleteMenus(menuIds)

        return res.sendStatus(204)
    }catch(err){return res.status(err.status).json({'message' : err.message})}
}

module.exports = { getMenus, getMenu, createMenu, deleteMenus }
