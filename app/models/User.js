import validator from 'email-validator'

export default class{
    constructor(email, password) {
        this.email = ''
        this.password = ''
    }

    isValidEmail() {
        return validator.validate(this.email);
    }
}