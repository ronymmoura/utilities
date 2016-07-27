module.exports = function (router) {
    
    router.route('/test')
        .get(function(req, res) {
            res.json({ message: 'testing...' });
        });
    
};