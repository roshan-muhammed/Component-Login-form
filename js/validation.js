

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

export function validatePassword(value, min = 6, max = 16, digits = true, special = true) {
    let message
    let status = true
    let strengthScore = 0
    let len = max - value.length
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const strength = ['invalid', 'weak', 'good', 'strong', 'very strong', 'excellent']
    if (value === '') {
        message = `Please enter your password`
        status = false
    } else if (value.length < min) {
        message = `Should be at least ${min} characters`
        status = false
    } else if (value.length > max) {
        message = `Should be at most ${max} characters`
        status = false
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
    if (len > 3 && len < 7) strengthScore++
    else if (len > 7) strengthScore += 2
    if (/[A-Z]/.test(value)) strengthScore++
    if (/[0-9]/.test(value)) strengthScore++
    if (format.test(value)) strengthScore++
    return { status: status, message: message, strength: strength[strengthScore] }
}

export default { validateName, validatePassword }