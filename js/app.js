'use strict'
import Validator from './validation.js'
const passwordStrength = document.querySelector('#password-strength')
const passwordHintGroup = document.querySelector('.password-hint-group')
const formElements = document.querySelectorAll('.validate')
const errorBox = document.querySelectorAll('.error-msg')
const navToggle = document.querySelector('.nav-toggle')
const navMenu = document.querySelector('#nav-menu')
const header = document.querySelector('header')
const formButton = document.querySelector('#form-button')
const validateIcon = document.querySelectorAll('.validate-icon-e')
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

const v = new Validator(formElements, errorBox, passwordStrength)

// for(let i in v.elementMap.values) {
//     console.log(v.elementMap.values[i])
//     // element.addEventListener('input',()=>{
//     //     // v.validate(z.map)
//     //     console.log(this)
//     // })
// }


