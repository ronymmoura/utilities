var authController     = require('./apiControllers/authController'),
    testController      = require('./apiControllers/testController');

module.exports = {
    /**
     * Register the public routes.
     * @param {Router} router Express router
     */
    public: function (router) {
    
        authController.public(router);

    },
    
    /**
     * Register the restrict routes.
     * @param {Router} router Express router
     */
    restrict: function (router) {
        
        authController.restrict(router);
        
        testController(router);
        
    }
};