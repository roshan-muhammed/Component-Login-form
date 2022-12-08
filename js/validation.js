
class Validator {
    /**
     * Available rules in the @Validator class
     * @tel => checks if the value is a valid phone number
     * @min => checks if the value is at least min
     * @max => checks if the value is at most max
     * @email => checks if the value is a valid email
     * @empty => checks if the value is not empty
     * @digits => checks if the value has a digit
     * @special => checks if the value has a special character
     * @confirm => checks if the confirm field value is equal to the password value
     * @password => returns the password strength and validates it for the given rules
     *
     * Each rule specified in the map as an object with
     * @parameters
     * func => the name of the rule
     * value => An integer or boolean according to the rule
     * message => Message to be showed if the rule is no followed
     */
    format = {
        /**
         * @format object has the regex patterns for various validation function
         */
        email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        special: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
        tel: /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/,
    };
    strength = [
        /**
         * @strength array has the message which the password function returns as the strength of a password
         */
        'Invalid', 'Weak', 'Ok', 'Good', 'Strong', 'VeryStrong', 'Excellent',
    ];
    map = {
        /**
         * @map governs the the entire validation
         * You can add field add there rules by directly accessing this object
         */
        password: {
            name: 'password',
            status: false,
            password: {
                /**
                 * @password can be used to validate a password and also it can return an
                 * object which also contains the strength of the password
                 * @strength array inside the password object is also used to determine strength
                 * @strength array specifies the lengths of password where strength increases
                 */
                strength: [9, 13],
            },
            rules: {
                empty: {
                    func: `empty`,
                    value: false,
                    message: 'password must not be empty',
                },
                min: {
                    func: `min`,
                    value: 6,
                    message: 'password must be at least 6 characters',
                },
                max: {
                    func: `max`,
                    value: 16,
                    message: 'password cannot be over 16 characters',
                },
                upper: {
                    func: 'upper',
                    value: true,
                    message: 'password must contain at least one uppercase letter',
                },
                digits: {
                    func: `digits`,
                    value: true,
                    message: 'password should contain at least one digit',
                },
            },
        },
        name: {
            name: 'name',
            status: false,
            rules: {
                empty: {
                    func: `empty`,
                    value: false,
                    message: 'Name must not be empty',
                },
                min: {
                    func: `min`,
                    value: 3,
                    message: 'Name must be at least 3 characters',
                },
                max: {
                    func: `max`,
                    value: 20,
                    message: 'Name must be at most 20 characters',
                },
                digits: {
                    func: `digits`,
                    value: false,
                    message: 'Name can only contain alphabets',
                },
                special: {
                    func: `empty`,
                    value: false,
                    message: 'Name can only contain alphabets',
                },
            },
        },
        confirm: {
            name: 'confirm',
            status: false,
            confirm: {
                message: 'passwords does not match',
            },
        },
        phone: {
            name: 'phone',
            status: false,
            rules: {
                empty: {
                    func: `empty`,
                    value: false,
                    message: 'Phone number cannot be empty',
                },
                tel: {
                    func: `tel`,
                    value: true,
                    message: 'Please enter a valid phone number',
                },
            },
        },
        date: {
            name: 'date',
            status: false,
            rules: {
                empty: {
                    func: `empty`,
                    value: false,
                    message: 'Please choose a date',
                },
            },
        },
        email: {
            name: 'email',
            status: false,
            rules: {
                empty: {
                    func: `empty`,
                    value: false,
                    message: 'Email cannot be empty',
                },
                email: {
                    func: `email`,
                    value: true,
                    message: 'Please enter an email address',
                },
            },
        },
    };

    elementMap = {
        hint: {},
        invoke: {},
        icons: [],
        values: [],
        errors: [],
        strength: {},
        hintIcons: [],
    }

    constructor(props) {
        /**
         * @constructor takes array of the form elements in the dom as parameters
         */

        let i = 0
        this.elementMap.hint = props.hint;
        this.elementMap.icons = props.icons;
        this.elementMap.invoke = props.invoke;
        this.elementMap.strength = props.strength;
        this.elementMap.invoke.addEventListener('click', this.validateAll)

        for (let element of props.formFields) {
            this.addListeners(element)
            this.elementMap.values[element.name] = element;
            this.elementMap.errors[element.name] = props.errorBoxes[i];
            this.elementMap.hintIcons[element.name] = props.hintIcons[i++]
        }
    }

