_ = require('underscore')

const newDevelopment = [{
        name: 'Miss Scarlet',
        present: true,
        rooms: [
            { kitchen: false },
            { ballroom: false },
            { conservatory: true },
            { 'dining room': true },
            { 'billiard room': false },
            { library: true }
        ]
    },
    {
        name: 'Reverend Green',
        present: true,
        rooms: [
            { kitchen: true },
            { ballroom: false },
            { conservatory: false },
            { 'dining room': false },
            { 'billiard room': true },
            { library: false }
        ]
    },
    {
        name: 'Colonel Mustard',
        present: true,
        rooms: [
            { kitchen: false },
            { ballroom: false },
            { conservatory: true },
            { 'dining room': false },
            { 'billiard room': true },
            { library: false }
        ]
    },
    {
        name: 'Professor Plum',
        present: true,
        rooms: [
            { kitchen: true },
            { ballroom: false },
            { conservatory: false },
            { 'dining room': true },
            { 'billiard room': false },
            { library: false }
        ]
    }
];

roomPresents = _.map(newDevelopment, x => x.rooms);
roomPresents = roomPresents.flat();
_.map(roomPresents, x => console.log(Object.keys(x)));

atLeastOnePersonPresent = {};
_.each(newDevelopment[0].rooms, k => atLeastOnePersonPresent[Object.keys(k)[0]] = false);
// _.each(atLeastOnePersonPresent, x => console.log(x));
// _.each(Object.values(roomPresents), el => {
//     [k, v] = [Object.keys(el)[0], Object.values(el)[0]];
//     atLeastOnePersonPresent[k] = v || atLeastOnePersonPresent[k];
// });

_.reduce(roomPresents, (obj1, obj2) => {
    for ([k, v] of Object.entries(obj2)) {
        if (v) obj1[k] = v;
        return obj1;
    }
}, memo = atLeastOnePersonPresent);

_.each(Object.entries(atLeastOnePersonPresent), ([k, v]) => console.log(`At least one person was in room ${typeof(k)} ${k}: ${v}`));