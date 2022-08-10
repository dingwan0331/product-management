const menuDao = require('../models/menuDao')
const { CreateError }   = require('../utils/Exceptions')
const { isPositiveInt } = require('../utils/validators')

const getMenus = async (offset, limit) => {
    offset = offset ? offset : 0
    limit  = limit ? limit : 5 
    
    if ( isPositiveInt([offset, limit]) ){
        throw new CreateError(400,'Invalid Query')
    }

    const { menus, items, tags } = await menuDao.getMenus(offset, limit)
    
    let result = []
    
    if(!menus){ return retuls }
    
    menus.forEach(element => {
        element.items = []
        for(i=0;i<items.length;i++){
            if(items[i].menuId == element.id){
                element.items.push(items[i])
            }
        }

        element.tags = []
        for(i=0;i<tags.length;i++){
            if(tags[i].menuId == element.id){
                element.tags.push(tags[i])
            }
        }
        result.push(element)
    });
    
    return result
}

const getMenu = async (menuId) => {
    if (isPositiveInt([menuId]) ){throw new CreateError(400, 'Invalid menuId')}
    let { menus, items, tags } = await menuDao.getMenu(menuId)
    let result = menus[0]
    
    result.items = []
    for(i=0;i<items.length;i++){
        result.items.push(items[i])
    }
    
    result.tags = []
    for(i=0;i<tags.length;i++){
        result.tags.push(tags[i])
    }

    return result
}

module.exports = { getMenus, getMenu }