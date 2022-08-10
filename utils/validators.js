const { CreateError } = require("./Exceptions")

class Validators{
    constructor(userInfo){
        this.config = {
            'email'    : this.validateEmail,
            'password' : this.validatePassword
        }
        Object.keys(userInfo).forEach(element=>{
            this.config[element](userInfo.element)
        })
    }

    validateEmail = (value) => {
        const regex = new RegExp('/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/')
        if (regex.test(value)){
            throw new CreateError(400, 'Inavlid Email')
        }
    }

    validatePassword = value => {
        const regex = new RegExp('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/')
        if (regex.test(value)){
            throw new CreateError(400, 'Inavlid Password')
        }
    }
}

module.exports = { Validators }