import Validator from './validation.js'

const header = document.querySelector('header')
const navMenu = document.querySelector('#nav-menu')
const navToggle = document.querySelector('.nav-toggle')

//These are the error message elements in the html 
const errorBox = document.querySelectorAll('.error-msg')
//This is the form submit button 
const formButton = document.querySelector('#form-button')
//These are the classes which need to be validated
const formElements = document.querySelectorAll('.validate')
//These are all the img tags which shows the status icon
const validateIcon = document.querySelectorAll('.validate-icon-e')
//This div show the strength of the password
const passwordStrength = document.querySelector('#password-strength')
//This div contains the icon and the strength div of the password
const passwordHintGroup = document.querySelector('.password-hint-group')


/**
 * The code up to @line45 is @not related to the @validator class
 */
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

/**
 * This is the Boiler plate code for using the @Validator class
 * The please look at the object creation to check the parameters of the constructor
 * of the @Validator class
 * 
 */

const validator = new Validator({
    /**Error messages boxes*/
    errorBoxes: errorBox,
    /**Image tags of status icons*/
    hintIcons: validateIcon,
    /**The div which shows the status of the validation of the password
    This contains the status icon and strength div */
    hint: passwordHintGroup,
    /**All the form fields which need to be validated*/
    formFields: formElements,
    /**Div which shows the password strength*/
    strength: passwordStrength,
    /**sources of icons which shows the status*/
    icons: ['images/delete.png', 'images/check.png', 'images/warning.png']
})

/**
 * Adding an event listener to the the button and to  @handleValidation 
 */
formButton.addEventListener("click", handleValidation)

function handleValidation(event) {
    /**
     * Prevents the normal behavior of the button 
     */
    event.preventDefault()
    /**
     * Checks if fields are valid if not they are validated 
     * if there are errors then returns
     */
    if (!validator.validateAll()) return
    /**
     * Clicks the button if there are no validation errors 
     */
    this.click()
}