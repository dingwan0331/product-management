const menuDao = require('../models/menuDao')
const { CreateError } = require('../utils/Exceptions')

const getMenus = async (offset, limit) => {
    offset = offset ? offset : 0
    limit  = limit ? limit : 5 
    
    if (isNaN(+offset) || isNaN(+limit)){
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

module.exports = { getMenus }