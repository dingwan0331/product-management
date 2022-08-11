const myDataSource    = require('../config/database/mysql')
const { CreateError } = require('../utils/Exceptions')

const getUser = async (email) => {
    try{
        return await myDataSource.query(
            `SELECT users.id, users.password, 
            roles.name AS role
            FROM users LEFT JOIN roles ON users.role_id=roles.id
            WHERE email="${email}";`
        )
    }catch(err){throw new CreateError(500,'Database Error')}
}

const checkUser = async (userId) => {
    try{
        return await myDataSource.query(
            `SELECT users.id,
            roles.name AS role,
            users.is_deleted AS isDelete
            FROM users LEFT JOIN roles ON users.role_id=roles.id
            WHERE users.id=${userId};`
        )
    }catch(err){console.log(err);throw new CreateError(500,'Database Error')}
}
module.exports = { getUser, checkUser }