const dotenv = require('dotenv')
const jwt    = require('jsonwebtoken')
const { checkUser } = require('../models/userDao')
const { CreateError } = require('../utils/Exceptions')
dotenv.config()

const validateAdmin = async (req, res, next) => {
    try{
        const { authorization } = req.headers
        const decoded = jwt.verify(authorization, process.env.SECRET_KEY)
        const row = await checkUser(decoded.id)

        if (!row.length){throw new CreateError(401, 'Invalid Token')}
        
        if (row[0].role != 'admin' || row[0].isDelete != 0){
            throw new CreateError(401, 'Invalid Token')
        }
        
        req.decoded = decoded
        
        next()
    }catch (err) {
        if (err.name == 'JsonWebTokenError'){
            return res.status(401).json({'message' : 'Invalid Token'})
        }
        if (err.isCustom){
            return res.status(err.status).json({'message' : err.message})
        }
        return res.status(500).json({'message' : 'Server Error'})
    }
}

module.exports = {
    validateAdmin
}