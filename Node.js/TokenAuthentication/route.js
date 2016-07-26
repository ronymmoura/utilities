module.exports = function (router, routeName, controller) {
    return controller(router.route(routeName));
}