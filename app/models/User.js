import validator from 'email-validator'

export default class{
    constructor() {
        this.email = ''
        this.password = ''
    }

    isValidEmail() {
        return validator.validate(this.email);
    }
}