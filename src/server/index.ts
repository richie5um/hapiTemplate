import * as Promise from 'bluebird';
import * as Hapi from 'hapi';
import * as _ from 'lodash';

// Promise Helpers (Sequential Promise Loops)
Promise.series = (promises) => {
    return Promise.each(promises, (promise) => {
        return promise;
    });
};

Promise.seriesFn = (promises) => {
    return Promise.each(promises, (promise) => {
        return promise();
    });
};

// Server Init
var server = new Hapi.Server();
server.connection({
    port: 3000
});

// Server Init Promises
var registerPlugins = () => {
    return new Promise((resolve, reject) => {
        console.log('Registering Plugins');
        var plugins = require('./plugins');
        return Promise.
            all(plugins.map((plugin) => {
                server.register(plugin.module, plugin.options, (err) => {
                    if (err) {
                        return Promise.reject(err);
                    }

                    return Promise.resolve();
                });
            }))
            .then(() => {
                return resolve();
            })
            .catch((err) => {
                console.log('Registering Plugins Error:', err);
                return reject(err);
            });
    });
};

var startServer = () => {
    return new Promise((resolve, reject) => {
        console.log('Starting Server');
        server.start((err) => {
            if (err) {
                return reject(err);
            }

            console.log('Server running at:', server.info.uri);
            return resolve();
        });
    });
};

var outputRoutes = function () {
    return new Promise((resolve, reject) => {
        var table = server.table();
        console.log(`Routes:`);
        _.each(table, (items) => {
            items.table.forEach((route) => {
                console.log(`* ${route.path} [${route.method.toUpperCase()}]`);
            });
        });
    });
};

var promises = [
    registerPlugins,
    startServer,
    outputRoutes
];

export function start() {
    return Promise.seriesFn(promises)
        .catch((err) => {
            console.log('Error:', err);
        });
};