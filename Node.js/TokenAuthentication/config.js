'use strict';

var config = {
    
    // Returns the application port.
    port: 3001,
    
    // Returns the connection string for the mongodb server.
    databaseConnection: "mongodb://localhost:27017/jwt",
    
    // Returns the api url
    apiUrl: function () {
        return 'http://localhost:' + this.port + '/api'
    }
    
};

module.exports = config;