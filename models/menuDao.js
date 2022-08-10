const myDataSource    = require('../config/database/mysql')
const { CreateError } = require('../utils/Exceptions')

const dbError = new CreateError(500,'Database Error')

const getMenus = async (offset, limit) => {
    try{
        const menus = await myDataSource.query(
            `SELECT 
            menus.id,
            categories.name AS category,
            menus.name,
            menus.description,
            menus.is_sold AS isSold,
            badges.name AS badge
            FROM menus 
            LEFT JOIN categories ON menus.category_id=categories.id
            LEFT JOIN badges ON menus.badge_id=badges.id 
            ORDER BY rand() LIMIT ${limit} OFFSET ${offset};`
        )

        let menusId = []

        if (!menus.length){return menus}

        menus.forEach(element => {
            menusId.push(element.id)
        })

        const items = await myDataSource.query(
            `SELECT items.id,
            menus.id AS menuId,
            sizes.kor_name AS name,
            sizes.name AS size,
            items.price,
            items.is_sold AS isSold
            FROM items
            LEFT JOIN sizes ON items.size_id=sizes.id
            LEFT JOIN menus ON items.menu_id=menus.id
            WHERE items.menu_id IN (SELECT menus.id FROM menus WHERE menus.id IN (${menusId}))`
        )

        const tags = await myDataSource.query(
            `SELECT tags.id,
            menus.id AS menuId,
            tags.name,
            tag_types.name AS type
            FROM tags
            LEFT JOIN tag_types ON tags.type_id=tag_types.id
            LEFT JOIN menus ON menus.tag_id=tags.id
            WHERE tags.id IN (SELECT menus.tag_id FROM menus WHERE menus.id IN (${menusId}))`
        )
        return { menus, items, tags}

    }catch(err){ throw dbError }
}

const getMenu = async (menuId) => {
    try{
        const menus = await myDataSource.query(
            `SELECT 
            menus.id,
            categories.name AS category,
            menus.name,
            menus.description,
            menus.is_sold AS isSold,
            badges.name AS badge
            FROM menus
            LEFT JOIN categories ON menus.category_id=categories.id
            LEFT JOIN badges ON menus.badge_id=badges.id WHERE menus.id=${menuId};`
        )
        
        if (!menus.length){throw new CreateError(400, 'Invalid menuId')}

        const items = await myDataSource.query(
            `SELECT items.id,
            menus.id AS menuId,
            sizes.kor_name AS name,
            sizes.name AS size,
            items.price,
            items.is_sold AS isSold
            FROM items
            LEFT JOIN sizes ON items.size_id=sizes.id
            LEFT JOIN menus ON items.menu_id=menus.id
            WHERE items.menu_id IN (SELECT menus.id FROM menus WHERE menus.id = ${menuId});`
        )

        const tags = await myDataSource.query(
            `SELECT tags.id,
            menus.id AS menuId,
            tags.name,
            tag_types.name AS type
            FROM tags
            LEFT JOIN tag_types ON tags.type_id=tag_types.id
            LEFT JOIN menus ON menus.tag_id=tags.id
            WHERE tags.id IN (SELECT menus.tag_id FROM menus WHERE menus.id = ${menuId})`
        )

        return { menus, items, tags}

    }catch(err){
        if (err.isCustom){ throw err }else{ throw dbError } 
    }
}

const createMenu = async ( categoryId, name, description, badgeId, items, tagIds ) => {
    try{
        await myDataSource.query(`START TRANSACTION`)
        // menuData 생성
        const menuRow = await myDataSource.query(
            `INSERT INTO menus (category_id, name, description, badge_id) values (?,?,?,?)`,
            [categoryId, name, description, badgeId]
            )
            
        const menuId = menuRow.insertId 
        
        let menuTagQuery
        
        // tagIds가 있을시 tags bulk create 쿼리문작성
        if (tagIds){
            menuTagQuery = `INSERT INTO menu_tag (menu_id, tag_id) values `
            for (i=0; i < tagIds.length; i++){
                menuTagQuery += `(${menuId}, ${tagIds[i]}),`
            }
        }
        // 마지막 ',' 제거후 쿼리문 실행
        await myDataSource.query(menuTagQuery.slice(0,-1))
        
        // items bulk create 쿼리문작성
        let itemsQuery = `INSERT INTO items (menu_id, size_id, price) values`
        for (i=0; i < items.length; i++){
            itemsQuery += `(${menuId}, ${items[i].sizeId}, ${items[i].price}),`
        }
        // 마지막 ',' 제거후 쿼리문 실행
        await myDataSource.query(itemsQuery.slice(0,-1))
        
        await myDataSource.query('COMMIT;')
        return 
    
    }catch(err){
        await myDataSource.query('ROLLBACK;')
        throw dbError
    }
}

module.exports = { getMenus, getMenu, createMenu }