function reduce(arr, callback, initialValue) {
    let curValue = initialValue;
    for (let el of arr) {
        curValue = callback(curValue, el);
    }
    return curValue;
}

msg = 1.0;
arr = [3.0, 7.0, 9.0];

console.log(reduce(arr, (x, y) => x + y, msg));
console.log(reduce(arr, (x, y) => x + y, msg + 1));