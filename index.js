var server = require('./app-server'),
    config = require('./config/' + (process.env.NODE_ENV || 'development');


server.start();
