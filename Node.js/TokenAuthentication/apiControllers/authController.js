var User    = require('../models/User'),
    jwt     = require('jsonwebtoken');

module.exports = {
    
    /**
     * Register the public routes.
     * @param {Router} router Express router
     */
    public: function (router) {
    
        router.route('/auth/register')
            .post(function (req, res) {
                if(!req.body.email) return res.status(400).json('Email is required.');
                if(!req.body.password) return res.status(400).json('Password is required.');
                
                User.findOne({ email: req.body.email })
                    .exec(function (err, user) {
                        if(err) res.status(400).json(err);
                        else {
                            if(user) res.status(400).json('User already exists.');
                            else {
                                var newUser = new User({
                                    email: req.body.email,
                                    password: req.body.password
                                });
                                
                                newUser.save();
                                res.json(newUser);
                            }
                        }
                    });
            });
        
        router.route('/auth/login')
            .post(function (req, res) {
                
                User.findOne({ email: req.body.email, password: req.body.password })
                    .exec(function (err, user) {
                        if(err) res.status(400).json(err);
                        else {
                            if(!user) res.status(400).json('Email or password invalid.');
                            else {
                                res.json(jwt.sign(user.toObject(), 'secret'));
                            }
                        }
                    });
                
            });
    },
    
    /**
     * Register the restrict routes.
     * @param {Router} router Express router
     */
    restrict: function (router) {
        
        router.route('/auth/verify')
            .get(function (req, res) {
                res.json({ valid: true });
            });
        
        router.route('/auth/me')
            .get(function (req, res) {
                res.json(req.user);
            });
        
        router.route('/auth/delete')
            .post(function (req, res) {
                User.remove({ email: req.body.email }, function (err) {
                    if(err) res.status(400).json(err);
                    else res.json('User deleted');
                });
            });
        
    }
    
};