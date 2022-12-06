class Validator {

    format = {
        special: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
        phone: /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/,
        email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    }
    map = [
        {
            name: 'name',
            rules: {
                min: 6,
                max: 20,
                empty: false,
                digits: false
            }
        }, {
            name: 'password',
            rules: {
                password: true,
                min: 6,
                max: 20,
                empty: false,
                digits: true,
            }
        }, {
            name: 'confirm',
            rules: {
                confirm: 'password',
            }
        }, {
            name: 'phone',
            rules: {
                tel: true,
                empty: false
            }
        }, {
            name: 'date',
            rules: {
                date: true,
                empty: false
            }
        }, {
            name: 'email',
            rules: {
                email: true,
                empty: false
            }
        }
    ]
    constructor(formElements, errorBox, map, limits) {
        this.elements = formElements
        this.errorBox = errorBox
        this.map = map
    }

    Vla

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