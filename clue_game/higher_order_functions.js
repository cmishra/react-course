var increment = n => n + 1;

var square = n => n * n;

var doMathSoIDontHaveTo = (n, func) => func(n);

console.log(doMathSoIDontHaveTo(5, square));

console.log(doMathSoIDontHaveTo(4, increment));