
const value = false

const map = [true,parseInt(value),1,2,4]
const obj = 'hi'

// if(0 in map ) {
//     console.log('it works')
// }

console.log(getIt(obj))


function getIt(object) {
    return object.heritage ?? 'it is working'
}