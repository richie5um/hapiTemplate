let Good = require('good');

exports.register = (server, options, next) => {
    server.register({
        register: Good,
        options: {
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        response: '*',
                        log: '*'
                    }]
                }, {
                    module: 'good-console',
                }, 'stdout']
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'LoggingPlugin',
    version: '1.0.0'
};
