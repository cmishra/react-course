_ = require('underscore')

function from(arrLike) {
    arr = []
    _.each(arrLike, el => arr.push(el))
    return arr
}

arr1 = [1, 2, 3]

arr2 = from(arr1)

console.log(arr2.join(', '))