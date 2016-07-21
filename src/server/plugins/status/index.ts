exports.register = (server, options, next) => {
    server.route({
        method: 'GET',
        path: '/ping',
        handler: (request, reply) => {
            reply('pong');
        }
    });
};

exports.register.attributes = {
    name: 'StatusPlugin',
    version: '1.0.0'
};
