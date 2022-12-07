// Rules 
// min()
// max()
// empty()
// digits()
special()
password()
confirm()
email()
tel()

const map = [{
    name: 'date',
    rules: {
        empty: { value: false, message: 'Please choose a date' }
    }
}, {
    name: 'email',
    rules: {
        email: { value: true, message: 'Please enter an email address' },
        empty: { value: false, message: 'Email cannot be empty' }
    }
}]

// for (let i in map) {
//     if (map[i].rules.hasOwnProperty('empty')) {
//         map[i].rules.min['empty']= `this.empty`
//     }
// }
// const jsp= {
//     name:'hidon',
//     age:'jila'
// }

// setProp(jsp, 'lia')

// function setProp(handle, value) {
//     // handle.setProperty('func',value)
//     handle.func = value
// }

eval(`console.log('${map[0].name}')`)
