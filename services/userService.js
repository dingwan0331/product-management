const bcrypt  = require('bcrypt')
const jwt     = require('jsonwebtoken')
const dotenv  = require('dotenv')
const userDao = require('../models/userDao')
const { CreateError } = require('../utils/Exceptions')
const { Validators }  = require('../utils/validators')

dotenv.config()

const signin = async (email, password) =>{
    new Validators({
        'email'    : email,
        'password' : password
    })
    
    const userData = await userDao.getUser(email)

    if (!userData.length){throw new CreateError(400, 'Invalid Email')}

    const userPassword = userData[0].password
    
    if(!bcrypt.compareSync(password, userPassword.toString('utf-8'))){
        throw new CreateError(400,'Invalid Password')
    }
    
    const payLoad    = {'id' : userData[0].id, 'role' : userData[0].role}
    const SCERET_KEY = process.env.SCERET_KEY
    const token      = jwt.sign(payLoad, SCERET_KEY)

    return token
}

module.exports = { signin }