var testController  = require('./apiControllers/testController');
var route           = require('./route');

module.exports = function (router) {
    
    testController(router);
    
};