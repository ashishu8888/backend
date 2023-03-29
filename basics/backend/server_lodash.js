const _ = require('lodash');

let greet = _.once(() => {
    console.log('Hello');
});

greet();
greet();