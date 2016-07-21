var plugins = [{
    module: require('./status'),
    options: {
        routes: {
            prefix: '/status'
        }
    }
}, {
    module: require('./logging')
}];

module.exports = plugins;
