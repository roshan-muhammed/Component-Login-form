import { addListener } from "npm";

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
        'Invalid', 'Weak', 'Good', 'Strong', 'VeryStrong', 'Excellent',
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
            rules: {
                confirm: {
                    func: `confirm`,
                    points: 'password',
                    message: 'passwords does not match',
                },
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
        strength: {},
        values: [],
        errors: [],
    }

    constructor(formElements, errorBoxes, strengthBox) {
        /**
         * @constructor takes array of the form elements in the dom as parameters
         */
        this.elementMap.strength = strengthBox
        for (let i in formElements) {
            this.elementMap.values[formElements[i].name] = formElements[i];
            this.elementMap.errors[formElements[i].name] = errorBoxes[i];
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
        return value.length >= (handle.value ?? handle);
    }

    min(value, handle) {
        return value.length <= (handle.value ?? handle);
    }

    empty(value, handle, status = true) {
        return (value === '') === (handle.value ?? status);
    }

    digits(value, handle, status = true) {
        return /[0-9]/.test(value) === (handle.value ?? status);
    }

    tel(value, handle, status = true) {
        return this.format.tel.test(value) === (handle.value ?? status);
    }

    email(value, handle, status = true) {
        return this.format.email.test(value) === (handle.value ?? status);
    }

    special(value, handle, status = true) {
        return this.format.special.test(value) === (handle.value ?? status);
    }

    confirm(password, confirm, status = true) {
        return (password.value === confirm.value) === (handle.value ?? status);
    }

    password(element) {
        /**
         * @password can return a strength of a password 
         * the return value can be from 1 to 5
         * each of these are password strength scores
         */

        let strength;
        element.status && this.validate(element.rules);

        strength++;
        this.digits(this.elementMap.values[element.name].value, true) && strength++;
        this.special(this.elementMap.values[element.name].value, true) && strength++;
        this.min(this.elementMap.values[element.name].value, element.password.strength[0]) && strength++;
        this.min(this.elementMap.values[element.name].value, element.password.strength[1]) && strength++;

        this.showStrength(strength)
    }

    validate(element) {
        /**
         * @validate can take each rule from the element object and validate for
         * all of its rules
         **/
        for (let i in element.rules) {
            if (!eval(`this.${element.rules[i].func}(elementMap.values[element.name].value,element.rules[i])`)) {
                this.showError(element, element.rules[i].message);
                return false;
            }
        }
        element.status = true;
        element.hasOwnProperty('password') && this.password(element)
        return true;
    }

    validateAll() {
        /**
         * @validateAll can validate all the fields by calling @validate method on all fields
         */
        for (let i in this.map) {
            this.validate(this.map[i]);
        }

        for (let i in this.map) {
            if (!this.map[i].status) {
                return false
            }
        }

        return true
    }

    showError(item, message) {
        item.status = false;
        this.elementMap.errors[item.name].innerHTML = message;
    }

    showStrength(strength) {
        this.elementMap.strength.innerHTML = this.strength[strength];
    }

    addValidator(element) {
        this.validate(this.map[element].)
    }

    addListeners() {
        for (let i in this.elementMap.values) {
            this.elementMap.values[i].addEventListener('input', () => {
                addValidator(this.elementMap.values[i].name)
            })
        }
    }
}

export default Validator;
