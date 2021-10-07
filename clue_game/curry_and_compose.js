_ = require('lodash')
_2 = require('underscore')

playTicTacToe = _.curry((player1, player2) => {
    console.log(`${player1} is playing tic tac toe with ${player2}`)
})

playTicTacToeWithCharles = playTicTacToe('Charles')
playTicTacToeWithCharles('Chetan')
playTicTacToeWithCharles('Miss Dear Elizabeth')

playTicTacToeWithCharles = playTicTacToe('Chetan')
playTicTacToeWithCharles('Miss Dear Elizabeth')

activityWith = (p1, p2) => {
    return (activity) => console.log(`${p1} and ${p2} are playing ${activity}`)
}

getPecosActivity = () => `chess`

coupleActivity = activityWith('Chetan', 'Miss Dear Elizabeth')
coupleActivityInPecos = _2.compose(coupleActivity, getPecosActivity)

coupleActivityInPecos()