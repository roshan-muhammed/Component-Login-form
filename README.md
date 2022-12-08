# Form Validator

This is a small form validtor, which validates forms in realtime and displays the errors accordingly

The code is optimized to run on low perfomance devices as well

### How to use validator

Instantiate an object of the validator with the follwing parameters 

```
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
```

You also would want to add this code snippet in your main file to validate all on submition

```
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
```
