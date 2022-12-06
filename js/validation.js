class Validator {

    format = {
        special: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
        phone: /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/,
        email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    }
    funcMap = {
        min: `this.min`,
        max: `this.max`,
        empty: `this.empty`,
        digits: `this.digits`,
        special: `this.special`,
        password: `this.password`,
        confirm: `this.confirm`,
        email: `this.email`,
        tel: `this.tel`,
    }
    map = [
        {
            name: 'name',
            status: 'unset',
            rules: {
                min: { func: `this.min`, value: 3, message: 'Name must be at least 3 characters' },
                max: { func: `this.max`, value: 20, message: 'Name must be at most 20 characters' },
                empty: { func: `this.empty`, value: false, message: 'Name must not be empty' },
                digits: { func: `this.digits`, value: false, message: 'Name can only contain alphabets' },
                special: { func: `this.empty`, values: false, message: 'Name can only contain alphabets' }
            }
        }, {
            name: 'password',
            status: 'unset',
            rules: {
                password: true,
                min: { func: `this.min`, value: 6, message: 'password must be at least 6 characters' },
                max: { func: `this.max`, value: 16, message: 'password cannot be over 16 characters' },
                empty: { func: `this.empty`, value: false, message: 'password must not be empty' },
                digits: { func: `this.digits`, value: true, message: 'password should contain at least one digit' },
            }
        }, {
            name: 'confirm',
            status: 'unset',
            rules: {
                confirm: { func: `this.confirm`, points: 'password', message: 'passwords does not match' },
            }
        }, {
            name: 'phone',
            status: 'unset',
            rules: {
                tel: { func: `this.tel`, value: true, message: 'Please enter a valid phone number' },
                empty: { func: `this.empty`, value: false, message: 'Phone number cannot be empty' }
            }
        }, {
            name: 'date',
            status: 'unset',
            rules: {
                empty: { func: `this.empty`, value: false, message: 'Please choose a date' }
            }
        }, {
            name: 'email',
            status: 'unset',
            rules: {
                email: { func: `this.email`, value: true, message: 'Please enter an email address' },
                empty: { func: `this.empty`, value: false, message: 'Email cannot be empty' }
            }
        }
    ]
    constructor(formElements, errorBox, map) {
        this.elements = formElements
        this.errorBox = errorBox
        if (map != undefined) this.map = map
    }

    // setRules() {
    //     for (let i in this.map) {
    //         if (this.map[i].rules.hasOwnProperty('min')) {
    //             this.map[i].rules.min.func = `this.func`
    //         }
    //     }
    // }

    validate(element, item) {
        // let result = true
        for (let i in item.rules) {
            eval(`${item.rules[i].func}(element.value,item.rules[i])`)
        }
    }
    // Declared Usable Rules 
    min(value, handle) {
        if (value.length < handle.value) {
            return handle.message
        }
        return false
    }

    max(value, handle) {
        if (value.length > handle.value) {
            return handle.message
        }
        return false
    }

    empty(value, handle) {
        if (value === '') {
            return handle.message
        }
        return false
    }

    digits(value, handle) {
        if (/[0-9]/.test(value)) {
           return handle.message
        }

    }

    special(value, handle) {
        if (this.format.special.test(value) && handle.value) {
            return handle.message
        }
    }


    validateName(value, min, max, name = 'name') {
        let status = true
        let message = `valid ${name}`
        if (value === '') {
            status = false
            message = `Please enter your ${name}`
        } else if (/[0-9]/.test(value)) {
            status = false
            message = `${name} can't contain digits`
        } else if (value.length < min) {
            status = false
            message = `${name} should be at least ${min} characters`
        } else if (value.length > max) {
            status = false
            message = `${name} can't be over ${max} characters`
        }
        if (status) message = ''
        this.fillable[name] = status
        return { status: status, message: message }
    }

    validatePassword(value, min = 6, max = 16, digits = true, special = false, name = 'password') {
        let message
        let status = true
        let strengthScore = 0
        let minStatus = true
        let len = max - value.length
        const strength = ['invalid', 'weak', 'good', 'strong', 'very strong', 'excellent']
        if (value === '') {
            this.message.email = `Please enter your password`
            status = false
            minStatus = false
        } else if (value.length < min) {
            message = `Should be at least ${min} characters`
            status = false
            minStatus = false
        } else if (value.length > max) {
            message = `Password can't be over ${max} characters`
            status = false
            minStatus = false
            strengthScore = 0
        } else if (!/[A-Z]/.test(value)) {
            status = false
            message = `Should contain 1 upper case letter`
        } else if (!/[0-9]/.test(value) && digits) {
            message = `Should contain at least 1 digit`
            status = false
        } else if (!this.format.special.test(value) && special) {
            message = `Should contain at least 1 special character`
            status = false
        }
        if (len > 0) {
            if (len < 3) strengthScore += 2
            else if (len < 7) strengthScore++

        }
        if (minStatus && /[A-Z]/.test(value)) strengthScore++

        if (minStatus && /[0-9]/.test(value)) strengthScore++


        if (minStatus && format.test(value)) strengthScore++
        this.fillable[name] = status
        return { status: status, message: message, strength: strength[strengthScore] }
    }

    confirmPassword(password, confirm, name = 'confirm') {
        let status = true
        let message = ''
        if (password != confirm || password == '') {
            status = false
            message = `Passwords do not match`
        }

        this.fillable[name] = status
        return { status: status, message: message }
    }

    validatePhone(value, name = 'phone') {
        let message = ''

        let status = true
        if (value.length < 7) {
            status = false
            this.message.email = 'Phone number should be at least 7 digits long'
        }
        if (!this.format.phone.test(value)) {
            status = false
            message = `Please enter a valid phone number`
        }

        this.fillable[name] = status
        return { status: status, message: message }
    }


    validateDate(value, name = 'date') {
        let message = ''
        let status = true
        if (value == '') {
            status = false
            message = `Please choose a date`
        }
        this.fillable[name] = status
        return { status: status, message: message }
    }

    validateEmail(value, name = 'email') {
        let message = ''
        let status = true
        if (!this.format.email.test(value)) {
            status = false
            message = `Please enter a valid email`
        }
        this.fillable[name] = status
        return { status: status, message: message }
    }

    checkFillable() {
        for (let state in this.fillable) {
            if (this.fillable[state] === false) return false
        }
        return true
    }

    showError(error, item) {
        if (!error.status) {
            this.errorBox
        }
    }
}

export default Validator