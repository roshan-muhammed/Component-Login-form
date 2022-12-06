
export function validateName(value, min, max, name = 'name') {
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
    return { status: status, message: message }
}

export function validatePassword(value, min = 6, max = 16, digits = true, special = false) {
    let message
    let status = true
    let strengthScore = 0
    let minStatus = true
    let len = max - value.length
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const strength = ['invalid', 'weak', 'good', 'strong', 'very strong', 'excellent']
    if (value === '') {
        message = `Please enter your password`
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
    } else if (!format.test(value) && special) {
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
    return { status: status, message: message, strength: strength[strengthScore] }
}

export function confirmPassword(password, confirm) {
    let status = true
    let message = ''
    if (password != confirm || password == '') {
        status = false
        message = `Passwords do not match`
    }
    return { status: status, message: message }
}

export function validatePhone(value) {
    let message = ''

    let status = true
    let format = /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/
    if (value.length < 7) {
        status = false
        message = 'Phone number should be at least 7 digits long'
    }
    if (!format.test(value)) {
        status = false
        message = `Please enter a valid phone number`
    }
    return { status: status, message: message }
}


export function validateDate(value) {
    let message = ''
    let status = true
    if (value=='') {
        status = false
        message = `Please choose a date`
    }
    console.log(value)
    return { status: status, message: message }
}

export function validateEmail(value) {
    let format = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    let message = ''
    let status = true
    if (!format.test(value)) {
        status = false
        message = `Please enter a valid email`
    }
    return { status: status, message: message }
}

export function checkFillable(fillable) {
    for(let state of fillable) {
        if (state === false) return false
    }
    return true
}

export default { validateName, validatePassword, validatePhone, validateDate, confirmPassword,checkFillable }