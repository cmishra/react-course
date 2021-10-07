const assert = require('assert')
const { exception } = require('console')



// CHALLENGE 1
function createFunction() {
    f = () => 'hello'
    return f
}

describe('challenge 1', () => {
    it('printing hello', () => {
        printer = createFunction()
        assert.equal(printer(), 'hello')
    })
})

// /*** Uncomment these to check your work! ***/
// const function1 = createFunction();
// function1(); // => should console.log('hello');


// CHALLENGE 2
function createFunctionPrinter(input) {
    return () => input
}



describe('challenge 2', () => {
    it('sample printing dynamically set', () => {
        printer = createFunctionPrinter('sample')
        assert.equal(printer(), 'sample')
    })
    it('hello printing dynamically set', () => {
        printer = createFunctionPrinter('hello')
        assert.equal(printer(), 'hello')
    })
})


// /*** Uncomment these to check your work! ***/
// const printSample = createFunctionPrinter('sample');
// printSample(); // => should console.log('sample');
// const printHello = createFunctionPrinter('hello');
// printHello(); // => should console.log('hello');


// CHALLENGE 3
function outer() {
    let counter = 0; // this variable is outside incrementCounter's scope
    function incrementCounter() {
        return ++counter
    }
    return incrementCounter;
}

const willCounter = outer();
const jasCounter = outer();

describe('challenge 3', () => {
    it('counter 1 incrementation', () => {
        assert.equal(willCounter(), 1)
        assert.equal(willCounter(), 2)
        assert.equal(willCounter(), 3)
    })
    it('counter 2 incrementation', () => {
        assert.equal(jasCounter(), 1)
        assert.equal(jasCounter(), 2)
    })
    it('mixed counters', () => {
        assert.equal(willCounter(), 4)
        assert.equal(jasCounter(), 3)
    })

})

// Uncomment each of these lines one by one.
// Before your do, guess what will be logged from each function call.

// /*** Uncomment these to check your work! ***/
// willCounter();
// willCounter();
// willCounter();

// jasCounter();
// willCounter();


function addByX(x) {
    return (y) => y + x
}

describe('challenge 4', () => {
    it('addBy2', () => {
        adder = addByX(2)
        assert.equal(adder(2), 4)
    })
    it('addBy5', () => {
        adder = addByX(5)
        assert.equal(adder(2), 7)
    })

})

// /*** Uncomment these to check your work! ***/
// const addByTwo = addByX(2);
// addByTwo(1); // => should return 3
// addByTwo(2); // => should return 4
// addByTwo(3); // => should return 5

// const addByThree = addByX(3);
// addByThree(1); // => should return 4
// addByThree(2); // => should return 5

// const addByFour = addByX(4);
// addByFour(4); // => should return 8
// addByFour(5); // => should return 9


// CHALLENGE 4
function once(func) {
    happened = false
    wrappedFunc = () => {
        if (!happened) {
            happened = true
            return func()
        } else {
            throw 'It has happened!'
        }
    }
    return wrappedFunc
}

describe('challenge 4', () => {
    f = () => 'hello'
    only_once_hello = once(f)
    assert.equal(only_once_hello(), 'hello')
    assert.throws(only_once_hello, 'It has happened')
})

// /*** Uncomment these to check your work! ***/
// const onceFunc = once(addByTwo);
// console.log(onceFunc(4));  // => should log 6
// console.log(onceFunc(10));  // => should log 6
// console.log(onceFunc(9001));  // => should log 6


// CHALLENGE 5
function after(count, func) {
    counter = 0
    wrapped = () => {
        if (counter < count) {
            counter++
            return null
        } else {
            return func()
        }
    }
    return wrapped
}

const called = () => 'hello'

describe('challenge 5', () => {
    it('only printed third time', () => {
        wrapped = after(3, called)
        assert.equal(wrapped(), null)
        assert.equal(wrapped(), null)
        assert.equal(wrapped(), null)
    })
    it('returns third time', () => {
        assert.equal(wrapped(), 'hello')
    })
    it('returns subsequent times', () => {
        assert.equal(wrapped(), 'hello')
        assert.equal(wrapped(), 'hello')
    })
})

// /*** Uncomment these to check your work! ***/
// const afterCalled = after(3, called);
// afterCalled(); // => nothing is printed
// afterCalled(); // => nothing is printed
// afterCalled(); // => 'hello' is printed


// CHALLENGE 6
function delay(func, wait) {
    wrapped = (...args) => {
        setTimeout(func, wait, ...args)
    }
    return wrapped
}


// CHALLENGE 7
function rollCall(names) {
    rollCallForClass = function*() {
        for (name of names) {
            yield name
        }
        throw 'No more people in class!'
    }
    return rollCallForClass()
}

const rollCaller = rollCall(['Victoria', 'Juan', 'Ruth'])

