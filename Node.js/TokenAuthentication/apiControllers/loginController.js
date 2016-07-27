var User = require('../models/User');

module.exports = function (router) {
    
    router.route('/auth/register')
        .post(function (req, res) {
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
            res.json({ type: true });
        });
    
};