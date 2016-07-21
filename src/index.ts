import * as Server from './server';

Server.start()
    .then(function() {
        console.log('Started');
    });
