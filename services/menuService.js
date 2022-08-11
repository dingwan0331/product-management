const menuDao = require('../models/menuDao')
const { CreateError }   = require('../utils/Exceptions')
const { isPositiveInt } = require('../utils/validators')

const getMenus = async (offset, limit) => {
    offset = offset ? offset : 0
    limit  = limit ? limit : 5 
    
    if ( !isPositiveInt([offset, limit]) ){
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
    if ( !isPositiveInt([menuId]) ){throw new CreateError(400, 'Invalid menuId')}
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

const createMenu = async (data) => {
    const { categoryId, name, description, badgeId, items, tagIds } = data
    
    if(!name){throw new CreateError(400, 'Invalid Data')}

    let IntData = [categoryId,badgeId]
    
    // items의 int형 데이터와 price 숫자형 검사
    for (i=0;i < items.length; i++){
        IntData.push(items[i].sizeId)
        // price가 양수인지 판별
        if(isNaN(+items[i].price) || items[i] < 0){
            throw new CreateError(400, 'Invalid Data')
        }
    }

    tagIds.forEach(element =>{ IntData.push(element) })

    if (!isPositiveInt(IntData)){ throw new CreateError(400, 'Invalid Data') }

    const row = await menuDao.createMenu( categoryId, name, description, badgeId, items, tagIds )
    
    return
}

const deleteMenus = async (menuIds) => {
    if(!isPositiveInt(menuIds)){ throw new  CreateError(400, 'Invalid menuIds') }

    await menuDao.deleteMenus(menuIds)
    
    return
}

module.exports = { getMenus, getMenu, createMenu, deleteMenus }