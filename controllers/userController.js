const userService = require('../services/userService')

const signin = async (req, res) => {
    try{
        const { email, password } = req.body

        if (!email, !password){
            return res.status(400).json({'message' : 'Key Error'})
        }

        const token = await userService.signin(email, password)

        return res.set('Authorization', token).status(200).json({'message' : 'Success'})

    }catch(err){
    if(err.isCustom){
            return res.status(err.status).json({'message' : err.message})
        }
    return res.status(500).json({'message' : 'Server Error'})
    }
}

module.exports = { signin }