    /**
     * @functions Corresponding to @rules
     * -------------------------------------
     * Each of these functions returns the output of the condition immediately
     * For rules which take boolean values it can return values according to value
     * set in the rule.
     * @Example : If a field should have special characters set the rule as special:true,
     * if it should not contain any special characters,then set rule as special:false
     **/
    max(value, handle) {
        return value.length <= handle;
    }

    min(value, handle) {
        return value.length >= handle;
    }

    empty(value, handle = true) {
        return (value === '') === handle;
    }

    upper(value, handle = true) {
        return /[A-Z]/.test(value) === handle;
    }

    digits(value, handle = true) {
        return /[0-9]/.test(value) === handle;
    }

    tel(value, handle = true) {
        return this.format.tel.test(value) === handle;
    }

    email(value, handle = true) {
        return this.format.email.test(value) === handle;
    }

    special(value, handle = true) {
        return this.format.special.test(value) === handle;
    }

    confirm(value, handle = true) {
        return (value === handle && value != '') === handle;
    }

    password(element) {
        /**
         * @password can return a strength of a password 
         * the return value can be from 1 to 5
         * each of these are password strength scores
         */
        let strength = 0;
        if (!element.status) {
            this.showStrength(strength);
            return
        }

        strength++;
        if (!(this.elementMap.values[element.name].value.length >= 7)) {
            this.showStrength(strength)
            return
        }

        let Special = this.special(this.elementMap.values[element.name].value, true) && strength++;
        let Upper = (/[A-Z].*[A-Z]/).test(this.elementMap.values[element.name].value) && strength++;
        let Digits = (/[0-9].*[0-9]/).test(this.elementMap.values[element.name].value) && strength++;

        if (Special || Digits || Upper) {
            if (this.elementMap.values[element.name].value.length > element.password.strength[0]) strength++;
            if (this.elementMap.values[element.name].value.length > element.password.strength[1]) strength++;
        }

        this.showStrength(strength)
    }

    validate(element) {
        /**
         * @validate can take each rule from the element object and validate for
         * all of its rules
         **/

        if (element.hasOwnProperty('confirm')) {
            let check =  this.confirm(this.elementMap.values[element.name].value,this.elementMap.values['password'].value);
            console.log(this.elementMap.values[element.name].value,this.elementMap.values['password'].value,check)
            check && this.showError(element,element.confirm.message);
            return
        }
        
        let boilerPlate = '(this.elementMap.values[element.name].value,element.rules[i].value)';
        for (let i in element.rules) {
            if (!eval(`this.${element.rules[i].func + boilerPlate}`)) {
                this.showError(element, element.rules[i].message);
                element.hasOwnProperty('password') && this.password(element);
                return false;
            }
        }

        this.showError(element, '');
        element.hasOwnProperty('password') && this.password(element);
        return true;
    }

    validateAll(event) {
        /**
         * @validateAll can validate all the fields by calling @validate method on all fields
         */
        event.preventDefault();
        for (let i in this.elementMap.values) {
            this.validate(this.map[this.elementMap.values[i]]);
        }

        for (let i in this.map) {
            if (!this.map[i].status) {
                return false
            }
        }

        this.elementMap.invoke.removeEventListener('click', this.validateAll);
        return true
    }

    showError(element, message) {
        element.status = (message === '') ? true : false;
        this.elementMap.errors[element.name].innerHTML = message;
        this.elementMap.hintIcons[element.name].classList.remove('hidden');
        this.elementMap.hintIcons[element.name].src = this.elementMap.icons[element.status + 0];
    }

    showStrength(strength) {
        console.log(strength);
        this.elementMap.strength.innerHTML = this.strength[strength];
        this.elementMap.strength.className = this.strength[strength];

        if (this.elementMap.hint.classList.contains('hidden')) {
            this.elementMap.hint.classList.remove('hidden');
        }
    }

    addValidator(element) {
        this.validate(this.map[element]);
    }

    addListeners(element) {
        element.addEventListener('input', () => {
            this.validate(eval(`this.map.${element.name}`));
        })
    }
}

export default Validator;