describe('challenge 7', () => {
    it('victoria', () => {
        assert.equal(rollCaller.next().value, 'Victoria')
    })
    it('Juan', () => {
        assert.equal(rollCaller.next().value, 'Juan')
    })
    it('Ruth', () => {
        assert.equal(rollCaller.next().value, 'Ruth')
    })
    it('Should stop', () => {
        assert.throws(rollCaller.next)
    })
})

// /*** Uncomment these to check your work! ***/
// rollCaller() // => should log 'Victoria'
// rollCaller() // => should log 'Juan'
// rollCaller() // => should log 'Ruth'
// rollCaller() // => should log 'Everyone accounted for'


// CHALLENGE 8
function saveOutput(func, magicWord) {
    mem = {}
    wrapped = (i) => {
        if (i != magicWord) {
            mem[i] = func(i)
            return mem[i]
        } else {
            return mem
        }
    }
    return wrapped
}

// /*** Uncomment these to check your work! ***/
describe('challenge 8', () => {
        const multiplyBy2 = (num) => num * 2
        const multBy2AndLog = saveOutput(multiplyBy2, 'boo')
        it('multiply numbers', () => {
            assert.equal(multBy2AndLog(2), 4)
            assert.equal(multBy2AndLog(9), 18)
        })
        it('everything', () => {
            assert.deepStrictEqual(multBy2AndLog('boo'), { '2': 4, '9': 18 })
        })
    })
    // console.log(multBy2AndLog(2)); // => should log 4
    // console.log(multBy2AndLog(9)); // => should log 18
    // console.log(multBy2AndLog('boo')); // => should log { 2: 4, 9: 18 }


// CHALLENGE 9
function cycleIterator(array) {
    gen = function*() {
        i = 0
        while (true) {
            if (i == array.length) {
                i = 0
            }
            yield array[i++]
        }
    }
    return gen()
}

describe('challenge 9', () => {
    const threeDayWeekend = ['Fri', 'Sat', 'Sun'];
    const getDay = cycleIterator(threeDayWeekend);
    it('assert initial pass', () => {
        assert.equal(getDay.next().value, 'Fri')
        assert.equal(getDay.next().value, 'Sat')
        assert.equal(getDay.next().value, 'Sun')
    })

    it('confirm cycle', () => {
        assert.equal(getDay.next().value, 'Fri')
    })
})

// /*** Uncomment these to check your work! ***/
// console.log(getDay()); // => should log 'Fri'
// console.log(getDay()); // => should log 'Sat'
// console.log(getDay()); // => should log 'Sun'
// console.log(getDay()); // => should log 'Fri'


// CHALLENGE 10
function defineFirstArg(func, arg) {
    wrapped = (...args) => {
        return func(arg, ...args)
    }
    return wrapped
}

// /*** Uncomment these to check your work! ***/
const subtract = function(big, small) { return big - small; };
const subFrom20 = defineFirstArg(subtract, 20);
// console.log(subFrom20(5)); // => should log 15

describe('challenge 10', () => {
    it('base case', () => {
        assert.equal(subFrom20(5), 15)
    })
})


// CHALLENGE 11
function dateStamp(func) {
    wrapped = (n) => {
        return {
            'date': Date.now(),
            'output': func(n),
        }
    }
    return wrapped
}

describe('challenge 11', () => {
    stampedMultBy2 = dateStamp(n => n * 2)
    it('base case', () => {
        assert.deepEqual(stampedMultBy2(4).output, 8)
        assert.deepStrictEqual(stampedMultBy2(6).output, 12)
    })

})

// /*** Uncomment these to check your work! ***/


// CHALLENGE 12
function censor() {
    toReplace = {}
    wrapped = (...args) => {
        if (args.length > 1) {
            toReplace[args[0]] = args[1]
        } else {
            phrase = args[0]
            for (k in toReplace) {
                oldPhrase = ''
                while (oldPhrase != phrase) {
                    oldPhrase = phrase
                    phrase = phrase.replace(k, toReplace[k])
                }
            }
            return phrase
        }
    }
    return wrapped
}

describe('challenge 12', () => {
    it('base case', () => {
        const changeScene = censor();
        changeScene('dogs', 'cats')
        changeScene('quick', 'slow')
        assert.equal(changeScene('The quick, brown fox jumps over the lazy dogs.'), 'The slow, brown fox jumps over the lazy cats.')

    })
})



// CHALLENGE 13
function createSecretHolder(secret) {
    val = secret
    return {
        'getSecret': () => {
            return val
        },
        'setSecret': (v) => {
            val = v
        }
    }
}

// /*** Uncomment these to check your work! ***/

describe('challenge 13', () => {
    it('base case', () => {
        obj = createSecretHolder(5)
        obj.getSecret() // => returns 5
        obj.setSecret(2)
        obj.getSecret() // => returns 2
    })
})


// CHALLENGE 14
function callTimes() {
    let counter = 0
    toReturn = () => {
        return ++counter
    }
    return toReturn
}

