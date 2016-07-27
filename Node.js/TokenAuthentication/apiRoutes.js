var loginController     = require('./apiControllers/loginController'),
    testController      = require('./apiControllers/testController');

module.exports = {
    /**
     * Register the public routes.
     * @param {Router} router Express router
     */
    public: function (router) {
    
        loginController(router);

    },
    
    /**
     * Register the restrict routes.
     * @param {Router} router Express router
     */
    restrict: function (router) {
        
        testController(router);
        
    }
};