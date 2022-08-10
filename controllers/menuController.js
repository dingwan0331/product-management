const menuService = require('../services/menuService')

const getmenus = async (req, res) => {
    try{
        let { offset, limit} = req.query

        const result = await menuService.getmenus(offset, limit)

        res.status(200).json({'menus' : result})

    }catch(err){console.log(err)
        if(err.isCustom){
                return res.status(err.status).json({'message' : err.message})
            }
        return res.status(500).json({'message' : 'Server Error'})
    }
}

module.exports = { getmenus }