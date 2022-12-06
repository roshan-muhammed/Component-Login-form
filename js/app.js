'use strict'
import z from './validation.js'
const passwordStrength = document.querySelector('#password-strength')
const passwordHintGroup = document.querySelector('.password-hint-group')
const formElements = document.querySelectorAll('.validate')
const errorBox = document.querySelectorAll('.error-msg')
const navToggle = document.querySelector('.nav-toggle')
const navMenu = document.querySelector('#nav-menu')
const header = document.querySelector('header')
const formButton = document.querySelector('#form-button')
const validateIcon = document.querySelectorAll('.validate-icon-e')
let validated = false
let fillable = []
accessibility()

window.addEventListener('resize', () => {
    accessibility()
})

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show')
    document.body.classList.toggle('no-scroll')
    header.style.setProperty('--height', `${header.offsetHeight}px`)
})


function accessibility() {
    if (window.outerWidth <= 500) {
        navToggle.setAttribute("aria-hidden", "false")
    } else {
        navToggle.setAttribute("aria-hidden", "true")
    }
}

formButton.addEventListener('click', prevent)

for (let i = 0; i < formElements.length; i++) {
    formElements[i].addEventListener("input", () => { validateItems(i) })
}

function prevent(event) {
    event.preventDefault()
    if (!validated) {
        for (let i in formElements) {
            validateItems(i) && validated++
        }
        if (validated = formElements.length) formButton.click()
    } else {
        formButton.click()
    }
}

function showError(error, i) {
    if (!error.status) {
        errorBox[i].innerHTML = error.message
        validateIcon[i].setAttribute('src', 'images/delete.png')
    } else {
        errorBox[i].innerHTML = ''
        validateIcon[i].setAttribute('src', 'images/check.png')
    }
    return error.status
}

function validateItems(i) {

    
    if (validateIcon[i].classList != undefined) {
        validateIcon[i].classList.remove('hidden')
    }

    if (formElements[i].name == 'name') {
        fillable[i] = showError(z.validateName(formElements[i].value, 3, 16), i)
    }

    else if (formElements[i].name == 'password') {
        passwordHintGroup.classList.remove('hidden')
        let error = z.validatePassword(formElements[i].value)

        fillable[i] = showError(error, i)
        passwordStrength.innerHTML = error.strength
        passwordStrength.className = error.strength
    }
    else if (formElements[i].name == 'confirm') {
        fillable[i] = showError(z.confirmPassword(formElements[i - 1].value, formElements[i].value), i)
    }

    else if (formElements[i].name == 'phone') {
        fillable[i] = showError(z.validatePhone(formElements[i].value), i)
    }

    else if (formElements[i].name == 'date') {
        fillable[i] = showError(z.validateDate(formElements[i].value), i)
    }

    console.log([...fillable])
    validated = z.checkFillable(fillable)
    if(validated) formButton.removeEventListener('click',prevent)
    return validated
}


