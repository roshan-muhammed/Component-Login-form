'use strict'
import z from './validation.js'
const passwordStrength = document.querySelector('#password-strength')
const formElements = document.querySelectorAll('.form-element')
const errorBox = document.querySelectorAll('.error-msg')
const navToggle = document.querySelector('.nav-toggle')
const navMenu = document.querySelector('#nav-menu')
const header = document.querySelector('header')
const formButton = document.querySelector('#form-button')
let validated = false
console.log(formElements)
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
    formElements[i].addEventListener("input", () => {
        if (formElements[i].name == 'name') {
            console.log(formElements[i].value)
            showError(z.validateName(formElements[i].value, 3, 16), i)
            console.log(z.validateName(formElements[i].value))
        } else if (formElements[i].name == 'password') {
            let error = z.validatePassword(formElements[i].value)
            showError(error, i)
            passwordStrength.innerHTML = error.strength
            passwordStrength.className = error.strength
        }
        if (validated) {
            formButton.removeEventListener('click', prevent)
        }
    })
}

function prevent(event){
    event.preventDefault()
}


function showError(error, i) {
    if (!error.status) {
        errorBox[i].innerHTML = error.message
    } else {
        errorBox[i].innerHTML = ''
    }
}