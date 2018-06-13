const winston = require('winston');

const log = new (winston.Logger)({
    levels: {
        'info': 0,
        'exception': 1,
        'error': 2,
        'all': 3
    },
    transports: [
        new (winston.transports.Console)({name: 'info', level:'info',colorize: true}),
        new (winston.transports.File)({name: 'error', level:'error', filename: __dirname + '/logs/error.log', json: false }),
        new (winston.transports.File)({name: 'all', level:'all', filename: __dirname + '/logs/all.log', json: false })
    ]
});

module.exports = {
    log: log
}