// /*** Uncomment these to check your work! ***/
describe('challenge 14', () => {
    it('base case', () => {
        let myNewFunc1 = callTimes()
        let myNewFunc2 = callTimes()
        assert.equal(myNewFunc1(), 1)
        assert.equal(myNewFunc2(), 1)
        assert.equal(myNewFunc2(), 2)
        assert.equal(myNewFunc1(), 2)
        assert.equal(myNewFunc2(), 3)
    })
})


// CHALLENGE 15
function russianRoulette(num) {
    let counter = 0
    play = () => {
        counter++
        if (counter < num) {
            return 'click'
        } else if (counter == num) {
            return 'bang'
        } else {
            return 'reload to play again'
        }
    }
    return play
}

// /*** Uncomment these to check your work! ***/
describe('challenge 15', () => {
    it('base case', () => {
        const play = russianRoulette(3);
        assert.equal(play(), 'click')
        assert.equal(play(), 'click')
        assert.equal(play(), 'bang')
        assert.equal(play(), 'reload to play again')
        assert.equal(play(), 'reload to play again')
        assert.equal(play(), 'reload to play again')
    })
})


// CHALLENGE 16
function average() {
    seq = []
    averageSoFar = (n = null) => {
        if (n != null) {
            seq.push(n)
        }
        if (seq.length == 0) {
            return 0
        }
        return seq.reduce((x, y) => (x + y)) / seq.length
    }
    return averageSoFar
}

// /*** Uncomment these to check your work! ***/

describe('challenge 16', () => {
    it('base case', () => {
        const avgSoFar = average();
        assert.equal(avgSoFar(), 0)
        assert.equal(avgSoFar(4), 4)
        assert.equal(avgSoFar(12), 8)
        assert.equal(avgSoFar(), 8)
        assert.equal(avgSoFar(5), 7)
        assert.equal(avgSoFar(), 7)

    })
})


// CHALLENGE 17
function makeFuncTester(arrOfTests) {

}

// /*** Uncomment these to check your work! ***/
// const capLastTestCases = [];
// capLastTestCases.push(['hello', 'hellO']);
// capLastTestCases.push(['goodbye', 'goodbyE']);
// capLastTestCases.push(['howdy', 'howdY']);
// const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
// const capLastAttempt1 = str => str.toUpperCase();
// const capLastAttempt2 = str => str.slice(0, -1) + str.slice(-1).toUpperCase();
// console.log(shouldCapitalizeLast(capLastAttempt1)); // => should log false
// console.log(shouldCapitalizeLast(capLastAttempt2)); // => should log true


// CHALLENGE 18
function makeHistory(limit) {

}

// /*** Uncomment these to check your work! ***/
// const myActions = makeHistory(2);
// console.log(myActions('jump')); // => should log 'jump done'
// console.log(myActions('undo')); // => should log 'jump undone'
// console.log(myActions('walk')); // => should log 'walk done'
// console.log(myActions('code')); // => should log 'code done'
// console.log(myActions('pose')); // => should log 'pose done'
// console.log(myActions('undo')); // => should log 'pose undone'
// console.log(myActions('undo')); // => should log 'code undone'
// console.log(myActions('undo')); // => should log 'nothing to undo'


// CHALLENGE 19
function blackjack(array) {

}

// /*** Uncomment these to check your work! ***/

// /*** DEALER ***/
// const deal = blackjack([2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11]);

// /*** PLAYER 1 ***/
// const i_like_to_live_dangerously = deal(4, 5);
// console.log(i_like_to_live_dangerously()); // => should log 9
// console.log(i_like_to_live_dangerously()); // => should log 11
// console.log(i_like_to_live_dangerously()); // => should log 17
// console.log(i_like_to_live_dangerously()); // => should log 18
// console.log(i_like_to_live_dangerously()); // => should log 'bust'
// console.log(i_like_to_live_dangerously()); // => should log 'you are done!'
// console.log(i_like_to_live_dangerously()); // => should log 'you are done!'

// /*** BELOW LINES ARE FOR THE BONUS ***/

// /*** PLAYER 2 ***/
// const i_TOO_like_to_live_dangerously = deal(2, 2);
// console.log(i_TOO_like_to_live_dangerously()); // => should log 4
// console.log(i_TOO_like_to_live_dangerously()); // => should log 15
// console.log(i_TOO_like_to_live_dangerously()); // => should log 19
// console.log(i_TOO_like_to_live_dangerously()); // => should log 'bust'
// console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!
// console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!

// /*** PLAYER 3 ***/
// const i_ALSO_like_to_live_dangerously = deal(3, 7);
// console.log(i_ALSO_like_to_live_dangerously()); // => should log 10
// console.log(i_ALSO_like_to_live_dangerously()); // => should log 13
// console.log(i_ALSO_like_to_live_dangerously()); // => should log 'bust'
// console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
// console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!